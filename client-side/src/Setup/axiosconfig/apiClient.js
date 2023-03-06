import axios from 'axios';
  const apiClient = axios.create({
  baseURL:process.env.REACT_APP_API_URL,
  headers:{token:localStorage.getItem('secretKey')}
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const status = error.response.status;
    const responseError= error.response.data.error;
    if (status === 400) {
      throw new Error(responseError);
    } else if (status === 401) {
      throw new Error('You are not authorized to access this resource.');
    }  
    else {
      throw new Error('An error occurred. Please try again later.');
    }
  }
);

export default apiClient;