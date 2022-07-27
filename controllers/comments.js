const Pattern = require('../models/pattern');

module.exports = {
  create,
  edit,
  update,
  delete: deleteComment
}

async function deleteComment(req, res, next) {
  try {
    const pattern = await Pattern.findOne({'comments._id': req.param.id, 'comments.user': req.user._id});
    if (!pattern) throw new Error("YOU CAN'T DO THAT!!");
    // Remove the using the remove method on Mongoose arrays
    pattern.comments.remove(req.params.id);
    await pattern.save();
    res.redirect(`/patterns/${pattern._id}`);
  } catch (err) {
    return next(err);
    }
  }

function create(req, res) {
   // Find the pattern to embed the comment within
   Pattern.findById(req.params.id, function(err, pattern) {
     // Add the user-centric info to req.body (the new comment)
     req.body.user = req.user._id;
     req.body.userName = req.user.name;
     req.body.userAvatar = req.user.avatar;
    console.log(req.body)
     // Push the subdoc for the comment
     pattern.comments.push(req.body);
     // Always save the top-level document (not subdocs)
     pattern.save(function(err) {
      console.log(err)
       res.redirect(`/patterns/${pattern._id}`);
     });
   });
 }


function edit(req, res) {
  Pattern.findOne({'comments._id': req.params.id}, function(err, pattern) {
    const comment = pattern.comments.id(req.params.id);
    res.render('comments/edit', {comment});
  });
 }


 function update(req, res) {
  Pattern.findOne({'comments._id': req.params.id}, function(err, pattern) {
    const commentSubdoc = pattern.comments.id(req.params.id);
    if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/patterns/${pattern._id}`);
    commentSubdoc.text = req.body.text;
    pattern.save(function(err) {
      res.redirect(`/patterns/${pattern._id}`);
    });
  });
 }