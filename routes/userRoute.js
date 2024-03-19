const express = require("express");
const user_route = express();
const session = require("express-session"); 
const config = require("../config/config");
const auth = require("../middleware/auth");

// Use session middleware
user_route.use(session({secret:config.sessionSecret, resave:false, saveUninitialized:false}));

user_route.set('view engine', 'ejs');
user_route.set('views', './views/users');

const bodyParser = require('body-parser');
user_route.use(bodyParser.urlencoded({ extended: true }));
user_route.use(bodyParser.json());

const userController = require("../controllers/userController");

user_route.get('/register', auth.isLogout,userController.loadRegister);

user_route.post('/register', userController.insertUser);

user_route.get('/', auth.isLogout,userController.loginLoad);

user_route.get('/logout', userController.logout);

user_route.get('/login',auth.isLogout, userController.loginLoad);

user_route.post('/login', userController.verifyLogin);

user_route.get('/edit-User', auth.isLogin, userController.editUserLoad);

user_route.post('/edit-User',userController.UpdateUser);

user_route.get('/home', auth.isLogin,userController.loadHome);

module.exports = user_route;