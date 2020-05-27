const Sequelize = require("sequelize");
const DB = require("../../config/db");

const FAQ = DB.define('faq', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    cover_image: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    createdat: Sequelize.BIGINT
}, {
    timestamps: false
});

module.exports = FAQ;