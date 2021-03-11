import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.config.env import CORS_ORIGINS
from app.config.router import api_router
from app.config.models import create_all_models

create_all_models()

app = FastAPI(title='Challenge', version='0.1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=api_router, prefix='/api')

if __name__ == '__main__':
    uvicorn.run('app.main:app', reload=True, debug=True)
