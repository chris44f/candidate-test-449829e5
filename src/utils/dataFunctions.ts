import { Character } from '../components/CharacterList/CharacterListTypes';

export const sortCharacterList = (list: Character[], sortOrder: string) => {
  const significanceSorter = (a: Character, b: Character) =>
    a.significanceIndex - b.significanceIndex;
  const alphabeticalSorter = (a: Character, b: Character) => {
    const collator = new Intl.Collator();
    return collator.compare(a.name, b.name);
  };

  switch (sortOrder) {
    case 'Significance (High to Low)':
      list.sort(significanceSorter);
      break;
    case 'Significance (Low to High)':
      list.sort(significanceSorter).reverse();
      break;
    case 'Alphabetically (A to Z)':
      list.sort(alphabeticalSorter);
      break;
    case 'Alphabetically (Z to A)':
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
