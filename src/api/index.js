import axios from 'axios';

const baseURL = process.env.PUBLIC_URL;

export const baseAxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
