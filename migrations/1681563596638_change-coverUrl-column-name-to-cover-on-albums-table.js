/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.renameColumn('albums', 'coverUrl', 'cover');
};
