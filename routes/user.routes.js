const router = require('express').Router();
const userModel = require('../models/user.models');
const userController = require('../controllers/user.controllers');

// Create user page
router.get('/register', (req, res) => {
    res.render('register1');
});

// Creating the user through post method
router.post('/register', userController.userRegister);


// Update user page
router.get('/update/:id', userController.authenticateJWT, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    res.render('edit', {user: user});
});


// updating the user through post method
router.post('/update/:id', userController.authenticateJWT, userController.updateUser);

// Login page
router.get('/login', async (req, res) => {
    // let user = await userModel.findOne({email: req.user.email});
    res.render('login1');
});

// logging in the user
router.post('/login', userController.userLogin);

// deleting the user
router.get('/delete/:id', userController.authenticateJWT, userController.deleteUser);


// profile page
router.get('/profile', userController.authenticateJWT, userController.userProfile);

// logging out the user
router.get('/logout', userController.userLogout);

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;