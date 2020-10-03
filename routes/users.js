const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

//routing action for profile page controller named userController has function named profile which renders page for the profile
router.get('/profile',usersController.profile);

//router action for sign up page
router.get('/sign-up',usersController.signUp);

//router action for sign in page 
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

router.post('/create-session',usersController.createSession);

router.get('/sign-out',usersController.signOut);
//router action when user fills the form to get the 
module.exports=router;