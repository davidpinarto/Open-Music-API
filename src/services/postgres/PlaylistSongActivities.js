const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class PlaylistSongActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async _writeActivitiesFunction(playlistId, songId, userId, action) {
    const id = `playlist-songs-activitites-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, playlistId, songId, userId, action, time],
    };
    await this._pool.query(query);
  }

  async addPlaylistActivities(playlistId, songId, userId, action) {
    await this._writeActivitiesFunction(playlistId, songId, userId, action);
  }

  async deletePlaylistActivities(playlistId, songId, userId, action) {
    await this._writeActivitiesFunction(playlistId, songId, userId, action);
  }

  async getPlaylistActivities(playlistId) {
    const query = {
      text: `
        SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time
        FROM playlist_song_activities
        INNER JOIN playlists ON playlists.id = playlist_song_activities.playlist_id
        INNER JOIN songs ON songs.id = playlist_song_activities.song_id
        INNER JOIN users ON users.id = playlist_song_activities.user_id
        WHERE playlist_song_activities.playlist_id = $1
      `,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistSongActivitiesService;
