var mongoose = require('mongoose');
var Talk = mongoose.model('Talks');

module.exports = {
  Create: function(req, res) {
    if(!req.body || !req.body.title || !req.body.abstract) {
      return res.status(400).json({message: "Missing content"});
    }

    var talk = new Talk({
      duration: req.body.duration,
      language: req.body.language,
      title: req.body.title,
      abstract: req.body.abstract,
      status: 'pending',
      author: req.user._id
    });

    talk.save(function(err) {
      if(err) {
        console.err(err);
        return res.status(500).json({saved: false, message: "database issue", model: 'Talks'});
      }

      return res.json({saved: true, message:"Proposal saved"});
    })
  }
}
