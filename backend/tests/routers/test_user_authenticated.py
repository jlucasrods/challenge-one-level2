from app.config.auth import verify_auth
from app.config.db import get_db
from app.crud import user
from app.main import app
from tests.factories.user import build_UserModel

userModel = build_UserModel()


def mock_verify_auth():
    return userModel


app.dependency_overrides[verify_auth] = mock_verify_auth


def test_get_user(test_app, monkeypatch):
    def mock_get_user():
        return userModel

    monkeypatch.setattr(user, 'get', mock_get_user)

    response = test_app.get('/api/users/1')
    assert response.status_code == 200
    assert response.json()['id'] == userModel.id


def test_get_user_different_from_authenticated(test_app, monkeypatch):
    def mock_get_user():
        return userModel

    monkeypatch.setattr(user, 'get', mock_get_user)

    response = test_app.get('/api/users/2')
    assert response.status_code == 403


def test_delete_user(test_app, monkeypatch):
    def mock_delete_user():
        return None

    monkeypatch.setattr(user, 'delete', mock_delete_user)

    response = test_app.delete('/api/users/1')
    assert response == 200
