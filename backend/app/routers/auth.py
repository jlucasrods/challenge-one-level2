from fastapi import APIRouter, HTTPException, Depends

from app.config.auth import create_token
from app.config.db import get_db
from app.config.pass_hashing import verify_password
from app.crud.user import get_by_login
from app.schemas.auth import AuthRequest, AuthResponse

router = APIRouter()


@router.post('')
def login(credentials: AuthRequest, db=Depends(get_db)):
    user = get_by_login(db, credentials.login)

    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail='Invalid credentials')

    token = create_token(user.id)
    return AuthResponse(token=token)
