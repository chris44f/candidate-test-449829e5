import { Character } from '../CharacterList/CharacterList';
import React from 'react';

const CharacterTile = ({
  name,
  category,
  description,
  avatar,
}: Character): React.ReactElement => {
  const BASE_URL = process.env.PUBLIC_URL;
  const imageUrl = `${BASE_URL}/characters/${avatar}`;

  return (
    <div>
      <img src={imageUrl} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{category}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const CharacterTileMemoized = React.memo(CharacterTile);
