from fastapi import HTTPException, APIRouter, Response, Depends

from app.config.auth import verify_auth
from app.config.db import get_db
from app.crud.user import get_by_cpf, get_by_pis, get_by_email, create, update, delete
from app.models.user import UserModel
from app.schemas.user import UserResponse, UserCreate, UserUpdate

router = APIRouter()


@router.get('/{user_id}', response_model=UserResponse)
def get_user(user_id: int, user_auth: UserModel = Depends(verify_auth)):
    """Get a user by id. One user cannot get another"""
    if user_id != user_auth.id:
        raise HTTPException(status_code=403, detail='Unauthorized to get other users')
    return user_auth


@router.post('', response_model=UserResponse)
def create_user(user_create: UserCreate, db=Depends(get_db)):
    """Register a new user. Email, CPF and PIS must be valid and not yet registered"""
    db_user = get_by_cpf(db, user_create.cpf)
    if db_user:
        raise HTTPException(status_code=400, detail="CPF already registered")

    db_user = get_by_pis(db, user_create.pis)
    if db_user:
        raise HTTPException(status_code=400, detail="PIS already registered")

    db_user = get_by_email(db, user_create.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return create(db, user_create)


@router.put('/{user_id}', response_model=UserResponse)
def update_user(user_id: int, user_update: UserUpdate, user_auth: UserModel = Depends(verify_auth), db=Depends(get_db)):
    """Update a user by id. One user cannot update another"""
    if user_id != user_auth.id:
        raise HTTPException(status_code=403, detail='Unauthorized to update other users')
    return update(db, user_auth, user_update)


@router.delete('/{user_id}', status_code=200)
def delete_user(user_id: int, user_auth: UserModel = Depends(verify_auth), db=Depends(get_db)):
    """Delete a user by id. One user cannot delete another"""
    if user_id != user_auth.id:
        raise HTTPException(status_code=403, detail='Unauthorized to delete other users')
    delete(db, user_auth)
