const PlaylistHandler = require('./handler');
const playlistsRoutes = require('./routes');

module.exports = {
  name: 'open-music-playlists',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playlistHandler = new PlaylistHandler(service, validator);
    server.route(playlistsRoutes(playlistHandler));
  },
};
