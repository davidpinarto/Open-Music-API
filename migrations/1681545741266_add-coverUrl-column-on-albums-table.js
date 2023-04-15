/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumns('albums', {
    coverUrl: {
      type: 'TEXT',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('albums', 'coverUrl');
};
