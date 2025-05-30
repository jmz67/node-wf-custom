import logging
from typing import Annotated

from fastapi import APIRouter, Request

from config

from dependencies.setup_guards import SelfHostedSetupGuard
from dependencies.auth import get_current_user 
from services.tenant_service import TenantService, RegisterService
from utils import extract_remote_ip

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/signup", summary="租户注册")
async def signup(
    tenant_in: TenantCreate,
    request: Request,
    _: SelfHostedSetupGuard  
):
    # 检查已有租户
    if TenantService.get_tenant_count() > 0:
        raise HTTPException(status_code=400, detail="Tenant already exists")

    # 执行注册流程
    RegisterService.setup(
        email=tenant_in.email,
        name=tenant_in.name,
        password=tenant_in.password,
        ip_address=extract_remote_ip(request)
    )

    return {"result": "success"}

@router.get("/logout")
async def logout(current_user: Annotated[Account, Depends(get_current_user)]):
    pass 



@router.post("/login")
async def login(
    account_login: accountLogin,
    _: SelfHostedSetupGuard
):
    email = account_login.email 

    # 判断账号是否被冻结
    if app_config.BILLING_ENABLED and BillingService.is_email_in_freeze(email):
        raise AccountInFreezeError
    # 登录失败次数限制
    if AccountService.is_login_error_rate_limit(email):
        raise EmailPasswordLoginLimitError()

    # 检查邀请 token
    invitation_token = account_login.invite_token
    invitation = None
    if invitation_token:
        invitation = RegisterService.get_invitation_if_token_valid(None, email, invitation_token)

    # 设置语言
    language: Literal["zh-Hans", "en-US"] = "zh-Hans" if account_login.language == "zh-Hans" else "en-US"

    # 尝试认证
    try:
        if invitation:
            data = invitation.get("data") or {}
            if data.get("email") != email:
                raise InvalidEmailError()

            account = AccountService.authenticate(email, account_login.password, invitation_token)
        else:
            account = AccountService.authenticate(email, account_login.password)
    except services.errors.account.AccountBannedException:
        raise AccountBannedError()
    except services.errors.account.InvalidCredentialsException:
        raise EmailPasswordLoginLimitError()

    # 获取用户的租户信息
    tenants = TenantService.get_join_tenants(account)
    if not tenants:
        raise WorkspaceNotAvailableError()

    # 登录成功：生成 token
    ip_address = extract_remote_ip(request)
    token_pair = AccountService.login(account=account, ip_address=ip_address)

    # 重置登录失败限制
    AccountService.reset_login_error_rate_limit(email)

    return JSONResponse(
        content={"result": "success", "data": token_pair.model_dump()}
    )
        

