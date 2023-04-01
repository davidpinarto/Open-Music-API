const SongsHandler = require('./handler');
const songsRoutes = require('./routes');

module.exports = {
  name: 'open-music-songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songHandler = new SongsHandler(service, validator);
    server.route(songsRoutes(songHandler));
  },
};
