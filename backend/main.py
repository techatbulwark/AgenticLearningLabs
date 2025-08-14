from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from api import router
from email_api import email_router

origins = [
    'http://localhost:5173',
]

app = FastAPI(debug=True)
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