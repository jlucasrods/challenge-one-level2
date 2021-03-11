import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { hasToken } from './helpers/auth';
import loginPage from './pages/loginPage'
import signupPage from './pages/signupPage';
import accountPage from './pages/accountPage';
import accountDetailsPage from './pages/accountDetailsPage';

function PrivateRoute({ component: Component, ...rest }){
  return (
    <Route 
      {...rest}
      render={props => hasToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
}

function GuestRoute({ component: Component, ...rest }){
  return (
    <Route 
      {...rest}
      render={props => hasToken() ? (
        <Redirect to={{ pathname: '/account', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <GuestRoute exact path='/' component={loginPage} />
        <GuestRoute path='/signup' component={signupPage} />
        <PrivateRoute path='/account' component={accountPage} />
        <PrivateRoute path='/account-details' component={accountDetailsPage} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}