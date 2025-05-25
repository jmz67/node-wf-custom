
from fastapi import FastAPI

from controllers import api_router 


def register_routers(app: FastAPI, prefix: str = "/api"):
    app.include_router(api_router, prefix=prefix)

