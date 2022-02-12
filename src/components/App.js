import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import styles from './App.module.scss';
import { getCharacters } from '../api/characters/charactersApi';

// Character list is available in the public directory

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [characters, setCharacters] = useState(null);

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

      setCharacters(payload.data);
      setLoading(false);
    };

    getCharactersApi();
  }, []);

  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <img src={logo} className={styles['App-logo']} alt="logo" />
        <h1 className="App-title">Lord of the Rings Character Index</h1>
      </header>

      <section className="App-content">
        <CharacterList />
        {/* Lovely character list goes here */}
      </section>
    </div>
  );
}
