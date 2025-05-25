import logging 
from typing import Any 

from pydantic_settings import BaseSettings, PydanticBaseSettingsSource


logger = logging.getLogger(__name__)

class RemoteSettingsSourceFactory(PydanticBaseSettingsSource):
    def __init__(self, settings_cls: type[BaseSettings]):
        super().__init__(settings_cls)

    def get_field_value(self, field: FieldInfo, field_name: str) -> tuple[Any, str, bool]:
        raise NotImplementedError