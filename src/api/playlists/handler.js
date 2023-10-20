/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class PlaylistHandler {
  constructor(playlistsService, songsService, usersService, validator) {
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._usersService = usersService;
    this._validator = validator;

    autoBind(this); // mem-bind nilai this untuk seluruh method sekaligus
  }

  // Playlist Handler
  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistsService.addPlaylist({ name, owner: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._playlistsService.getPlaylists(credentialId);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, credentialId);
    await this._playlistsService.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  // Playlist_Songs Handler
  async postPlaylistSongsHandler(request, h) {
    this._validator.validatePlaylistSongsPayload(request.payload);
    const { songId } = request.payload;
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._songsService.verifySongOnDatabaseById(songId);
    await this._playlistsService.addPlaylistSongs(playlistId, songId, credentialId);

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan pada playlist',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const { id, name, username } = await this._playlistsService.getPlaylist(playlistId);
    const songsInPlaylist = await this._playlistsService.getSongsInPlaylist(playlistId);

    return {
      status: 'success',
      data: {
        playlist: {
          id,
          name,
          username,
          songs: songsInPlaylist,
        },
      },
    };
  }

  async deletePlaylistSongsHandler(request) {
    const { songId } = request.payload;
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistsService.deleteSongsInPlaylist({ playlistId, songId });

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = PlaylistHandler;
