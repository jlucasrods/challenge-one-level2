import pytest


@pytest.fixture
def user():
    return {
        'name': 'Name',
        'email': 'example@email.com',
        'cpf': '98130738023',
        'pis': '98503656268',
        'password': 'password',
        'address': {
            'country': 'Country',
            'state': 'State',
            'city': 'City',
            'street': 'Street',
            'zip_code': '00000-000',
            'number': 1,
            'complement': 'Complement'
        }
    }


def test_create_user_with_invalid_cpf(client, user):
    """When receive a UserCreate schema with invalid CPF raises unprocessable entity"""
    user['cpf'] = '00000000000'
    response = client.post('/api/users', json=user)

    assert response.status_code == 422


def test_create_user_with_invalid_pis(client, user):
    """When receive a UserCreate schema with invalid PIS raises unprocessable entity"""
    user['pis'] = '00000000000'
    response = client.post('/api/users', json=user)

    assert response.status_code == 422


def test_create_user(client, user, mocker):
    """When receive a UserCreate schema returns a UserResponse schema successfully"""
    response = client.post('/api/users', json=user)

    assert response.status_code == 200
    data = response.json()
    assert 'id' in data
    assert data['email'] == user['email']
    assert 'password' not in data


def test_get_other_user(authorized_client):
    """When receive request for a user other than the authorized raises forbidden"""
    response = authorized_client.get('/api/users/2')

    assert response.status_code == 403


def test_get_user(authorized_client, user):
    """When receive request for a user returns a UserResponse schema successfully"""
    response = authorized_client.get('/api/users/1')

    assert response.status_code == 200
    data = response.json()
    assert 'email' in data
    assert data['email'] == user['email']


def test_update_other_user(authorized_client, user):
    """When receive a UserUpdate schema for a user other than the authorized raises forbidden"""
    user['oldPassword'] = user['password']
    user['password'] = None
    user['newPassword'] = '1234'
    user['email'] = 'newExample@mail.com'

    response = authorized_client.put('/api/users/2', json=user)

    assert response.status_code == 403


def test_update_user(authorized_client, user):
    """When receive a UserUpdate schema returns a UserUpdate schema successfully"""
    user['oldPassword'] = user['password']
    user['password'] = None
    user['newPassword'] = '1234'
    user['email'] = 'newExample@mail.com'

    response = authorized_client.put('/api/users/1', json=user)

    assert response.status_code == 200
    data = response.json()
    assert 'email' in data
    assert data['email'] == user['email']
    assert 'password' not in data


def test_update_user_with_wrong_password(authorized_client, user):
    """When receive a UserUpdate schema with invalid password confirmation raises bad request"""
    user['oldPassword'] = 'this_password_is_wrong'
    user['password'] = None
    user['email'] = 'newExample@mail.com'

    response = authorized_client.put('/api/users/1', json=user)

    assert response.status_code == 400


def test_delete_other_user(authorized_client):
    """When receive a request to delete a user other than the authorized raises forbidden """
    response = authorized_client.delete('/api/users/2')

    assert response.status_code == 403


def test_delete_user(authorized_client):
    """When receive a request to delete a user returns successfully"""
    response = authorized_client.delete('/api/users/1')

    assert response.status_code == 200
    data = response.json()
    assert data is None
