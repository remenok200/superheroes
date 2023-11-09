import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from 'redux/slices/userSlice';

import { VALIDATION_SIGN_IN_SCHEMA } from 'schemas';

const initialValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  const { isLoading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSubmitHandler = async (values, { resetForm }) => {
    await dispatch(loginUser(values));
    resetForm();
  };

  return (
    <>
      <h2>Sign In</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={VALIDATION_SIGN_IN_SCHEMA}
      >
        {(formikProps) => (
          <Form>
            <Field name="email" placeholder="Type your email" />
            <ErrorMessage name="email" />
            <Field name="password" placeholder="Type your password" />
            <ErrorMessage name="password" />

            <button>Sign in</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
