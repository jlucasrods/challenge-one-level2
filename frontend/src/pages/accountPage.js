import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Widget from '../components/widget';
import Form from '../components/form';
import { getCurrentUser, removeToken } from '../helpers/auth';

export default function AccountPage() {
  const history = useHistory();
  const [name, setName] = useState('...');
  
  useEffect(() => {
    getCurrentUser().then(response => {
      if(response.status === 200) {
        response.json().then(json => setName(json.name));
      } else {
        removeToken();
        history.push('/');
      }
    });
  }, [history]);

  function handleLogout() {
    removeToken();
    history.push('/'); 
  }

  return (
    <Widget title={`Olá ${name}`}>
      <Form>
          <Form.Button.Ok type="button" onClick={() => history.push('/account-details')}>Ver meus dados</Form.Button.Ok>
          <Form.Button.Warning type="button" onClick={handleLogout}>Sair</Form.Button.Warning>
      </Form>
    </Widget>
  );
}