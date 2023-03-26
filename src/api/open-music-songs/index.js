const SongsHandler = require('./songs-handler');
const songsRoutes = require('./songs-routes');

module.exports = {
  name: 'open-music-songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songHandler = new SongsHandler(service, validator);
    server.route(songsRoutes(songHandler));
  },
};
