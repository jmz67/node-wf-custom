
from pathlib import Path 
from pydantic import BaseSettings, Field 


from pathlib import Path
from pydantic import BaseSettings, Field, computed_field

BASE_DIR = Path(__file__).resolve().parent


class DatabaseConfig(BaseSettings):
    DB_ENGINE: str = Field(default="sqlite", description="Database engine: sqlite/mysql/postgres")
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_USER: str = "user"
    DB_PASSWORD: str = "password"
    DB_NAME: str = "app"

    ENGINE_MAP = {
        "sqlite": "tortoise.backends.sqlite",
        "mysql": "tortoise.backends.mysql",
        "postgres": "tortoise.backends.asyncpg",
    }

    @computed_field
    def TORTOISE_ORM(self) -> dict:
        """
        自动生成 Tortoise ORM 配置结构。
        """
        engine = self.ENGINE_MAP.get(self.DB_ENGINE)
        if not engine:
            raise ValueError(f"Unsupported DB_ENGINE: {self.DB_ENGINE}")

        if self.DB_ENGINE == "sqlite":
            credentials = {"file_path": f"{BASE_DIR}/db.sqlite3"}
        else:
            credentials = {
                "host": self.DB_HOST,
                "port": self.DB_PORT,
                "user": self.DB_USER,
                "password": self.DB_PASSWORD,
                "database": self.DB_NAME,
            }

        return {
            "connections": {
                "default": {
                    "engine": engine,
                    "credentials": credentials,
                }
            },
            "apps": {
                "models": {
                    "models": ["your_app.models", "aerich.models"],
                    "default_connection": "default",
                }
            },
        }


class MiddlewareConfig(
    DatabaseConfig
):
    pass 