const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.accessToken;
  if (user && token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

export default authHeader;
