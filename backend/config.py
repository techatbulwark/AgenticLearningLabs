import os
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

from dotenv import load_dotenv
load_dotenv()

class Settings(BaseSettings):
    # Database
    supabase_url: Optional[str] = None
    secret_key: Optional[str] = None
    
    # Email
    smtp_host: Optional[str] = None
    smtp_port: Optional[int] = 587
    smtp_user: Optional[str] = None
    smtp_password: Optional[str] = None
    
    # URLs
    frontend_url: Optional[str] = None
    react_app_api_url: Optional[str] = None
        
    # Environment
    environment: str = "development"
    debug: bool = False
    
    # Updated configuration for pydantic-settings
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore"
    )

@lru_cache()
def get_settings() -> Settings:
    return Settings()

# Global settings instance
settings = get_settings()

if __name__ == "__main__":
    print(f"SUPABASE_URL loaded: {bool(settings.supabase_url)}")
    print(f"SECRET_KEY loaded: {bool(settings.secret_key)}")
    print(f"Environment: {settings.environment}")
    print(f"Debug: {settings.debug}")
    
    # Print first few characters of URLs for verification
    if settings.supabase_url:
        print(f"Supabase URL: {settings.supabase_url[:30]}...")
    if settings.secret_key:
        print(f"Secret Key: {settings.secret_key[:30]}...")