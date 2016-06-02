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
  },
  List: function(req, res) {
    var queries = [{"status": "approved"}];
    var uid = '';
    if(req.user) {
      queries.push({"author": req.user._id});
      uid = req.user._id;
    }
    Talk.find({"$or": queries}).populate('author').exec(function(err, talks){
      var result = {
        approved: talks.filter(o => o.status === "approved"),
        my: talks.filter(o => uid && o.author && o.author._id.toString() === uid.toString())
      };
      return res.json(result);
    });
  },
  Update: function(req,res) {
    var nt = req.body;

    if(nt._id !== req.params.tid) {
      return res.status(400).json({message: "Object identity missmatch"});
    }

    Talk.findOne({_id: nt._id}, function(err, talk) {
      if(err) {
        return res.status(500).send(err);
      }

      if(!talk) {
        return res.status(404).send();
      }

      if(!req.user.admin && (req.user._id !== talk.author)) {
        return res.status(403).json({message: "Not authorized to change this talk"});
      }

      // User only allowed to change status from approved to confirmed/cancelled
      if(!req.user.admin && nt.status !== talk.status && (talk.status !== 'approved' || (nt.status !== 'confirmed' && nt.status !== 'cancelled'))) {
        return res.status(403).json({message: "Not authorized to change status"});
      }

      delete nt.author;

      talk.update({$set: nt}, function(err, talk) {
        return res.json(talk);
      });
    })
  }
}
