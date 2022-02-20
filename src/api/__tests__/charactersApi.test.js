import apiUrls from '../apiUrls';
import { baseAxiosInstance } from '../';
import { getCharacters } from '../characters/charactersApi';

baseAxiosInstance.get = jest.fn();

describe('charactersApi', () => {
  describe('getCharacters', () => {
    it('should call the endpoint and get the response', async () => {
      await getCharacters();

      expect(baseAxiosInstance.get).toBeCalledWith(apiUrls.CHARACTERS);
    });
  });
});
