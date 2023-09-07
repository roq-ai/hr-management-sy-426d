import * as yup from 'yup';

export const favoriteAudioPlayersValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  audio_player_id: yup.string().nullable().required(),
});
