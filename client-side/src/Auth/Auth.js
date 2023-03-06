import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const checkTokenExpiration = (token) => {
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // convert to seconds

    if (decodedToken.exp < currentTime) {
      return axios.post('http://localhost:3001/api/refresh_token', { token: token })
        .then(response => {
          const newToken = response.data.token;
          localStorage.setItem('secretKey', newToken);
          return newToken;
        })
        .catch(error => {
          throw error;
        });
    } else {
      return Promise.resolve(token);
    }
  } else {
    return Promise.reject('No token found');
  }
};
