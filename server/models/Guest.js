const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    rsvp: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Guest', guestSchema);
