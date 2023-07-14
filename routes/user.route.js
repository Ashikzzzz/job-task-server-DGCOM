const express = require("express")
const router = express.Router()
const userController = require("../controller/user.controller")

// signup route --------------------
router.route("/create-user")
.post(userController.createAuser)

// login router---------------------
router.route("/log-in")
.post(userController.loginAuser)


module.exports = router;