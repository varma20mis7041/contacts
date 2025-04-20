const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/register', async (req, res) => {
    const { id, name, email, phone } = req.body;
    console.log(req.body);

    if (!id || !email || !name || !phone) {
        return res.status(400).json({ message: 'id, email, phone, and name are required' });
    }

    try {
        const existingUser = await Contact.findOne({ id });
        if (existingUser) {
            return res.status(400).json({ message: 'User ID already exists' });
        }

        const newUser = new Contact({ id, name, email, phone });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/update-contact', async (req, res) => {
    const { id, name, email, phone } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'ID is required to update a contact' });
    }

    try {
        const result = await Contact.updateOne({ id }, { name, email, phone });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'No contact found with the provided ID' });
        }
        res.json({ message: 'Contact updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete('/delete-contact/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Contact.deleteOne({ id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No contact found with the provided ID' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const contactDetails = await Contact.findOne({ id });
        if (!contactDetails) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contactDetails);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.get('/contacts', async (req, res) => {
    try {
        console.log("inside contact");
        const contactDetails = await Contact.find();
        console.log(contactDetails);
        res.json(contactDetails);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
