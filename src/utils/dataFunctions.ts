import { Character } from '../components/CharacterList/CharacterList';

export const sortCharacterList = (list: Character[], sortOrder: string) => {
  const significanceSorter = (a: Character, b: Character) =>
    a.significanceIndex - b.significanceIndex;
  const alphabeticalSorter = (a: Character, b: Character) => {
    const collator = new Intl.Collator();
    return collator.compare(a.name, b.name);
  };

  switch (sortOrder) {
    case 'significance (high to low)':
      list.sort(significanceSorter);
      break;
    case 'significance (low to high)':
      list.sort(significanceSorter).reverse();
      break;
    case 'alphabetically (a to z)':
      list.sort(alphabeticalSorter);
      break;
    case 'alphabetically (z to a)':
      list.sort(alphabeticalSorter).reverse();
      break;
    default:
      return list;
  }

  return list;
};

export const filterByCategory = (
  characters: Character[],
  listFilter: string
) => {
  return characters.filter((character) => character.category === listFilter);
};
