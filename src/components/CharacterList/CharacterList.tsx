import React, { useState, useEffect } from 'react';
import { CharacterTile } from '../CharacterTile/CharacterTile';

type ListProps = {
  characters: Array<Character> | null;
};

export interface Character {
  name: string;
  category: string;
  description: string;
  // Check whether this should be optional
  significanceIndex?: number;
  avatar: string;
}

const SORT_OPTIONS = ['alphabetically', 'significance'] as const;

export const CharacterList = ({
  characters,
}: ListProps): React.ReactElement => {
  const [listFilter, setListFilter] = useState<string | null>(null);
  const [listSort, setListSort] = useState<'alphabetically' | 'significance'>(
    SORT_OPTIONS[0]
  );
  const [filteredAndSortedList, setFilteredAndSortedList] = useState<
    Character[] | null
  >(characters);

  useEffect(() => {
    if (listFilter && characters) {
      setFilteredAndSortedList(
        characters.filter((character) => character.category === listFilter)
      );
    }

    if (!listFilter && characters) {
      setFilteredAndSortedList(characters);
    }
  }, [listFilter]);

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
        <option onClick={() => setListFilter(option)}>{option}</option>
      ));
    }

    return null;
  };

  const renderSortOptions = () => {
    return SORT_OPTIONS.map((sortOption) => {
      return (
        <option onClick={() => setListSort(sortOption)}>{sortOption}</option>
      );
    });
  };

  const renderCharacterTiles = () => {
    return filteredAndSortedList?.map((character) => (
      <CharacterTile
        name={character.name}
        category={character.category}
        description={character.description}
        avatar={character.avatar}
      />
    ));
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
      {characters ? renderCharacterTiles() : null}
    </div>
  );
};
