const express = require('express');
const { registerUser, loginUser, users, userSearch, usersSelection } = require('../controller/userController');
const jwtVeify = require('../middleware/auth');
const { roles } = require('../middleware/roleauth');

const router = express.Router();




router.route('/').get(jwtVeify,(req,res)=>{
    res.send('Welcome User! Your Token Is Validates Successfully')
})
router.route('/admin').get(roles(["admin"]),(req,res)=>{
    res.json('You have the permission')
})

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/users').get(users)

router.route('/users/name/:name').get(userSearch)

router.route('/users/email/:email').get(userSearch)

router.route('/users/email').get(usersSelection)

module.exports = router