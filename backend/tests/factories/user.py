from app.models.address import AddressModel
from app.models.user import UserModel


def build_UserModel():
    return UserModel(
        id=1,
        name='Name',
        email='example@email.com',
        cpf='98130738023',
        pis='98503656268',
        password='password',
        address=AddressModel(
            country='Country',
            state='State',
            city='City',
            street='Street',
            zip_code='00000-000',
            number=1,
            complement='Complement'
        )
    )


