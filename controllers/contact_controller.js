const Signup = require('../models/signup_model');

// Add Contact API
const addContact = async (req, res) => {
    const { userId, email } = req.body;

    try {
        // Find the user by ID
        const user = await Signup.findById(userId);
        // Find the contact by email
        const contact = await Signup.findOne({ email });

        // If either user not found
        if (!user || !contact) {
            return res.status(404).json({ message: 'User or contact not found' });
        }

        // Prevent adding self
        if (user._id.equals(contact._id)) {
            return res.status(400).json({ message: "You can't add yourself as a contact" });
        }

        // Check if the contact already exists
        if (user.contacts.includes(contact._id.toString())) {
            return res.status(400).json({ message: 'Contact already added' });
        }

        // Add each other
        user.contacts.push(contact._id);
        contact.contacts.push(user._id);

        // Save both
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
