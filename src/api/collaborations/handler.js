const autoBind = require('auto-bind');

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, usersService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._usersService = usersService;
    this._validator = validator;

    autoBind(this);
  }

  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationsPayload(request.payload);

    const { playlistId, userId } = request.payload;
    const { id: owner } = request.auth.credentials;

    await this._usersService.verifyUserExistById(userId);
    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);

    const collaborationId = await this._collaborationsService.addCollaborations(playlistId, userId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan kolaborasi',
      data: {
        collaborationId,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCollaborationHandler(request, h) {
    this._validator.validateCollaborationsPayload(request.payload);

    const { playlistId, userId } = request.payload;
    const { id: owner } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, owner);
    await this._collaborationsService.deleteCollaborations(playlistId, userId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus kolaborasi',
    });
    return response;
  }
}

module.exports = CollaborationsHandler;
