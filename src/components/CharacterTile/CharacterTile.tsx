import { Character } from '../CharacterList/CharacterListTypes';
import styles from './CharacterTile.module.scss';
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
    <div className={styles['tile-container']}>
      <img src={imageUrl} alt={name} className={styles['character-image']} />
      <div className={styles['character-info-wrapper']}>
        <h3 className={styles['character-name']}>{name}</h3>
        <p className={styles['character-category']}>{category}</p>
        <p className={styles['character-description']}>{description}</p>
      </div>
    </div>
  );
};

export const CharacterTileMemoized = React.memo(CharacterTile);
