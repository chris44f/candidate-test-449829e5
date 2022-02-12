import apiUrls from '../apiUrls';
import { baseAxiosInstance } from '../index';

const { CHARACTERS } = apiUrls;

export const getCharacters = () => {
  return baseAxiosInstance.get(CHARACTERS);
};
