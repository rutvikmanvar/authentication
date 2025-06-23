const Signup = require('../models/signup_model');

// Add Contact API
const addContact = async (req, res) => {
    const { userEmail, contactEmail } = req.body;

    try {
        // Find both users
        const user = await Signup.findOne({ email: userEmail });
        const contact = await Signup.findOne({ email: contactEmail });

        // If either user not found
        if (!user || !contact) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if contact already exists
        if (user.contacts.includes(contact._id)) {
            return res.status(400).json({ message: 'Contact already added' });
        }

        // Add each other as contacts
        user.contacts.push(contact._id);
        contact.contacts.push(user._id);

        // Save both users
        await user.save();
        await contact.save();

        res.status(200).json({ message: 'Contact added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get User Contact List
const getUserContacts = async (req, res) => {
    const { userEmail } = req.params;

    try {
        const user = await Signup.findOne({ email: userEmail }).populate('contacts', 'name email');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ contacts: user.contacts });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addContact, getUserContacts };
