const Signup = require('../models/signup_model')

async function handleLogin(req,res) {
    const {email,password} = req.body;
    if(!email.trim()){
        return res.json({error:'Email is required'})
    } else if(!password.trim()){
        return res.json({error:'Password is required'})
    } 
    const user = await Signup.findOne({email,password})
    if(!user){
        return res.json({error:'Invalid Username or Password'})
    }
    return res.json(
        {
            status:'success',
            _id: user._id,
            name: user.name,
            email: user.email
        }
    )
}

module.exports = {
    handleLogin,
}