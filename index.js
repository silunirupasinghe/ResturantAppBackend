const express=require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
require("dotenv").config();

const app=express();
const PORT= process.env.PORT || 8070;
dotenv.config();
app.use(cors());
app.use(express.json());
const ResturantRoute=require("./routes/resturant.route.js")

//database connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));


app.use("/resturant", ResturantRoute)



app.listen(8000, () => console.log("Server is listening on port 8000."));
