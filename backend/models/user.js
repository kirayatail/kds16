var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {type: String, unique: true, required: true, dropDups: true},
  company: String,
  country: String,
  city: String,
  phone: String,
  foodreqs: String,
  firstname: String,
  lastname: String,
  attendingDinner: Boolean,
  newsletter: Boolean,
  requiresHotel: Boolean,
  canShareRoom: Boolean,
  canShareRoomWith: String,
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
  },
  verified: Boolean,
  admin: {type: Boolean, default: false}
});

module.exports = mongoose.model('Users', UserSchema);
