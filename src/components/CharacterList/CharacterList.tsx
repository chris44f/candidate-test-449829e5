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
  const SORT_OPTIONS = ['alphabetically', 'significance'] as const;

  const [listFilter, setListFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'alphabetically' | 'significance'>(
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
    if (sortOrder === 'significance') {
      list.sort((a, b) => {
        return a.significanceIndex - b.significanceIndex;
      });
    }

    if (sortOrder === 'alphabetically') {
      const collator = new Intl.Collator();
      list.sort((a, b) => {
        return collator.compare(a.name, b.name);
      });
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
