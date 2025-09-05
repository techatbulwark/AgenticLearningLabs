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
        'http://localhost:5173'
    ])
else:
    origins.extend([
        settings.frontend_url,
    ])

app = FastAPI(debug=settings.environment == "development")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
app.include_router(router)
app.include_router(email_router)

if __name__ == '__main__':
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=settings.debug)