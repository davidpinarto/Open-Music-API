/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class LikesAlbumService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addLikesAlbum(userId, albumId) {
    const id = `user-album-likes-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Menyukai album gagal');
    }

    // menghapus data pada cache
    await this._cacheService.delete(`numberOfLikesAlbum:${albumId}`);
  }

  async checkAlreadyLikeAlbum(userId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('Gagal menyukai album. Album sudah disukai');
    }
  }

  async deleteLikedAlbum(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 RETURNING id',
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Batal menyukai gagal. Id tidak ditemukan');
    }

    // menghapus data pada cache
    await this._cacheService.delete(`numberOfLikesAlbum:${albumId}`);
  }

  async getNumberOfLikesAlbum(albumId) {
    try {
      // mendapatkan catatan dari cache
      const result = await this._cacheService.get(`numberOfLikesAlbum:${albumId}`);

      const cacheResponse = {
        result: JSON.parse(result),
        cache: true,
      };

      return cacheResponse;
    } catch (error) {
      // bila gagal, diteruskan dengan mendapatkan catatan dari database
      const query = {
        text: 'SELECT user_id FROM user_album_likes WHERE album_id = $1',
        values: [albumId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Album tidak ditemukan');
      }

      // menyimpan data di cache
      await this._cacheService.set(`numberOfLikesAlbum:${albumId}`, JSON.stringify(result.rowCount));

      return result.rowCount;
    }
  }
}

module.exports = LikesAlbumService;
