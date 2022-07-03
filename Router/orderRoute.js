const express = require("express")
const router = express.Router()
const {    getallorders,
    getoneuserorders,
    editoneuserorders,
    deletePost,

    creatoneuserorder}= require("../controller/orderController")

    const {images} = require("../utils/multer")

    const authUser = require("../utils/authorize")

router.route("/:userId/createorder").post( authUser,images, creatoneuserorder)
router.route("/allorders").get(authUser,getallorders)
router.route("/:userId/oneorder").get(authUser,getoneuserorders)
router.route("/:id/editoneorder/:orderId").patch(authUser,editoneuserorders).delete(authUser,deletePost)

    module.exports = router  