import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getHeroes = async () => await httpClient.get('/superheroes');

export const deleteHero = async (heroId) =>
  await httpClient.delete(`/superheroes/${heroId}`);

export const deletePower = async (heroId, powerId) =>
  await httpClient.delete(`/superheroes/${heroId}/powers/${powerId}`);