import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { editHero } from 'api/superheroesApi';
import { getHeroes } from 'redux/slices/heroSlice';

import { customStyles } from 'common/styles/customStylesForModals';

import { VALIDATION_HERO_SCHEMA } from 'schemas';

import { useDispatch } from 'react-redux';

Modal.setAppElement('#root');

const EditHeroModal = ({ hero, isEditHeroModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();

  const handleEditHeroSubmit = async (values, { resetForm }) => {
    try {
      await editHero(hero.id, values);
      dispatch(getHeroes());
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isEditHeroModalOpen}
      style={customStyles}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <h2>Edit information about {hero.nickname}</h2>
      <Formik
        initialValues={{
          nickname: hero.nickname,
          realName: hero.realName,
          catchPhrase: hero.catchPhrase,
          originDescription: hero.originDescription,
        }}
        validationSchema={VALIDATION_HERO_SCHEMA}
        onSubmit={handleEditHeroSubmit}
      >
        {(formikProps) => (
          <Form>
            <label>
              Nickname:
              <Field name="nickname" />
              <ErrorMessage name="nickname" />
            </label>

            <label>
              Real name:
              <Field name="realName" />
              <ErrorMessage name="realName" />
            </label>

            <label>
              Catch Phrase:
              <Field name="catchPhrase" />
              <ErrorMessage name="catchPhrase" />
            </label>

            <label>
              Origin description:
              <Field name="originDescription" />
              <ErrorMessage name="originDescription" />
            </label>

            <button type="submit">Save changes</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditHeroModal;
