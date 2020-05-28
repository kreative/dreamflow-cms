const Sequelize = require("sequelize");
const DB = require("../../config/db");

const Author = DB.define('author', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    ksn: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    author_bio: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    createdat: Sequelize.BIGINT
}, {
    timestamps: false
});

module.exports = Author;