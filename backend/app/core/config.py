import os
from functools import lru_cache
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # App Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    APP_NAME: str = "VisionCraft AI Backend"

    # Security Settings
    # Supports single origin or comma-separated list of origins
    ALLOWED_ORIGINS: Union[str, List[str]] = ["https://vision-craft-ai-ri9p-ten.vercel.app", "http://localhost:3000"]
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB in bytes

    # Storage Paths (Relative to project root)
    MODEL_DIRECTORY: str = "ai_models"
    TEMP_DIRECTORY: str = "temp"
    OUTPUT_DIRECTORY: str = "outputs"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            # Split by comma and strip whitespaces
            return [item.strip() for item in v.split(",") if item.strip()]
        return v

    @property
    def model_dir_path(self) -> str:
        return os.path.abspath(self.MODEL_DIRECTORY)

    @property
    def temp_dir_path(self) -> str:
        return os.path.abspath(self.TEMP_DIRECTORY)

    @property
    def output_dir_path(self) -> str:
        return os.path.abspath(self.OUTPUT_DIRECTORY)


@lru_cache
def get_settings() -> Settings:
    return Settings()
