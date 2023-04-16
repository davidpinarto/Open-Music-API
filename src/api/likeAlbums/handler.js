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

  async getNumberOfLikesAlbumHandler(request, h) {
    const { id: albumId } = request.params;

    const number = await this._service.getNumberOfLikesAlbum(albumId);

    if (number.cache) {
      const { result } = number;

      return h.response({
        status: 'success',
        data: {
          likes: result,
        },
      }).header('X-Data-Source', 'cache');
    }

    return h.response({
      status: 'success',
      data: {
        likes: number,
      },
    });
  }

  async deleteLikedAlbumHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._service.deleteLikedAlbum(credentialId, albumId);

    return {
      status: 'success',
      message: 'Batal menyukai album berhasil',
    };
  }
}

module.exports = LikesAlbumHandler;
