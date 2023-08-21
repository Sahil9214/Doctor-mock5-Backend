const mongoose=require("mongoose");
require('dotenv').config()
const connection=mongoose.connect("mongodb+srv://utkarshsinghal369:utkarshsinghal369@cluster0.uxy6fet.mongodb.net/mock5?retryWrites=true&w=majority");
module.exports={connection}