import axios from 'axios';
import Cookies from 'universal-cookie';

export default axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true,
});

// in authenticateUser, the login route is hit
// and then a refreshToken is returned in an HTTPOnly Cookie
// then an accessToken is also granted
export const authenticateUser = (email, password) => {
    const data = {
        email: email,
        password: password
    };
    return axios.post(`http://localhost:5000/auth/login`, data, {withCredentials: true})
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
            // console.log(res);
            // console.log(cookies.get('auth_token'));
            // console.log(cookies.get('public'));
            window.location.reload();
            return res;
        })
        .catch((err) => {
        return err;
        });
};