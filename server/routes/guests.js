const express = require('express');
const router  = express.Router();
const Guest   = require('../models/Guest');

router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: 1 });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch guests', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const guest = new Guest({ name, email });
    const saved = await guest.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add guest', error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const allowedFields = ['name', 'email', 'confirmed', 'rsvp'];
    const updates = {};
    allowedFields.forEach((f) => {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    });

    const updated = await Guest.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Guest not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update guest', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Guest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Guest not found' });
    res.json({ message: 'Guest deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete guest', error: err.message });
  }
});

module.exports = router;