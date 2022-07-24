const Pattern = require('../models/pattern');

module.exports = {
   new: newPattern,
   index
};

function newPattern(req, res) {
   res.render('patterns/new', { title: 'Add Pattern' });
}

function index(req, res) {
   res.render('patterns/index', { title: 'All Patterns', patterns });
 }