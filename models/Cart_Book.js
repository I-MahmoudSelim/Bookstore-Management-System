const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const CartBook = sequelize.define("cartBook", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

module.exports = CartBook;