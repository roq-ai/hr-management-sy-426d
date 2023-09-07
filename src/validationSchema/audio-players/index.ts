import * as yup from 'yup';

export const audioPlayerValidationSchema = yup.object().shape({
  name: yup.string().required(),
  manufacturer: yup.string().required(),
  model: yup.string().required(),
  release_year: yup.number().integer().required(),
  price: yup.number().integer().required(),
});
