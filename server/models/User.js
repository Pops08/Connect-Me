const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Feedback = require('./Feedback');
const Subject = require('./Subject');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!']
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  tutor: { 
    type: String, 
    required: false
    // default: false
  },
  bio: {
    type: String,
    required: false,
    // minlength: 3
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    required: false
  },
  timezone: {
    type: String,
    required: false
  },
  schedule: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    // required: true
  },
  orders: [Order.schema],
  feedback: [Feedback.schema],
  subject: [Subject.schema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;