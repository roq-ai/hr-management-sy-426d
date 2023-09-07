const mapping: Record<string, string> = {
  'audio-players': 'audio_player',
  'favorite-audio-players': 'favorite_audio_players',
  'favorite-songs': 'favorite_songs',
  organizations: 'organization',
  songs: 'song',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
