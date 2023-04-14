const express = require("express")
const router = express.Router()
const Client = require("../controllers/Client")
const handler = require("../utils/asyncHandler")


router.post("/signup", handler(Client.signUp))
router.post("/login", handler(Client.logIn))

router.get("/books", handler(Client.getBooks))
router.get("/book/:isbn", handler(Client.getBook))

module.exports = router;