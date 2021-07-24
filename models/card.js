const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user',
  required: true,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: ownerSchema,
  likes: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', userSchema);
