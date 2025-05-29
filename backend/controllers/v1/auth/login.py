import logging
from typing import Annotated

from fastapi import APIRouter, Request
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
async logout(
    current_user: Annotated[Account, Depends(get_current_user)]
):
    
