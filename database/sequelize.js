const Sequelize = require("sequelize")
const sequelize = new Sequelize("library_mangement_dev", "root", "MySQL@2023", { dialect: "mysql", host: "localhost" })
module.exports = sequelize;