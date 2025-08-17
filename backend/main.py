from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

from api import router
from email_api import email_router

from config import settings

origins = []
if settings.environment == "[development]":
    origins.extend([
        'http://localhost:5173',
    ])    
if settings.frontend_url:
    origins.append(settings.frontend_url)
    origins.append('http://localhost:4173/register')
print(origins)

app = FastAPI(debug=settings.environment == "development")
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
    uvicorn.run(app, host='0.0.0.0', port=8080)