const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    name: String,
    role: String,
    profile: {
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String
    }
  }, { timestamps: true });

  userSchema.method('comparePassword', function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  });
  const User = mongoose.model('User', userSchema);
  module.exports = User;