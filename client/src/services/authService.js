const API_URL = 'http://localhost:8080/api/auth';

const login = (username, password) => {
  // return fetch(`${API_URL}/login`, {
  //   method: 'POST',
  //   body: JSON.stringify({ username, password })
  // }).then((res) => {
  //   const resData = res.data;
  //   resData.accessToken &&
  //     localStorage.setItem('user', JSON.stringify(resData));
  //   return resData;
  // });
  localStorage.setItem(
    'user',
    JSON.stringify({ username: 'devdo5', id: '49491023' })
  );
  window.location.reload();
};

const logout = () => {
  localStorage.removeItem('user');
  window.location.reload();
};

const register = (username, email, password) => {
  return fetch(`${API_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export { login, logout, register, getCurrentUser };
