import React, { useState, useEffect } from 'react';
import styles from './CharacterList.module.scss';
import { CharacterTileMemoized } from '../CharacterTile/CharacterTile';
import { filterByCategory, sortCharacterList } from '../../utils/dataFunctions';

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

  const [listFilter, setListFilter] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<
    typeof SORT_OPTIONS[number] | string
  >(SORT_OPTIONS[0]);
  const [filteredList, setFilteredList] = useState<Character[] | null>(
    characters
  );

  useEffect(() => {
    if (listFilter && characters) {
      setFilteredList(filterByCategory(characters, listFilter));
    }

    if ((!listFilter || listFilter === 'empty') && characters) {
      setFilteredList(characters);
    }
  }, [listFilter, sortOrder, characters]);

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
        <option key={option} value={option}>
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
          <option key={sortOption} value={sortOption}>
            {sortOption}
          </option>
        );
      });
    }
  };

  const renderCharacterTiles = () => {
    if (filteredList) {
      return sortCharacterList(filteredList, sortOrder).map((character) => {
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
    <div>
      <div className={styles['filters-wrapper']}>
        <div className={styles['dropdown-wrapper']}>
          <label htmlFor="list-filter" className={styles['dropdown-label']}>
            Category
          </label>
          <select
            id="list-filter"
            value={listFilter}
            onChange={(event) => setListFilter(event.target.value)}
          >
            <option value="empty">Filter by...</option>
            {renderFilterOptions()}
          </select>
        </div>
        <div className={styles['dropdown-wrapper']}>
          <label htmlFor="list-sort" className={styles['dropdown-label']}>
            Order by
          </label>
          <select
            id="list-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            {renderSortOptions()}
          </select>
        </div>
      </div>
      <div className={styles['tiles-wrapper']}>
        {filteredList ? renderCharacterTiles() : null}
      </div>
    </div>
  );
};
