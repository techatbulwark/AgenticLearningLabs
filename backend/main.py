from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import os

from api import router
from email_api import email_router

load_dotenv()

origins = []
if os.getenv("ENVIRONMENT") == "development":
    origins.extend([
        'http://localhost:5173',
    ])    
if os.getenv("FRONTEND_URL"):
    origins.append(os.getenv("FRONTEND_URL"))
    origins.append('http://localhost:4173')
print(origins)

app = FastAPI(debug=os.getenv("ENVIRONMENT") == "development")
app.include_router(router)
app.include_router(email_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)