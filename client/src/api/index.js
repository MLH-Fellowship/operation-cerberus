import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/auth',
});

export const authenticateUser = (email, password) => {
  return axios
    .post(`http://localhost:5000/auth/login`, {
      email: email,
      password: password,
    })
    .then((res) => {
      res.data.auth_token &&
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: email,
            // password: password,
            token: res.data.auth_token,
            isAdmin: res.data.isAdmin
          })
        );
      window.location.reload();
      return res;
    })
    .catch((err) => {
      return err;
    });
};