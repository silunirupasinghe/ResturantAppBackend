const mongoose= require("mongoose");
const Schema=mongoose.Schema

const resturantSchema= new Schema({
    resturantName:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    telephoneNo:{
        type:String,
        required:true
    },
})
const Resturant= mongoose.model("resturant",resturantSchema )
module.exports=Resturant;