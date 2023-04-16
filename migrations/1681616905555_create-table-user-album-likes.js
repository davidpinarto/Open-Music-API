/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  /*
      Menambahkan constraint UNIQUE, kombinasi dari kolom user_id dan album_id.
      Guna menghindari duplikasi data antara nilai keduanya.
    */
  pgm.addConstraint('user_album_likes', 'unique_user_id_and_album_id', 'UNIQUE(user_id, album_id)');

  // memberikan constraint foreign key pada kolom user_id dan album_id
  // terhadap users.id dan albums.id
  pgm.addConstraint('user_album_likes', 'fk_user_album_likes.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('user_album_likes', 'fk_user_album_likes.album_id_albums.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
};
