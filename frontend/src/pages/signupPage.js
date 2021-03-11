import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Widget from '../components/widget';
import Form from '../components/form';
import serializeForm from '../helpers/serializeForm';
import { extractRequestErrorMsg } from '../helpers/handleRequest';

export default function SignUpPage() {
  const [alert, setAlert] = useState();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setAlert(null);

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(serializeForm(e.target))
    });

    const body = await response.json();
    
    if(response.ok) {
      history.push('/');
    } else {
      setAlert(extractRequestErrorMsg(body))
    }
  }

  return (
    <Widget title="Criar uma conta">

      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Column>
            <Form.Input type="text" name="name" placeholder="Nome" required />
            <Form.Input type="email" name="email" placeholder="Email" required />
            <Form.Input.Cleave name="cpf" placeholder="CPF" required options={{ 
              blocks: [3, 3, 3, 2], 
              delimiters: ['.', '.', '-'],
              numericOnly: true
              }}
            />
            <Form.Input.Cleave name="pis" placeholder="PIS" required options={{ 
              blocks: [3, 5, 2, 1], 
              delimiters: ['.', '.', '-'],
              numericOnly: true
              }}
            />
            <Form.Input type="password" name="password" placeholder="Senha" autoComplete="off" required />
          </Form.Column>
          <Form.Column>
            <Form.Input type="text" name="address.country" placeholder="País" required />
            <Form.Input type="text" name="address.state" placeholder="Estado" required />
            <Form.Input type="text" name="address.city" placeholder="Cidade" required />
            <Form.Input type="text" name="address.zip_code" placeholder="CEP" required />
            <Form.Input type="text" name="address.street" placeholder="Rua" required />
            <Form.Input type="number" name="address.number" placeholder="Número" required />
            <Form.Input type="text" name="address.complement" placeholder="Complemento" required />
          </Form.Column>
        </Form.Row>
        <Form.Alert>{alert}</Form.Alert>
        <Form.Row>
            <Form.Button type="button" onClick={ () => history.push('/') }>Fazer login</Form.Button>
            <Form.Button.Ok type="submit">Criar conta</Form.Button.Ok>
        </Form.Row>
      </Form>

    </Widget>
  );
}