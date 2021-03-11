import uvicorn
from fastapi import FastAPI

from app.config.router import api_router
from app.config.models import create_all_models

create_all_models()

app = FastAPI(title='Challenge', version='0.1.0')

app.include_router(router=api_router, prefix='/api')

if __name__ == '__main__':
    uvicorn.run('app.main:app', reload=True, debug=True)
