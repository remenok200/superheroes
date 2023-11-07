import Hero from 'components/Hero';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroes } from 'redux/slices/heroSlice';
import styles from './Heroes.module.scss';

const HeroesPage = () => {
  const { heroes, isLoading, error } = useSelector((state) => state.heroes);
  const dispatch = useDispatch();

  const [searchHero, setSearchHero] = useState('');

  useEffect(() => {
    dispatch(getHeroes());
  }, []);

  const filteredHeroes = heroes.filter((hero) =>
    hero.nickname.toLowerCase().includes(searchHero.toLowerCase())
  );

  const heroesCards = filteredHeroes.map((hero) => (
    <Hero key={hero.id} hero={hero} />
  ));

  return (
    <section>
      <input
        type="text"
        value={searchHero}
        onChange={({ target: { value } }) => setSearchHero(value)}
        placeholder="Search by hero nickname"
      />
      {isLoading && <h1>LOADING...</h1>}
      {error && <h1>ERROR...</h1>}
      {heroesCards}
    </section>
  );
};

export default HeroesPage;
