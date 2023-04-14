const sequelize = require("../database/sequelize")
const Sequelize = require("sequelize")

const Review = sequelize.define("review", {
    // id: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     allowNull: false,
    //     primaryKey: true
    // },
    rating: {
        type: Sequelize.DOUBLE,
        validate: {
            min: 0,
            max: 5
        },
        allowNull: false
    },
    comment: Sequelize.STRING,
})
module.exports = Review