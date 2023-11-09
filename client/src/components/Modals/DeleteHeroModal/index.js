import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import { deleteHero } from 'api/superheroesApi';
import { getHeroes } from 'redux/slices/heroSlice';

import { customStyles } from 'common/styles/customStylesForModals';

Modal.setAppElement('#root');

const DeleteHeroModal = ({ hero, isDeleteModalOpen, setIsModalOpen, currentPageNumber }) => {
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    await deleteHero(hero.id);
    dispatch(getHeroes(currentPageNumber));
  };

  return (
      <Modal isOpen={isDeleteModalOpen} style={customStyles} onRequestClose={() => setIsModalOpen(false)}>
      <h2>Warning! Destructive action: delete hero</h2>
      <p>Are you sure want to delete {hero.nickname}?</p>

      <button onClick={deleteHandler}>Yes</button>
      <button onClick={() => setIsModalOpen(false)}>No</button>
    </Modal>
  );
};

export default DeleteHeroModal;
