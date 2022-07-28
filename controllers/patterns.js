const Pattern = require('../models/pattern');

module.exports = {
   new: newPattern,
   create,
   index,
   show,
   edit,
   update,
   delete: deletePattern,
   guide
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

function edit(req, res) {
   Pattern.findOne({_id: req.params.id, user: req.user}, function(err, pattern) {
      // if (err || !pattern) return res.redirect('/patterns');
      res.render('patterns/edit', { title: 'Edit Pattern', pattern });
   });
}

function update(req, res) {
   Pattern.findOneAndUpdate(
      {_id: req.params.id, user: req.user}, req.body,
      {new: true},
      function(err, pattern) {
         if (err || !pattern) return res.redirect('/patterns');
         res.redirect(`/patterns/${pattern._id}`)
      }
   );
}

function deletePattern(req, res) {
   Pattern.findOneAndDelete(
      {_id: req.params.id, user: req.user}, function(err) {
         res.redirect('/patterns');
      }
   );
}

function guide(req, res) {
      res.render('patterns/guide', { title: "Beginner's Guide" })
   }