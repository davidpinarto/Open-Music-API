const CoversHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'covers',
  version: '1.0.0',
  register: async (server, { service, validator, albumsService }) => {
    const coversHandler = new CoversHandler(service, validator, albumsService);
    server.route(routes(coversHandler));
  },
};
