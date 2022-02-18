import React, { useState, useEffect } from 'react';
import styles from './CharacterList.module.scss';
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

  const [listFilter, setListFilter] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<
    typeof SORT_OPTIONS[number] | string
  >(SORT_OPTIONS[0]);
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
        <option
          key={option}
          className={styles['dropdown-option']}
          value={option}
        >
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
          <option
            key={sortOption}
            value={sortOption}
            className={styles['dropdown-option']}
          >
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
    <div className={styles['list-container']}>
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
            <option value={undefined}>Filter by...</option>
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
