/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');
const config = require('../../utils/env/config');

class CoversHandler {
  constructor(service, validator, albumsService) {
    this._service = service;
    this._validator = validator;
    this._albumsService = albumsService;

    autoBind(this); // mem-bind nilai this untuk seluruh method sekaligus
  }

  async postAlbumCoverImageHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;

    await this._albumsService.verifyAlbumExist(id);
    this._validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._service.writeFile(cover, cover.hapi);

    const fileLocation = `http://${config.app.host}:${config.app.port}/albums/${id}/${filename}`;

    await this._albumsService.addAlbumCoverById(id, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = CoversHandler;
