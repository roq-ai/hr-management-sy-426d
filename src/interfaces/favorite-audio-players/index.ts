import { UserInterface } from 'interfaces/user';
import { AudioPlayerInterface } from 'interfaces/audio-player';
import { GetQueryInterface } from 'interfaces';

export interface FavoriteAudioPlayersInterface {
  id?: string;
  user_id: string;
  audio_player_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  audio_player?: AudioPlayerInterface;
  _count?: {};
}

export interface FavoriteAudioPlayersGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  audio_player_id?: string;
}
