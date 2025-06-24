const Signup = require('../models/signup_model');

// Add Contact API
const addContact = async (req, res) => {
    const { userId, contactId } = req.body;

    try {
        // Find both users by their _id
        const user = await Signup.findById(userId);
        const contact = await Signup.findById(contactId);

        // If either user not found
        if (!user || !contact) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the contact already exists in user's contact list
        if (user.contacts.includes(contactId)) {
            return res.status(400).json({ message: 'Contact already added' });
        }

        // Add contact to user's contact list
        user.contacts.push(contactId);

        // Add user to contact's contact list
        contact.contacts.push(userId);

        // Save both users
        await user.save();
        await contact.save();

        return res.status(200).json({ message: 'Contact added successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get User Contact List
const getUserContacts = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find user by _id and populate the contacts array
        const user = await Signup.findById(userId).populate('contacts', 'name email');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the contact list
        res.status(200).json({ contacts: user.contacts });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports = { addContact, getUserContacts };
