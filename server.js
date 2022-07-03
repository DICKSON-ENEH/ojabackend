require("dotenv").config();
const express = require("express")
const cors = require("cors")
const port = 5555
const app = express()
const mongoose = require("mongoose")
mongoose.connect(process.env.URL).then(()=>{
    app.listen(port, ()=>{
        console.log("connected", port)
    })
})

app.use(cors())
app.use(express.json())
app.use("/api/user", require("./Router/userRouter"))
app.use("/api/orders", require("./Router/orderRoute"))
 