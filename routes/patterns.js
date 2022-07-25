var express = require('express');
var router = express.Router();
const patternsCtrl = require('../controllers/patterns');
const isLoggedIn = require('../config/auth');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// All routes "start with" /patterns (from server.js)
router.get('/', patternsCtrl.index);
// GET /patterns/new
router.get('/new', patternsCtrl.new);
router.get('/:id', patternsCtrl.show)
// POST /patterns (create functionality)
router.post('/', isLoggedIn, patternsCtrl.create)

module.exports = router;
