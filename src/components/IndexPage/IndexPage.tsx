import React, { useEffect, useState } from 'react';
import logo from '../../logo.svg';
import styles from './IndexPage.module.scss';
import { getCharacters } from '../../api/characters/charactersApi';
import { CharacterList, Character } from '../CharacterList/CharacterList';

interface Error {
  request?: string;
  status?: number;
  data?: any;
  message?: string;
}

export default function IndexPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [characters, setCharacters] = useState<Character[] | null>(null);

  useEffect(() => {
    const getCharactersApi = async () => {
      const payload = await getCharacters().catch((err) => {
        if (err.response) {
          setError({ status: err.response.status, data: err.response.data });
        } else if (err.request) {
          setError(err.request);
        } else {
          setError(err.message);
        }
      });

      setCharacters(payload?.data);
      setLoading(false);
    };

    getCharactersApi();
  }, []);

  return (
    <div className={styles['App']}>
      <header className={styles['App-header']}>
        <img src={logo} className={styles['App-logo']} alt="logo" />
        <h1 className={styles['App-title']}>
          Lord of the Rings Character Index
        </h1>
      </header>

      <section className={styles['App-content']}>
        {error ? (
          <div>Sorry, there seems to be an error, please try again.</div>
        ) : null}
        {loading ? (
          <div className={styles['loading-text']}>Loading...</div>
        ) : (
          <CharacterList characters={characters} />
        )}
      </section>
    </div>
  );
}
