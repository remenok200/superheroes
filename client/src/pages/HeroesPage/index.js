import Hero from 'components/Hero';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroes } from 'redux/slices/heroSlice';
import styles from './Heroes.module.scss';

const HeroesPage = () => {
  const { heroes, isLoading, error } = useSelector((state) => state.heroes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHeroes());
  }, []);

  const heroesCards = heroes.map((hero) => <Hero key={hero.id} hero={hero} />);

  return (
    <section>
      {isLoading && <h1>LOADING...</h1>}
      {error && <h1>ERROR...</h1>}
      {heroesCards}
    </section>
  );
};

export default HeroesPage;
