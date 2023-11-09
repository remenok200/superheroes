import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { getHeroes, addHero } from 'redux/slices/heroSlice';

import { customStyles } from 'common/styles/customStylesForModals';

import { VALIDATION_HERO_SCHEMA } from 'schemas';

import { useDispatch } from 'react-redux';

Modal.setAppElement('#root');

const AddHeroModal = ({
  isAddHeroModalOpen,
  setIsModalOpen,
  setCurrentPageNumber,
}) => {
  const dispatch = useDispatch();

  const handleAddHeroSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addHero(values));
      dispatch(getHeroes(0));
      setCurrentPageNumber(0);
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isAddHeroModalOpen}
      style={customStyles}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <h2>Adding new superhero</h2>
      <Formik
        initialValues={{
          nickname: '',
          realName: '',
          catchPhrase: '',
          originDescription: '',
        }}
        validationSchema={VALIDATION_HERO_SCHEMA}
        onSubmit={handleAddHeroSubmit}
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

            <button type="submit">Add hero</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddHeroModal;
