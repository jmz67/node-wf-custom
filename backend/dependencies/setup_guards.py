from fastapi import Depends, HTTPException
from typing import Annotated

from config import app_config
from models import DifySetup

def verify_self_hosted():
    if app_config.EDITION != "SELF_HOSTED":
        raise HTTPException(status_code=404, detail="Only available in self-hosted edition")

def verify_not_already_setup():
    if app_config.EDITION == "SELF_HOSTED" and DifySetup.query.first():
        raise HTTPException(status_code=400, detail="System already set up")

def verify_init_validate_status():
    if not get_init_validate_status():
        raise HTTPException(status_code=400, detail="System not initialized")

def get_init_validate_status():
    return True  # or your actual implementation

SelfHostedSetupGuard = Annotated[
    None,
    Depends(verify_self_hosted),
    Depends(verify_not_already_setup),
    Depends(verify_init_validate_status),
]
