const express = require("express")
const router = express.Router()
const {upload} =  require("../utils/multer")
const {
    getallusers, 
    getoneusers,
    editoneusers,
    deleteoneusers,
    createoneusers,
    createoneadmin,
    siginUsers, 
    stockUser

}= require("../controller/userController")

router.route("/").get(getallusers)
router.route("/:id/getone").get(getoneusers).patch(upload, editoneusers).delete(deleteoneusers)

router.route("/createuser").post(upload, createoneusers)
router.route("/stockuser").post(stockUser)

router.route("/signin").post(siginUsers)
router.route("/createadmin").post(upload, createoneadmin)

module.exports = router
