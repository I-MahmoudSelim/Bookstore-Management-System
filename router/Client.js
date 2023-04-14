const express = require("express")
const router = express.Router()
const Client = require("../controllers/Client")
const handler = require("../utils/asyncHandler")
const UserAuth = require("../middleware/UserAuth")


router.get("/logout", UserAuth, handler(Client.logOut))


router.get("", UserAuth, handler(Client.getProfile))

router.put("", UserAuth, handler(Client.editProfile))

router.delete("", UserAuth, handler(Client.deleteProfile))


router.post("/book/:isbn/cart", UserAuth, handler(Client.addBookToCart))

router.post("/book/:isbn/review", UserAuth, handler(Client.reviewBook))

router.get("/cart", UserAuth, handler(Client.viewCart))

router.delete("/cart/:id", UserAuth, handler(Client.deleteBookfromCart))

router.post("/cart/order", UserAuth, handler(Client.orderCart))

router.post("/request", UserAuth, handler(Client.requestBook))

module.exports = router;