    const User = require('../models/user_model');

    async function handleUser(req,res) {
        const {email,contacts} = req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(404).json({ message: 'User not found' });
         
        if (user.contacts.includes(email)) {
            return res.status(400).json({ message: 'Contact already added' });
        }

        user.contacts.push(email);
        await user.save();

        await User.create({
            email: email.trim(),
            contacts: contacts
        });
        return res.json({status:'success'})
    }

    module.exports = {
        handleUser,
    }