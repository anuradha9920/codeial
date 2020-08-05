const expres = require('express');
const router = expres.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);

module.exports=router;