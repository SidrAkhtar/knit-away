const Pattern = require('../models/pattern');

module.exports = {
   new: newPattern,
   create,
   index,
   show,
   myPatterns
};

function newPattern(req, res) {
   const newPattern = new Pattern();
   res.render('patterns/new', { title: 'Add Pattern' });
}

function create(req, res) {
   req.body.user = req.user._id;
   req.body.userName = req.user.name;
   req.body.userAvatar = req.user.avatar;
   Pattern.create(req.body, function(err) {
      if (err) return res.redirect('/patterns/new');
      res.redirect("/patterns");
   });
}

function index(req, res) {
   Pattern.find({}, function(err, patterns) {
      res.render('patterns/index', { title: 'All Patterns', patterns });
   });
 }

function show(req, res) {
   Pattern.findById(req.params.id, function(err, pattern) {
      res.render('patterns/show', { title: 'Pattern Detail', pattern })
   })
}



function myPatterns(req, res) {
   Pattern.find({user: req.user._id}, function(err, pattern) {
      // if (pattern.user.id(req.user._id)) return res.redirect('/myPatterns')
      res.render('patterns/myPatterns', { title: 'My Patterns', pattern });
   });
 }