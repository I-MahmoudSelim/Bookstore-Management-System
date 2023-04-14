const sequelize = require("../database/sequelize")
const Sequelize = require("sequelize")

const category = sequelize.define("category", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})

module.exports = category