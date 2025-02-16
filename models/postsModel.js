const mongoose = require('mongoose')

const postModel = mongoose.Schema({
    title:{
        typeof:String,
        required:[true, "Title is required"],
        
    }
})