const mongoose = require('mongoose')
const mongoURI =  "mongodb+srv://shahid:shahid@cluster0.zbodk.mongodb.net/fivesdigital?retryWrites=true&w=majority"

const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose successffully")
    })
}
module.exports = connectToMongo