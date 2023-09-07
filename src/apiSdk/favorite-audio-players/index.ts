import axios from 'axios';
import queryString from 'query-string';
import {
  FavoriteAudioPlayersInterface,
  FavoriteAudioPlayersGetQueryInterface,
} from 'interfaces/favorite-audio-players';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFavoriteAudioPlayers = async (
  query?: FavoriteAudioPlayersGetQueryInterface,
): Promise<PaginatedInterface<FavoriteAudioPlayersInterface>> => {
  const response = await axios.get('/api/favorite-audio-players', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFavoriteAudioPlayers = async (favoriteAudioPlayers: FavoriteAudioPlayersInterface) => {
  const response = await axios.post('/api/favorite-audio-players', favoriteAudioPlayers);
  return response.data;
};

export const updateFavoriteAudioPlayersById = async (
  id: string,
  favoriteAudioPlayers: FavoriteAudioPlayersInterface,
) => {
  const response = await axios.put(`/api/favorite-audio-players/${id}`, favoriteAudioPlayers);
  return response.data;
};

export const getFavoriteAudioPlayersById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/favorite-audio-players/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteFavoriteAudioPlayersById = async (id: string) => {
  const response = await axios.delete(`/api/favorite-audio-players/${id}`);
  return response.data;
};
