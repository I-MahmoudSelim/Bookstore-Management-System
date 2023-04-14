const admin = require("../controllers/Admin")
const handler = require("../utils/asyncHandler")
const express = require("express")
const router = new express.Router()
const Auth = require("../middleware/adminAuth")
const client = require("../controllers/Client")


router.post("/login", handler(admin.logIn))

router.post("/author", Auth, handler(admin.addAuthor))

router.patch("/author/:id", Auth, handler(admin.editAuthor))

router.delete("/author/:id", Auth, handler(admin.deleteAuthor))

router.get("/book", Auth, handler(client.getBooks))

router.get("/book/:isbn", Auth, handler(admin.detailsBook))

router.post("/book", Auth, handler(admin.createBook))

router.put("/book/:isbn", Auth, handler(admin.editBook))

router.delete("/book/:isbn", Auth, handler(admin.deleteBook))

router.delete("/book/:isbn/unfeature", Auth, handler(admin.hideBook))

router.post("/category", Auth, handler(admin.addCategory))

router.put("/category/:id", Auth, handler(admin.editCategory))

router.delete("/category/:id", Auth, handler(admin.deleteCategory))

router.delete("/client/:clientId", Auth, handler(admin.blockClient))

router.get("/client/:clientId", Auth, handler(admin.getClient))


module.exports = router