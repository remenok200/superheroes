import axios from 'axios';
import history from 'browserHistory';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getHeroes = async (limit, offset) =>
  await httpClient.get(`/superheroes/?limit=${limit}&offset=${offset}`);

export const deleteHero = async (heroId) =>
  await httpClient.delete(`/superheroes/${heroId}`);

export const deletePower = async (heroId, powerId) =>
  await httpClient.delete(`/superheroes/${heroId}/powers/${powerId}`);

export const addPower = async (heroId, powers) =>
  await httpClient.post(`/superheroes/${heroId}/powers`, powers);

export const editHero = async (heroId, updates) =>
  await httpClient.put(`/superheroes/${heroId}`, updates);

export const addHero = async (hero) =>
  await httpClient.post('/superheroes', hero);

export const deleteImage = async (heroId, imageId) =>
  await httpClient.delete(`/superheroes/${heroId}/images/${imageId}`);

export const addImage = async (heroId, formData) =>
  await httpClient.post(`/superheroes/${heroId}/images`, formData);

export const createRandomHero = async () =>
  await httpClient.post('/superheroes/random');

export const authUser = async () => await httpClient.get('/users');

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

  let geolocation;
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      geolocation = `${latitude} ${longitude}`;
    }
  );

  const { data } = await httpClient.post('/users/refresh', {
    refreshToken,
    geolocation,
  });
  return data;
};
