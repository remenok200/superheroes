import axios from 'axios';
import history from 'browserHistory';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

export const loginUser = async (userData) => {
  const response = await httpClient.post('/sign-in', userData);
  if (response.status === 200) {
    history.push('/heroes');
  }
};

export const registerUser = async (userData) => {
  const response = await httpClient.post('/sign-up', userData);
  if (response.status === 201) {
    history.push('/heroes');
  }
};
