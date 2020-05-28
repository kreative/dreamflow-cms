const Sequelize = require("sequelize");
const DB = require("../../config/db");

const Post = DB.define('post', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    subtitle: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    cover_image: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    publishing_date: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true
    },
    author: {
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
            model: "author",
            key: "id"
        }
    },
    createdat: Sequelize.BIGINT
}, {
    timestamps: false
});

module.exports = Post;