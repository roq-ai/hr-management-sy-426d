import { FavoriteAudioPlayersInterface } from 'interfaces/favorite-audio-players';
import { GetQueryInterface } from 'interfaces';

export interface AudioPlayerInterface {
  id?: string;
  name: string;
  manufacturer: string;
  model: string;
  release_year: number;
  price: number;
  created_at?: any;
  updated_at?: any;
  favorite_audio_players?: FavoriteAudioPlayersInterface[];

  _count?: {
    favorite_audio_players?: number;
  };
}

export interface AudioPlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  manufacturer?: string;
  model?: string;
}
