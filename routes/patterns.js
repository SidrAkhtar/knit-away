var express = require('express');
var router = express.Router();
const patternsCtrl = require('../controllers/patterns')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.get('/', patternsCtrl.index);
// GET /patterns/new
router.get('/new', patternsCtrl.new);

module.exports = router;
