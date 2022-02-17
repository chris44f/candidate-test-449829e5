import React, { useState, useEffect } from 'react';
import { CharacterTileMemoized } from '../CharacterTile/CharacterTile';

type ListProps = {
  characters: Array<Character> | null;
};

export interface Character {
  name: string;
  category: string;
  description: string;
  significanceIndex: number;
  avatar: string;
}

export const CharacterList = ({
  characters,
}: ListProps): React.ReactElement => {
  const SORT_OPTIONS = [
    'alphabetically (a to z)',
    'alphabetically (z to a)',
    'significance (high to low)',
    'significance (low to high)',
  ] as const;

  const [listFilter, setListFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<typeof SORT_OPTIONS[number]>(
    SORT_OPTIONS[0]
  );
  const [filteredList, setFilteredList] = useState<Character[] | null>(
    characters
  );

  useEffect(() => {
    if (listFilter && characters) {
      setFilteredList(
        characters.filter((character) => character.category === listFilter)
      );
    }

    if (!listFilter && characters) {
      setFilteredList(characters);
    }
  }, [listFilter, sortOrder, characters]);

  const sortList = (list: Character[]) => {
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

  const renderFilterOptions = () => {
    const filterOptions: string[] = [];

    if (characters) {
      characters.forEach((character) => {
        return !filterOptions.includes(character.category)
          ? filterOptions.push(character.category)
          : null;
      });
    }

    if (filterOptions.length > 0) {
      return filterOptions.map((option) => (
        <option onClick={() => setListFilter(option)} key={option}>
          {option}
        </option>
      ));
    }

    return null;
  };

  const renderSortOptions = () => {
    if (characters) {
      return SORT_OPTIONS.map((sortOption) => {
        return (
          <option onClick={() => setSortOrder(sortOption)} key={sortOption}>
            {sortOption}
          </option>
        );
      });
    }
  };

  const renderCharacterTiles = () => {
    if (filteredList) {
      return sortList(filteredList).map((character) => {
        return (
          <CharacterTileMemoized
            key={character.name}
            name={character.name}
            category={character.category}
            description={character.description}
            avatar={character.avatar}
            significanceIndex={character.significanceIndex}
          />
        );
      });
    }
  };

  return (
    <div className="list-container">
      <div className="filters-wrapper">
        <label htmlFor="list-filter">Category</label>
        <select id="list-filter">
          <option onClick={() => setListFilter(null)}>Filter by...</option>
          {renderFilterOptions()}
        </select>
        <label htmlFor="list-sort">Order by</label>
        <select id="list-sort">{renderSortOptions()}</select>
      </div>
      {filteredList ? renderCharacterTiles() : null}
    </div>
  );
};
