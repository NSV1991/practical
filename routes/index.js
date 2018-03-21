var express = require('express');
var router = express.Router();
const todosController = require('../controllers/TodoControler');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Practical code for interview' });
});
 
router.get('/api/todos', function (req, res, next) {
  todosController.readDataFromJson(function (err, result) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(result)
    }
  });
});

module.exports = router;
