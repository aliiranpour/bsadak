import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.bsadak.ir',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const { data } = await axios.post('https://api.bsadak.ir/web/refreshtoken', {
          refreshToken,
        });

        localStorage.setItem('accessToken', data.accessToken);
        api.defaults.headers.common['Authorization'] = data.accessToken;
        originalRequest.headers['Authorization'] = data.accessToken;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
