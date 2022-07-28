var express = require('express');
var router = express.Router();
const patternsCtrl = require('../controllers/patterns');
const isLoggedIn = require('../config/auth');

// All routes "start with" /patterns (from server.js)
router.get('/', patternsCtrl.index);
// GET /patterns/new
router.get('/new', isLoggedIn, patternsCtrl.new);
router.get('/:id', patternsCtrl.show)
// router.get('/mypatterns', isLoggedIn, patternsCtrl.myPatterns)
// POST /patterns (create functionality)
router.post('/', isLoggedIn, patternsCtrl.create)

module.exports = router;
