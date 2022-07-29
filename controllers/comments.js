const Pattern = require('../models/pattern');

module.exports = {
  create,
}

function create(req, res) {
  // Find the pattern to embed the comment within
  Pattern.findById(req.params.id, function(err, pattern) {
    // Add the user-centric info to req.body (the new comment)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Push the subdoc for the comment
    pattern.comments.push(req.body);
    // Always save the top-level document (not subdocs)
    pattern.save(function(err) {
    console.log(err)
      res.redirect(`/patterns/${pattern._id}`);
    });
  });
 }