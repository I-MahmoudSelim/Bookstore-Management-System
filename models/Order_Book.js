const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const OrderBook = sequelize.define("orderBook", {
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
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = OrderBook;