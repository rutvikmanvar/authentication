const mongoose = require('mongoose')

const uaerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    contacts: [{
        type: String, 
    }]
},{
    timestamps:true,
},
)

const User = mongoose.model('user',uaerSchema)
module.exports = User;