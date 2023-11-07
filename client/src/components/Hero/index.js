import React from 'react';
import Slider from 'react-slick';

import { deleteHero } from 'api/superheroesApi';
import { getHeroes } from 'redux/slices/heroSlice';
import { useDispatch } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Hero.module.scss';

const Hero = ({ hero }) => {
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const deleteHandler = async () => {
    await deleteHero(hero.id);
    dispatch(getHeroes());
  };

  return (
    <article>
      <h1>{hero.nickname}</h1>
      <h2>Also known as {hero.realName}</h2>

      <Slider className={styles.slider} {...settings}>
        {hero.images.map((image) => (
          <img
            key={image.id}
            src={`http://localhost:5000/images/${image.path}`}
            alt={hero.nickname}
          />
        ))}
      </Slider>

      <p>Catch phrase: {hero.catchPhrase}</p>
      <p>Origin Description:</p>
      <p>{hero.originDescription}</p>

      <ul>
        {hero.superPowers.map((power) => (
          <li key={power.id}>{power.name}</li>
        ))}
      </ul>

      <button onClick={deleteHandler}>Delete superhero</button>
    </article>
  );
};

export default Hero;
