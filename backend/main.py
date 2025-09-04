from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

from api import router
from email_api import email_router
from config import settings

origins = []

if settings.environment == "development":
    origins.extend([
        'http://localhost:5173',
    ])    
else:
    origins.extend([
        settings.frontend_url,
        'http://localhost:4173',
    ])    


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
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=settings.debug)