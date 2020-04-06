let express = require('express');
let router = express.Router();

let homeController = require('../controllers/homeController');
let adminController = require('../controllers/adminController');
let usuarioController = require('../controllers/usuarioController');

/* GET home page. */
router.get('/', homeController.index);

router.post('/contato', homeController.contato);

router.get('/newsletter', homeController.newsletter);

router.get('/admin', adminController.index);

router.get('/cadastro', usuarioController.index);

router.post('/cadastro', usuarioController.cadastrar);

router.get('/login', usuarioController.login);

router.post('/login', usuarioController.autenticar);

module.exports = router;
