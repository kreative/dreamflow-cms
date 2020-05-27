const Sequelize = require("sequelize");
const DB = require("../../config/db");

const FAQ = DB.define('faq', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    answer: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    product: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    createdat: Sequelize.BIGINT
}, {
    timestamps: false
});

module.exports = FAQ;