const sequelize = require("../database/sequelize");
const Sequelize = require("sequelize")
const bcrypt = require("bcryptjs")


const client = sequelize.define("client", {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(x) {
            const hash = bcrypt.hashSync(x, 8)
            this.setDataValue("password", hash)
        }
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }


})

client.display = function (client) {
    client.password = undefined
    return client;
}

module.exports = client;