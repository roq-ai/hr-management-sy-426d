import axios from 'axios';
import queryString from 'query-string';
import { AudioPlayerInterface, AudioPlayerGetQueryInterface } from 'interfaces/audio-player';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAudioPlayers = async (
  query?: AudioPlayerGetQueryInterface,
): Promise<PaginatedInterface<AudioPlayerInterface>> => {
  const response = await axios.get('/api/audio-players', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAudioPlayer = async (audioPlayer: AudioPlayerInterface) => {
  const response = await axios.post('/api/audio-players', audioPlayer);
  return response.data;
};

export const updateAudioPlayerById = async (id: string, audioPlayer: AudioPlayerInterface) => {
  const response = await axios.put(`/api/audio-players/${id}`, audioPlayer);
  return response.data;
};

export const getAudioPlayerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/audio-players/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAudioPlayerById = async (id: string) => {
  const response = await axios.delete(`/api/audio-players/${id}`);
  return response.data;
};
