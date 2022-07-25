const Pattern = require('../models/pattern');

module.exports = {
   new: newPattern,
   create,
   index,
   show
};

function newPattern(req, res) {
   const newPattern = new Pattern();
   res.render('patterns/new', { title: 'Add Pattern' });
}

function create(req, res) {
   const pattern = new Pattern(req.body)
   pattern.save(function(err) {
      if (err) return res.redirect('./patterns/new');
      res.redirect(`/patterns/${pattern._id}` );
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