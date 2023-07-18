const express = require("express")
const router = express.Router()
const imageController = require("../controller/image.controller")


// get confirmation gmail route ---------
router.route("/getting-image-base64-formate")
.get(imageController.getImage)

module.exports = router;