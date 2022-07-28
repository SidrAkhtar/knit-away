var express = require('express');
var router = express.Router();
const patternsCtrl = require('../controllers/patterns');
const isLoggedIn = require('../config/auth');

// All routes "start with" /patterns (from server.js)
// POST /patterns (create functionality)
router.post('/', isLoggedIn, patternsCtrl.create)
router.get('/', patternsCtrl.index);
// GET /patterns/new
router.get('/new', isLoggedIn, patternsCtrl.new);
router.get('/:id', patternsCtrl.show);
router.get('/:id/edit', patternsCtrl.edit)
router.get('/guide', patternsCtrl.guide)
router.put('/:id', patternsCtrl.update)
router.delete('/:id', patternsCtrl.delete)


module.exports = router;
