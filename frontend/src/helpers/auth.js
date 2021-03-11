const getToken = () => localStorage.getItem('token');

export function getClaims() {
  try {
    return JSON.parse(atob(getToken().split('.')[1]));
  } catch (e) {
    return null;
  }
}

export const setToken = (token) => window.localStorage.setItem('token', token);

export const removeToken = () => window.localStorage.removeItem('token');

export const hasToken = () => getToken() !== null;

export const getAuthorizationHeader = () => new Headers({'Authorization': `Bearer ${getToken()}`});

export function getCurrentUser() {
  if(!hasToken()) {
    return null;
  }

  return fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${getClaims().sub}`, {
    method: 'GET',
    headers: getAuthorizationHeader()
  });
}