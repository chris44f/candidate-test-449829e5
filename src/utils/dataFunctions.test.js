import { sortCharacterList, filterByCategory } from './dataFunctions';

describe('dataFunctions', () => {
  describe('sortCharacterList', () => {
    const characterList = [
      {
        name: 'Arwen Evenstar',
        category: 'elf',
        description: 'Arwens description',
        significanceIndex: 14,
        avatar: 'arwen_evenstar.jpg',
      },
      {
        name: 'Saruman the White',
        category: 'wizard',
        description: 'Sarumans description',
        significanceIndex: 16,
        avatar: 'saruman_the_white.jpg',
      },
      {
        name: 'Galadriel',
        category: 'elf',
        description: 'Galadriels description',
        significanceIndex: 15,
        avatar: 'galadriel.jpg',
      },
      {
        name: 'Éomer',
        category: 'human',
        description: 'Eomers description',
        significanceIndex: 17,
        avatar: 'eomer.jpg',
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

  describe('filterByCategory', () => {
    const characterList = [
      {
        name: 'Arwen Evenstar',
        category: 'elf',
        description: 'Arwens description',
        significanceIndex: 14,
        avatar: 'arwen_evenstar.jpg',
      },
      {
        name: 'Saruman the White',
        category: 'wizard',
        description: 'Sarumans description',
        significanceIndex: 16,
        avatar: 'saruman_the_white.jpg',
      },
      {
        name: 'Galadriel',
        category: 'elf',
        description: 'Galadriels description',
        significanceIndex: 15,
        avatar: 'galadriel.jpg',
      },
      {
        name: 'Éomer',
        category: 'human',
        description: 'Eomers description',
        significanceIndex: 17,
        avatar: 'eomer.jpg',
      },
    ];

    it('returns only and all the characters of the category argument passed', () => {
      expect(filterByCategory(characterList, 'human').length).toBe(1);
      expect(filterByCategory(characterList, 'human')[0].category).toBe(
        'human'
      );
      expect(filterByCategory(characterList, 'human')[0].name).toBe('Éomer');

      expect(filterByCategory(characterList, 'elf').length).toBe(2);
      expect(filterByCategory(characterList, 'elf')[0].category).toBe('elf');
      expect(filterByCategory(characterList, 'elf')[1].category).toBe('elf');
      expect(filterByCategory(characterList, 'elf')[0].name).toBe(
        'Arwen Evenstar'
      );
      expect(filterByCategory(characterList, 'elf')[1].name).toBe('Galadriel');
    });

    it('returns an empty array if no characters match the category argument passed', () => {
      expect(filterByCategory(characterList, 'corrupted hobbit')).toStrictEqual(
        []
      );
    });
  });
});
