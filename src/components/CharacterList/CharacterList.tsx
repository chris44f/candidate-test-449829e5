import React from 'react';
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

export const CharacterList = ({
  characters,
}: ListProps): React.ReactElement => {
  const renderCharacterTiles = () =>
    characters?.map((character) => {
      return (
        <CharacterTile
          name={character.name}
          category={character.category}
          description={character.description}
          avatar={character.avatar}
        />
      );
    });

  return (
    <div>
      <div>
        <div>Filters</div>
        <select>
          <option>hi</option>
          <option>hi1</option>
          <option>hi2</option>
          <option>hi3</option>
        </select>
        <select>
          <option>byei</option>
          <option>bue1</option>
          <option>buei2</option>
          <option>bi3</option>
        </select>
        <select>
          <option>ji</option>
          <option>ji1</option>
          <option>ji2</option>
          <option>ji3</option>
        </select>
      </div>
      {characters ? renderCharacterTiles() : null}
    </div>
  );
};
