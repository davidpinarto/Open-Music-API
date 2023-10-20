const PlaylistHandler = require('./handler');
const playlistsRoutes = require('./routes');

module.exports = {
  name: 'open-music-playlists',
  version: '1.0.0',
  register: async (server, {
    playlistsService, songsService, usersService, validator,
  }) => {
    const playlistHandler = new PlaylistHandler(
      playlistsService,
      songsService,
      usersService,
      validator,
    );
    server.route(playlistsRoutes(playlistHandler));
  },
};
