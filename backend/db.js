const mongoose = require('mongoose')
const mongoURI =  ""

const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose successffully")
    })
}
module.exports = connectToMongo
