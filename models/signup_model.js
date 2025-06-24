const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    contacts:
        [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'signup'
        }
    ]
},{
    timestamps:true,
}
)

const Signup = mongoose.model('signup',signupSchema)
module.exports = Signup;