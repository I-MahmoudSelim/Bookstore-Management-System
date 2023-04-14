const sequelize = require("../database/sequelize")
const Sequelize = require("sequelize")

const Request = sequelize.define("request", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ISBN: {
        type: Sequelize.STRING,
        allowNull: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: true,
    }
})

module.exports = Request