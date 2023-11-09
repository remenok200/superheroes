import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'redux/slices/userSlice';

import { VALIDATION_SIGN_UP_SCHEMA } from 'schemas';

const initialValues = {
  nickname: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const dispatch = useDispatch();
  const onSubmitHandler = async (values, { resetForm }) => {
    await dispatch(registerUser(values));
    resetForm();
  };

  return (
    <>
      <h2>Sign up</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={VALIDATION_SIGN_UP_SCHEMA}
      >
        {(formikProps) => (
          <Form>
            <Field name="nickname" placeholder="Type your name" />
            <ErrorMessage name="nickname" />
            <Field name="email" placeholder="Type your email " />
            <ErrorMessage name="email" />
            <Field name="password" placeholder="Type your password " />
            <ErrorMessage name="password" />

            <button type="submit">Sign up</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
