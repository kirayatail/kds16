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
    enum: ['pending', 'accepted', 'rejected', 'confirmed', 'declined']
  }
});

module.exports = mongoose.model('Talks', TalkSchema);
