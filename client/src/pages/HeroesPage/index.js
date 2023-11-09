import React, { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';

import { useDispatch, useSelector } from 'react-redux';
import { getHeroes } from 'redux/slices/heroSlice';

import CONSTANTS from 'constants/paginate';

import Hero from 'components/Hero';
import AddHeroModal from 'components/Modals/AddHeroModal';

import styles from './Heroes.module.scss';

const HeroesPage = () => {
  const { heroes, totalHeroesCount, lastPageNumber, isLoading, error } =
    useSelector((state) => state.heroes);
  const dispatch = useDispatch();

  const [searchHero, setSearchHero] = useState('');
  const [isAddHeroModalOpen, setIsAddHeroModalOpen] = useState(false);

  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  useEffect(() => {
    setPrevButtonDisabled(currentPageNumber === 0);
    setNextButtonDisabled(currentPageNumber === lastPageNumber - 1);
  }, [currentPageNumber, lastPageNumber]);

  useEffect(() => {
    dispatch(getHeroes(currentPageNumber));
  }, [currentPageNumber, totalHeroesCount]);

  const nextPageHandler = () => {
    if (currentPageNumber < lastPageNumber - 1) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  const prevPageHandler = () => {
    if (currentPageNumber > 0) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  const filteredHeroes = heroes.filter((hero) =>
    hero.nickname.toLowerCase().includes(searchHero.toLowerCase())
  );

  const heroesCards = filteredHeroes.map((hero) => (
    <Hero
      key={hero.id}
      hero={hero}
      currentPageNumber={currentPageNumber}
      setCurrentPageNumber={setCurrentPageNumber}
    />
  ));

  if (isLoading) {
    return (
      <HashLoader
        color="white"
        cssOverride={{ display: 'block', margin: '0 auto' }}
        size={400}
      />
    );
  }

  return (
    <section>
      <input
        type="text"
        value={searchHero}
        onChange={({ target: { value } }) => setSearchHero(value)}
        placeholder="Search by hero nickname"
      />

      {/* Edit hero modal */}
      <button onClick={() => setIsAddHeroModalOpen(true)}>Add superhero</button>

      {isAddHeroModalOpen && (
        <AddHeroModal
          isAddHeroModalOpen={isAddHeroModalOpen}
          setIsModalOpen={setIsAddHeroModalOpen}
          setCurrentPageNumber={setCurrentPageNumber}
        />
      )}
      
      {heroesCards}

      <div>
        <button onClick={prevPageHandler} disabled={prevButtonDisabled}>
          Previous Page
        </button>
        <button onClick={nextPageHandler} disabled={nextButtonDisabled}>
          Next page
        </button>
        <p>You are on the page: {currentPageNumber + 1}</p>
        <p>Total number of pages: {lastPageNumber}</p>
      </div>
    </section>
  );
};

export default HeroesPage;
