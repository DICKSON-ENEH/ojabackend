const orderModel = require("../models/foodmodel")
const userModel = require("../models/usermodel")

const mongoose = require("mongoose")

const getallorders = async(req, res)=>{
    try {
        const general = await userModel.findById(req.params.userId)
        if(general.isAdmin){
            const food = await userModel.find().populate("orders")
            res.status(200).json({
                message:"all orders",
                data:food
            })
        }
        
    
    } catch (error) {
        console.log(error)
    }
}

const getoneuserorders = async(req, res)=>{
    try {
        const user = await userModel.findById(req.params.userId).populate("orders")
        res.status(200).json({
            message:"all orders",
            data:user
        })
    } catch (error) {
        console.log(error)
    }
}
const editoneuserorders = async(req, res)=>{
    try {
        const orderId = req.params.orderId
        const user = await orderModel.findByIdAndUpdate(orderId, req.body, {new:true})
        res.status(201).json({
            message:"all order",
            data:user
        })
    } catch (error) {
        console.log(error)
    }
}

const creatoneuserorder = async(req, res)=>{
    try {
        const {title, description, quantity, price, balance}= req.body
        const users = await userModel.findById(req.params.userId)

        
            const ordering =await new orderModel({
                title, description, quantity, price, balance,
                image:users.avatar,
                imageId:users.avatarId
            })


            ordering.user=users
            ordering.save()
            users.orders.push(mongoose.Types.ObjectId(ordering._id))
            users.save()
        
        res.status(201).json({
            message:"all orders",
            data:users
        })
    } catch (error) {
        console.log(error)
    }
}
const deletePost = async (req, res) => {
	try {
		const user = await userModel.findById(req.params.userId);
		const oder = await orderModel.findByIdAndRemove(req.params.orderId); 

		user.orders.pull(oder);
		user.save();

		res.status(201).json({ message: "post deleted" });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
module.exports={
    getallorders,
    getoneuserorders,
    editoneuserorders,
    deletePost,
    creatoneuserorder
}