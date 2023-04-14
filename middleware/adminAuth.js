const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const MyError = require("../utils/MyError");
const SECRET = process.env.SECRET;

module.exports = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const { pk, isAdmin } = jwt.verify(token, SECRET)
        if (!isAdmin) {
            throw new MyError(403, "You are not authorized")
        }
        const admin = await Admin.findByPk(pk)
        if (!admin) {
            throw new MyError(403, "You are not authorized")
        }
        req.admin = admin
        next()
    } catch (error) {
        res.status(403).send("You are not authorized")
    }
}