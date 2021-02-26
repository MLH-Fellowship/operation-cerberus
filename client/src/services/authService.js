import axios from '../api';
const API_URL = 'http://localhost:5000/auth';

const login = (username, password, setLoginFail) => {
  // console.log(username.target.value);
  // console.log(password.target.value);
  // console.log(JSON.stringify({"username": username, "password": password}));
  fetch(`${API_URL}/login`, {
    headers: new Headers({ 'content-type': 'application/json' }),
    method: 'POST',
    body: JSON.stringify({
      email: username.target.value,
      password: password.target.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, 'Response');
      res.auth_token &&
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: username.target.value,
            password: password.target.value,
            token: res.auth_token,
          })
        );
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      // return {"message": err.message, "status": err.status}
    });
  //   localStorage.setItem(
  //     'user',
  //     JSON.stringify({ username: 'devdo5', id: '49491023' })
  //   );
  //   window.location.reload();
};

const logout = () => {
  localStorage.removeItem('user');
  window.location.reload();
};

const register = (username, email, password) => {
  return fetch(`${API_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// const mapStateToProps = (state) => ({
//   userInformation: state.userInformation,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, {
// storeUserInfoAction,
// })(Auth);

export { login, logout, register, getCurrentUser };
