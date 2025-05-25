from fastapi import APIRouter 

v1_router = APIRouter()

from .auth import auth_router

v1_router.include_router()