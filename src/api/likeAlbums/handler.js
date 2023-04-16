/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class LikesAlbumHandler {
  constructor(service, albumsService) {
    this._service = service;
    this._albumsService = albumsService;

    autoBind(this); // mem-bind nilai this untuk seluruh method sekaligus
  }

  async postLikesAlbumHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._albumsService.verifyAlbumExist(albumId);
    await this._service.checkAlreadyLikeAlbum(credentialId);
    await this._service.addLikesAlbum(credentialId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil disukai',
    });
    response.code(201);
    return response;
  }

  async getNumberOfLikesAlbumHandler(request) {
    const { id: albumId } = request.params;

    const number = await this._service.getNumberOfLikesAlbum(albumId);

    return {
      status: 'success',
      data: {
        likes: number,
      },
    };
  }

  async deleteLikedAlbumHandler(request) {
    const { id: credentialId } = request.auth.credentials;

    await this._service.deleteLikedAlbum(credentialId);

    return {
      status: 'success',
      message: 'Batal menyukai album berhasil',
    };
  }
}

module.exports = LikesAlbumHandler;
