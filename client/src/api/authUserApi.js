import axios from 'axios';
import history from 'browserHistory';

let geolocation;
navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    geolocation = `${latitude} ${longitude}`;
  }
);

const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

export const loginUser = async (userData) => {
  const response = await httpClient.post('/sign-in', {
    ...userData,
    geolocation,
  });
  if (response.status === 200) {
    history.push('/heroes');
  }
};

export const registerUser = async (userData) => {
  const response = await httpClient.post('/sign-up', {
    ...userData,
    geolocation,
  });
  if (response.status === 201) {
    history.push('/heroes');
  }
};

export const getAllUsers = async () => await httpClient.get('/all');

export const authUser = async () => await httpClient.get('/');

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

httpClient.interceptors.response.use(
  (response) => {
    if (response.data.tokens) {
      const {
        data: { tokens },
      } = response;
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }

    return response;
  },
  async (err) => {
    if (err.response.status === 403 && localStorage.getItem('refreshToken')) {
      await refreshUser();

      // Викликати заново функцію, на якій сталася помилка, після отримання токену
      return await httpClient(err.config);
    } else if (err.response.status === 401) {
      localStorage.clear();
      history.replace('/');
    } else {
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

export const refreshUser = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const { data } = await httpClient.post('/refresh', {
    refreshToken,
    geolocation,
  });
  
  return data;
};
