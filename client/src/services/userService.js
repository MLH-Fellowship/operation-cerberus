import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/test';

const getPublicContent = () => {
  return fetch(`${API_URL}/all`);
};

const getPrivateContent = () => {
  return fetch(`${API_URL}/private`, {
    headers: authHeader()
  });
};

export { getPrivateContent, getPublicContent };
