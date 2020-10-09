const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controllers');


console.log("router loaded");

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
// for any further routes, access from here
// router.user('/routerName',require('./routerfile'));

module.exports = router;
