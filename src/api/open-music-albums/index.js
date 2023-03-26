const AlbumsHandler = require('./albums-handler');
const albumsRoutes = require('./albums-routes');

module.exports = {
  name: 'open-music-albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const albumHandler = new AlbumsHandler(service, validator);
    server.route(albumsRoutes(albumHandler));
  },
};
