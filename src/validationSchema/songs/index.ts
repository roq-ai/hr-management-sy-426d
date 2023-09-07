import * as yup from 'yup';

export const songValidationSchema = yup.object().shape({
  title: yup.string().required(),
  artist: yup.string().required(),
  album: yup.string().required(),
  genre: yup.string().required(),
  release_year: yup.number().integer().required(),
});
