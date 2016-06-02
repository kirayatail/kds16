var mongoose = require('mongoose');
var Schema  =mongoose.Schema;

var TalkSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'Users'},
  language: String,
  duration: String,
  title: String,
  abstract: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'confirmed', 'cancelled']
  }
});

module.exports = mongoose.model('Talks', TalkSchema);
