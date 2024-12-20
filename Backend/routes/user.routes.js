const express = require('express');
const router = express.Router();
const {body}=require('express-validator');
const userController = require('../controllers/user.controller');
const authmiddleware = require('../middlewares/auth.middleware');
// similar to zod

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:4}).withMessage('First name should be atleast 4 characters'),
   
    body('password').isLength({min:5}).withMessage('Password should be atleast 5 characters')
],userController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:5}).withMessage('Password should be atleast 5 characters')
],userController.loginUser)

router.get('/profile',authmiddleware.authUser,userController.getProfileUser)

router.get('/logout',authmiddleware.authUser,userController.logoutUser)

module.exports = router;
