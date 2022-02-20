import { sortCharacterList, filterByCategory } from './dataFunctions';

describe('dataFunctions', () => {
  describe('sortCharacterList', () => {
    const characterList = [
      {
        name: 'Arwen Evenstar',
        significanceIndex: 14,
      },
      {
        name: 'Saruman the White',
        significanceIndex: 16,
      },
      {
        name: 'Galadriel',
        significanceIndex: 15,
      },
      {
        name: 'Éomer',
        significanceIndex: 17,
      },
    ];

    it('sorts character list alphabetically, starting with a, when sortOrder argument is alphabetically a to z', () => {
      const result = sortCharacterList(
        characterList,
        'alphabetically (a to z)'
      );

      expect(result[0].name).toBe('Arwen Evenstar');
      expect(result[1].name).toBe('Éomer');
      expect(result[2].name).toBe('Galadriel');
      expect(result[3].name).toBe('Saruman the White');
    });

    it('sorts character list reverse alphabetically, starting with z, when sortOrder argument is alphabetically (z to a)', () => {
      const result = sortCharacterList(
        characterList,
        'alphabetically (z to a)'
      );

      expect(result[0].name).toBe('Saruman the White');
      expect(result[1].name).toBe('Galadriel');
      expect(result[2].name).toBe('Éomer');
      expect(result[3].name).toBe('Arwen Evenstar');
    });

    it('sorts character list by significance, starting with lowest, when sortOrder argument is significance (low to high)', () => {
      const result = sortCharacterList(
        characterList,
        'significance (low to high)'
      );

      expect(result[0].name).toBe('Éomer');
      expect(result[1].name).toBe('Saruman the White');
      expect(result[2].name).toBe('Galadriel');
      expect(result[3].name).toBe('Arwen Evenstar');
    });

    it('sorts character list by significance, starting with highest, when sortOrder argument is significance (high to low)', () => {
      const result = sortCharacterList(
        characterList,
        'significance (high to low)'
      );

      expect(result[0].name).toBe('Arwen Evenstar');
      expect(result[1].name).toBe('Galadriel');
      expect(result[2].name).toBe('Saruman the White');
      expect(result[3].name).toBe('Éomer');
    });
  });
});
