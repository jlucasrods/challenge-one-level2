from app.models.user import UserModel


def test_auth_with_invalid_credentials(client, mocker):
    mocker.patch('app.routers.auth.get_by_login', return_value=None)

    response = client.post('/api/auth', json={'login': 'invalid login', 'password': 'bla bla bla'})

    assert response.status_code == 401


def test_auth(client, mocker):
    mocker.patch('app.routers.auth.get_by_login', return_value=UserModel(id=1, password='1234'))
    mocker.patch('app.routers.auth.verify_password', return_value=True)

    response = client.post('/api/auth', json={'login': 'name@email.com', 'password': '1234'})

    assert response.status_code == 200
