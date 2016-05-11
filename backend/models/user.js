var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  company: String,
  phone: String,
  foodreqs: String,
  firstname: String,
  lastname: String,
  attendingDinner: Boolean,
  newsletter: Boolean,
  roles: [String],
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  age: Number,
  invoice: String,
  signinToken: {
    type: String
  },
  signinTokenExpire: {
    type: Date
  }
});

module.exports = mongoose.model('Users', UserSchema);