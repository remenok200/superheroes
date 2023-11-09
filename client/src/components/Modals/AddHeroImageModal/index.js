import React from 'react';
import Modal from 'react-modal';
import { Formik, Form } from 'formik';

import { getHeroes, addImage } from 'redux/slices/heroSlice';

import { customStyles } from 'common/styles/customStylesForModals';

import { useDispatch } from 'react-redux';

Modal.setAppElement('#root');

const AddHeroImageModal = ({
  hero,
  isHeroImageAddModalOpen,
  setIsModalOpen,
  currentPageNumber,
}) => {
  const dispatch = useDispatch();

  const handleAddImageSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    values.images.forEach((image) => {
      formData.append('images', image);
    });
    try {
      await dispatch(addImage({ heroId: hero.id, formData }));
      dispatch(getHeroes(currentPageNumber));
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isHeroImageAddModalOpen}
      style={customStyles}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <h2>Add image(s) for {hero.nickname}</h2>
      <Formik initialValues={{ images: [] }} onSubmit={handleAddImageSubmit}>
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <label>
              Upload image(s):
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={(event) => {
                  const files = [...event.target.files];
                  if (files.length > 10) {
                    alert('You can select up to 10 images');
                    setFieldValue('images', []);
                  } else {
                    setFieldValue('images', files);
                  }
                }}
              />
            </label>

            <button type="submit" disabled={isSubmitting}>
              Upload
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddHeroImageModal;
