import * as yup from 'yup';

export const VALIDATION_POWER_SCHEMA = yup.object({
  powerName: yup
    .string()
    .trim()
    .min(3, 'Superpower name must be at least 3 characters')
    .required('Superpower name is required'),
});

export const VALIDATION_HERO_SCHEMA = yup.object({
  nickname: yup
    .string()
    .trim()
    .min(3, 'Nickname must be at least 3 characters')
    .required('Nickname is required'),
  realName: yup
    .string()
    .trim()
    .min(3, 'Real name must be at least 3 characters')
    .required('Real name is required'),
  catchPhrase: yup
    .string()
    .trim()
    .min(3, 'Catch phrase must be at least 3 characters')
    .required('Catch phrase is required'),
  originDescription: yup
    .string()
    .trim()
    .min(10, 'Origin description must be at least 10 characters')
    .required('Origin description is required'),
});

export const VALIDATION_SIGN_UP_SCHEMA = yup.object({
  nickname: yup
    .string()
    .trim()
    .min(3, 'Nickname must be at least 3 characters')
    .required('Nickname is required'),
  email: yup
    .string()
    .trim()
    .email('Email must be a valid')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Password must be at least 8 characters long, including upper and lower case letters, numbers and special characters (#?!@$ %^&*-)'
    )
    .required('Password is required'),
});

export const VALIDATION_SIGN_IN_SCHEMA = yup.object({
  email: yup
    .string()
    .trim()
    .email('Email must be a valid')
    .required('Email is required'),
  password: yup.string().trim().required('Password is required'),
});
