const sequelize = require("../database/sequelize")
const Sequelize = require("sequelize")

const author = sequelize.define("author", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DOB: Sequelize.DATEONLY,
    DOD: Sequelize.DATEONLY,
}, {
    timestamps: false
})

module.exports = author;