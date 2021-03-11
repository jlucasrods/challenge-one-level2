import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Widget from '../components/widget';
import Form from '../components/form';
import serializeForm from '../helpers/serializeForm';
import { getCurrentUser, removeToken, getClaims, getAuthorizationHeader } from '../helpers/auth';
import { extractRequestErrorMsg } from '../helpers/handleRequest';

export default function AccountDetailsPage() {
  const [alert, setAlert] = useState();
  const history = useHistory();
  const [user, setUser] = useState();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  useEffect(() => {
    getCurrentUser().then(response => {
      if(response.status === 200) {
        response.json().then(json => setUser(json));
      } else {
        history.push('/');
      }
    });
  }, [history]);

  function handleLogout() {
    removeToken();
    history.push('/'); 
  }

  function handleDeleteAccount() {
    if(window.confirm('Tem certeza que deseja APAGAR a conta?')) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${getClaims().sub}`, {
        method: 'DELETE',
        headers: getAuthorizationHeader()
      });
      removeToken();
      history.push('/'); 
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${getClaims().sub}`, {
      method: 'PUT',
      headers: getAuthorizationHeader(),
      body: JSON.stringify(serializeForm(e.target))
    });

    const body = await response.json();
    
    if(response.status !== 200) {
      setAlert(extractRequestErrorMsg(body));
    }
      
    oldPasswordRef.current.value = '';
    newPasswordRef.current.value = '';
  }

  return (
    <Widget title="Criar uma conta">

      {user ? (
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Column>
              <Form.Input type="text" name="name" placeholder="Nome" required defaultValue={user.name} />
              <Form.Input type="email" name="email" placeholder="Email" required defaultValue={user.email} />
              <Form.Input.Cleave name="cpf"  placeholder="CPF" required 
                value={user.cpf} 
                options={{ 
                  blocks: [3, 3, 3, 2], 
                  delimiters: ['.', '.', '-'],
                  numericOnly: true
                }}
              />
              <Form.Input.Cleave name="pis" placeholder="PIS" required
                value={user.pis} 
                options={{ 
                  blocks: [3, 5, 2, 1], 
                  delimiters: ['.', '.', '-'],
                  numericOnly: true,
                }}
              />
              <Form.Input type="password" name="oldPassword" placeholder="Senha atual" required  ref={oldPasswordRef} />
              <Form.Input type="password" name="newPassword" placeholder="Nova senha (opcional)" ref={newPasswordRef} />
            </Form.Column>
            <Form.Column>
              <Form.Input type="text" name="address.country" placeholder="País" required defaultValue={user.address.country} />
              <Form.Input type="text" name="address.state" placeholder="Estado" required defaultValue={user.address.state} />
              <Form.Input type="text" name="address.city" placeholder="Cidade" required defaultValue={user.address.city} />
              <Form.Input type="text" name="address.zip_code" placeholder="CEP" required defaultValue={user.address.zip_code} />
              <Form.Input type="text" name="address.street" placeholder="Rua" required defaultValue={user.address.street} />
              <Form.Input type="number" name="address.number" placeholder="Número" required defaultValue={user.address.number} />
              <Form.Input type="text" name="address.complement" placeholder="Complemento" required defaultValue={user.address.complement} />
            </Form.Column>
          </Form.Row>
          <Form.Alert>{alert}</Form.Alert>
          <Form.Row>
              <Form.Button type="button" onClick={handleLogout}>Sair</Form.Button>
              <Form.Button.Warning type="button" onClick={handleDeleteAccount}>Apagar Conta</Form.Button.Warning>
              <Form.Button.Ok type="submit">Atualizar conta</Form.Button.Ok>
          </Form.Row>
        </Form>
      ) : (
        <h2>Carregando...</h2>
      )}

    </Widget>
  );
}