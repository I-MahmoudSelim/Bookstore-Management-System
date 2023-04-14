const express = require("express")
const app = express()

const sequelize = require("./database/sequelize")
require("./database/relations");

const adminRouter = require("./router/Admin");
const clientRouter = require("./router/Client");
const anonymRouter = require("./router/anonym");
const errorHandler = require("./utils/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/admin", adminRouter);
app.use(["/me", ""], anonymRouter);
app.use("/me", clientRouter);
app.use(errorHandler);

// require("./database/seeding");
(async function () {
    await sequelize.sync();
})()


module.exports = app;