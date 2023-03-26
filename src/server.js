// mengimport dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/open-music-albums');
const AlbumsService = require('./services/postgres/OpenMusicAlbumsService/AlbumsService');
const AlbumsValidator = require('./validator/open-music-albums');

const songs = require('./api/open-music-songs');
const SongsService = require('./services/postgres/OpenMusicSongsService/SongsService');
const SongsValidator = require('./validator/open-music-songs');
const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
