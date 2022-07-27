const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

// The starts with path is '/'

// POST /patterns/:id/comments
router.post('/patterns/:id/comments', commentsCtrl.create);
// router.get('/comments/:id/edit', commentsCtrl. edit);
// router.put('/comments/:id', commentsCtrl. update);
// DELETE /comments/:id
router.delete('/comments/:id', commentsCtrl.delete);

module.exports = router;