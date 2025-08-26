from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional, List
import json

class Settings(BaseSettings):
    
    # database
    supabase_url: Optional[str] = None
    supabase_secret_key: Optional[str] = None
    
    # smtp
    smtp_host: Optional[str] = None
    smtp_port: Optional[int] = 587
    smtp_user: Optional[str] = None
    smtp_password: Optional[str] = None

    # resend
    resend_key: Optional[str] = None
    resend_sender: Optional[str] = None
    resend_recipients: Optional[str] = None
    @property
    def resend_recipients_list(self) -> List[str]:
        return json.loads(self.resend_recipients)
    
    # url
    frontend_url: Optional[str] = None
        
    # env
    environment: str = "development"
    debug: bool = False
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore"
    )

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()