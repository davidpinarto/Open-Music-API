const LikesAlbumHandler = require('./handler');
const likesAlbumRoutes = require('./routes');

module.exports = {
  name: 'likes-album',
  version: '1.0.0',
  register: async (server, { service, albumsService }) => {
    const likesAlbumHandler = new LikesAlbumHandler(service, albumsService);
    server.route(likesAlbumRoutes(likesAlbumHandler));
  },
};
