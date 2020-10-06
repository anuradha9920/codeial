const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

//routing action for profile page controller named userController has function named profile which renders page for the profile
router.get('/profile',passport.checkAuthentication,usersController.profile);

//router action for sign up page
router.get('/sign-up',usersController.signUp);

//router action for sign in page 
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

//use passport as a middleware to authenticae it
router.post('/create-session',
    passport.authenticate(
        'local',
        {
            failureRedirect: '/users/sign-in'
        }
    ),
    usersController.createSession
);
//sign out page

router.get('/sign-out',usersController.destroySession);

//router action when user fills the form to get the 
module.exports = router;