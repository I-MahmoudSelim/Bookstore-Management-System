const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const MyError = require("../utils/MyError");
const SECRET = process.env.SECRET;

module.exports = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const { pk } = jwt.verify(token, SECRET)
        const client = await Client.findByPk(pk, { attributes: { exclude: ["password"] } })
        if (!client) {
            throw new MyError(401, "You must log in first,1")
        }
        if (client.blocked) {
            throw new MyError(403, "You are forbidden as you are blocked")
        }
        if (!client.active) {
            throw new MyError(403, "You have not activated your account, yet")
        }
        req.client = client
        next()
    } catch (error) {
        res.status(401).send("You must log in first,2")
    }
}