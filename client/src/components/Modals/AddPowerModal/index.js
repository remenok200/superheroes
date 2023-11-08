import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { addPower } from 'api/superheroesApi';
import { getHeroes } from 'redux/slices/heroSlice';

import { customStyles } from 'common/styles/customStylesForModals';

import { VALIDATION_POWER_SCHEMA } from 'schemas';

import { useDispatch } from 'react-redux';

Modal.setAppElement('#root');

const initialValues = {
  powerName: '',
};

const AddPowerModal = ({ hero, isAddPowerModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();

  const handleAddPowerSubmit = async (values, { resetForm }) => {
    try {
      await addPower(hero.id, {
        powers: [values.powerName],
      });
      dispatch(getHeroes());
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isAddPowerModalOpen}
      style={customStyles}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={VALIDATION_POWER_SCHEMA}
        onSubmit={handleAddPowerSubmit}
      >
        {(formikProps) => (
          <Form>
            <label>
              Type superpower name:
              <Field type="text" name="powerName" />
              <ErrorMessage name="powerName" />
            </label>

            <button type="submit">Add superpower</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddPowerModal;
