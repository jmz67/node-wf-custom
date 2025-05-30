import logging 
from typing import Any 

from pydantic.fields import FieldInfo
from pydantic_settings import BaseSettings, PydanticBaseSettingsSource, SettingsConfigDict

from .middleware import MiddlewareConfig 


logger = logging.getLogger(__name__)

class RemoteSettingsSourceFactory(PydanticBaseSettingsSource):
    def __init__(self, settings_cls: type[BaseSettings]):
        super().__init__(settings_cls)

    def get_field_value(self, field: FieldInfo, field_name: str) -> tuple[Any, str, bool]:
        raise NotImplementedError
    
    def __call__(self) -> dict[str, Any]:
        current_state = self.current_state
        remote_source_name = current_state.get("REMOTE_SETTINGS_SOURCE_NAME")
        if not remote_source_name:
            return {}
        
        remote_source: RemoteSettingsSource | None = None 
        match remote_source_name:
            case RemoteSettingsSourceName.APOLLO:
                remote_source = ApolloSettingsSource(current_state)
            case _:
                logger.warning(f"Unsupported remote source: {remote_source_name}")
                return {}
            
        d: dict[str, Any] = {}

        for field_name, field in self.settings_cls.model_fields.items():
            field_value, field_key, value_is_complex = remote_source.get_field_value(field, field_name)
            field_value = remote_source.prepare_field_value(field_name, field, field_value, value_is_complex)
            if field_value is not None:
                d[field_key] = field_value

        return d
    
class AppConfig(
    MiddlewareConfig,    
):
    model_config = SettingsConfigDict(
        # read from dotenv format config file 
        env_file=".env",
        env_file_encoding="utf-8",
        # ignore extra attributes
        extra="ignore"    
    )

    # 在添加任何配置之前
    # 请先考虑将其安排在现有或新增的适当配置组中
    # 以提高可读性和可维护性

    # 下面实现了一个钩子函数
    # 在 pydantic v2 中 BaseSettings 支持一个叫 settings_customise_sources 的类方法
    # 用来自定义配置读取顺序和来源，这是一个典型的钩子函数
    # 这意味着你可以告诉 pydantic 
    # - 你自己的配置数据从哪里来（例如远程服务、数据库、API）；
    # - 配置数据的读取顺序应该怎样；
    # - 哪些来源优先级更高。

    @classmethod 
    def settings_customise_sources(
        cls,
        settings_cls: type[BaseSettings],
        init_settings: PydanticBaseSettingsSource,
        env_settings: PydanticBaseSettingsSource,
        dotenv_settings: PydanticBaseSettingsSource,
        file_secret_settings: PydanticBaseSettingsSource,    
    ) -> tuple[PydanticBaseSettingsSource, ...]:
        return (
            init_settings,
            env_settings,
            RemoteSettingsSourceFactory(settings_cls),
            dotenv_settings,
            file_secret_settings,
        )
