import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Widget from '../components/widget';
import Form from '../components/form';
import serializeForm from '../helpers/serializeForm';
import { setToken } from '../helpers/auth';
import { extractRequestErrorMsg } from '../helpers/handleRequest';

export default function LoginPage() {
  const [alert, setAlert] = useState();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth`, {
      method: 'POST',
      body: JSON.stringify(serializeForm(e.target))
    });
    
    response.json().then(json => {
      if(response.status === 200) {
        setToken(json.token);
        history.push('/account');
      } else {
        setAlert(extractRequestErrorMsg(json));
      }
    });
  }

  return (
    <Widget title="Olá visitante">

      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Column>
            <Form.Input type="text" name="login" placeholder="Email, CPF ou PIS" autocomplete="off" required />
            <Form.Input type="password" name="password" placeholder="Senha" autocomplete="off" required />
          </Form.Column>
        </Form.Row>
        <Form.Alert>{alert}</Form.Alert>
        <Form.Row>
            <Form.Button type="button" onClick={ () => history.push('/signup') }>Criar uma conta</Form.Button>
            <Form.Button.Ok type="submit">Entrar</Form.Button.Ok>
        </Form.Row>
      </Form>

    </Widget>
  );
}