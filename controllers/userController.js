const User = require('../models/userModel');
const bcrypt = require('bcrypt')

// SECURE PASSWORD
const securePassword = async(password) =>{
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message)
    }
}
const loadRegister = async(req,res) => {
    try{
        res.render('registration');
    }catch(error){
        console.log(error.message);
    }
}

const insertUser = async(req,res) =>{
    try {
        const spassword = await securePassword(req.body.password);
        const user = new User({
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            email:req.body.email,
            password:spassword,
            is_admin:0,
        });

        const userData = await user.save();

        if(userData){
            res.render('registration', {message: "Account has created Successfully"})
        }else{
            res.render('registration', {message: "Your registration has been failed"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Login user Methods started

const loginLoad = async(req,res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;


        const userData = await User.findOne({email:email})
        if(userData){
            
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                if (userData.is_verified === 0) {
                    res.render('login', {incorrect:"User is not allowed to access"})
                } else {
                    req.session.user_id = userData._id;
                    res.redirect('/home')
                }
            } else {
                res.render('login', {incorrect: " Incorrect Email or Password"})
            }
    
        }else{
            res.render('login', {incorrect: "Incorrect Email or Password"})
        }

    } catch (error) {
        console.log(error.message);
    }
}

const loadHome = async(req,res) =>{
    try {

        const userData = await User.findById({ _id:req.session.user_id});
        res.render('Dashboard', {user:userData})
    } catch (error) {
        console.log(error.message);
    }
}

const logout = async(req,res) =>{
    try {
        
        req.session.destroy();
        res.redirect('/login')

    } catch (error) {
        console.log(error.message)
    }
}

const editUserLoad = async(req,res) =>{
    try {
        const id = req.query.id;
        const userData = await User.findById({ _id:id });
        if (userData) {
            res.render('edit-User' , {user:userData});
        } else {
            res.redirect('/home')
        }
    } catch (error) {
        console.log(error.message);
    }
}


//* Update User
const UpdateUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate({ _id: req.body.id}, { $set: { FirstName:req.body.FirstName, LastName:req.body.LastName, email:req.body.email}});
        res.redirect('/home');
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    loadHome,
    verifyLogin,
    editUserLoad,
    UpdateUser,
    logout
}