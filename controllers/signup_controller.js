const Signup = require('../models/signup_model');

async function handleSignup(req,res) {
    const {name,email,password,confirmPassword} = req.body;
    if(!name.trim()){
        return res.json({error:'Name is required'})
    } else if(!email.trim()){
        return res.json({error:'Email is required'})
    } else if(!password.trim()){
        return res.json({error:'Password is required'})
    } else if(!confirmPassword.trim()){
        return res.json({error:'Confirm Password is requires'})
    } else if(password.trim() != confirmPassword.trim()){
        return res.json({error:'Password doesn\'t match'});
    }
    await Signup.create({
        name : name.trim(),
        email: email.trim(),
        password : password.trim(),
        confirmPassword : confirmPassword.trim()
    });
    return res.json({status:'success'})
}

module.exports = {
    handleSignup,
}