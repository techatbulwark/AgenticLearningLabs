from supabase import create_client, Client

SUPABASE_URL = 'https://tjgpobxeunwvixporebl.supabase.co'
SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZ3BvYnhldW53dml4cG9yZWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODQzNTEsImV4cCI6MjA2NjM2MDM1MX0.pAXi7Ha_-hm61ET1lgphfgBjkmyQnefQkPsV_yvsmHg'

url = SUPABASE_URL
key = SECRET_KEY
supabase_client: Client = create_client(url, key)

def get_client():
    return supabase_client