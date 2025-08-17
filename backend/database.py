from supabase import create_client, Client
from config import settings

print(settings.supabase_url, settings.supbase_secret_key)

SUPABASE_URL = settings.supabase_url
SUPABASE_SECRET_KEY = settings.supbase_secret_key

create_client()
supabase_client: Client = create_client(SUPABASE_URL, SUPABASE_SECRET_KEY)

def get_client():
    return supabase_client