import React, { useState } from 'react';
import Slider from 'react-slick';

import { deletePower, addPower } from 'api/superheroesApi';
import { getHeroes } from 'redux/slices/heroSlice';
import { useDispatch } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Hero.module.scss';

import DeleteHeroModal from 'components/Modals/DeleteHeroModal';
import AddPowerModal from 'components/Modals/AddPowerModal';
import EditHeroModal from 'components/Modals/EditHeroModal';

const Hero = ({ hero }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddPowerModalOpen, setIsAddPowerModalOpen] = useState(false);
  const [isEditHeroModalOpen, setIsEditHeroModalOpen] = useState(false);

  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const deletePowerHandler = async (powerId) => {
    await deletePower(hero.id, powerId);
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
          <table key={power.id}>
            <tbody>
              <tr>
                <td>
                  <li>{power.name}</li>
                </td>
                <td>
                  <button onClick={() => deletePowerHandler(power.id)}>
                    Delete power
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </ul>

      {/* Edit hero modal */}
      <button onClick={() => setIsEditHeroModalOpen(true)}>
        Edit superhero
      </button>
      {isEditHeroModalOpen && (
        <EditHeroModal
          hero={hero}
          isEditHeroModalOpen={isEditHeroModalOpen}
          setIsModalOpen={setIsEditHeroModalOpen}
        />
      )}

      {/* Add superpower modal */}
      <button onClick={() => setIsAddPowerModalOpen(true)}>
        Add superpower
      </button>
      {isAddPowerModalOpen && (
        <AddPowerModal
          hero={hero}
          isAddPowerModalOpen={isAddPowerModalOpen}
          setIsModalOpen={setIsAddPowerModalOpen}
        />
      )}

      {/* Delete superhero modal */}
      <button onClick={() => setIsDeleteModalOpen(true)}>
        Delete superhero
      </button>
      {isDeleteModalOpen && (
        <DeleteHeroModal
          hero={hero}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
        />
      )}
    </article>
  );
};

export default Hero;
