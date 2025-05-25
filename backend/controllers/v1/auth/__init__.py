from fastapi import APIRouter 

from .login import login_router

auth_router = APIRouter()
auth_router.include_router(login_router, tags=["login"])

__all__ = ["auth_router"]