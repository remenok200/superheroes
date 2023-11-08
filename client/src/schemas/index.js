import * as yup from 'yup';

export const VALIDATION_POWER_SCHEMA = yup.object({
  powerName: yup
    .string()
    .trim()
    .min(3, 'Superpower name must be at least 3 characters')
    .required('Superpower name is required'),
});
