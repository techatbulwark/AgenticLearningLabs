from supabase import create_client, Client
from config import settings

print(settings.supabase_url)

SUPABASE_URL = settings.supabase_url
SECRET_KEY = settings.secret_key

supabase_client: Client = create_client(SUPABASE_URL, SECRET_KEY)

def get_client():
    return supabase_client