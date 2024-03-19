const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const randomstring = require('randomstring')

const loadLogin = async (req,res) =>{
    try {
        res.render('adminLogin');
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async (req,res)=>{
    try {
        
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email});
        if(userData) {

            const passwordMatch = await bcrypt.compare(password,userData.password);

            if (passwordMatch) {
                
                if(userData.is_admin === 0){
                    res.render('adminLogin',{incorrect:"Email or password is incorrect"})  
                }else{
                    req.session.user_id = userData._id;
                    res.redirect("/admin/home")
                }

            } else {
                res.render('adminLogin',{incorrect:"Email or password is incorrect"})

            }

        }else{
            res.render('adminLogin',{incorrect:"Email or password is incorrect"})
        }

    } catch (error) {
        console.log(error.message);
    }
}

const loadDashboard = async(req,res)=>{
    try {
        
        res.render('home');

    } catch (error) {
        console.log(error.message);
    }
}

const logout = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/admin');
    } catch (error) {
        console.log(error.message);
    }
}

const adminView = async(req,res)=>{
    try {

        const usersData = await User.find({is_admin:0})
        res.render('adminView', {users:usersData});
        
    } catch (error) {
        console.log(error.message);
    }
}

//* Add New Work Start

const newUserLoad = async(req, res)=>{
    try {
        res.render('new-user')
    } catch (error) {
        console.log(error.message);
    }
}

//*Edit Users
const editUserLoad = async(req,res) =>{
    try {
        
        const id = req.query.id;
        const userData = await User.findById({ _id:id });
        if(userData){
            res.render('edit-user', {user:userData});
        }
        else{
            res.redirect('/admin/adminView')
        }
        res.render('edit-user');


    } catch (error) {
        console.log(error.message);
    }
}


//* Update User
const updateUsers = async(req,res) =>{
    try {

        const userData = await User.findByIdAndUpdate({ _id: req.body.id}, { $set: { FirstName:req.body.FirstName, LastName:req.body.LastName, email:req.body.email, is_verified:req.body.verify }});
        res.redirect('/admin/adminView');
        
    } catch (error) {
        console.log(error.message);
    }
}

//* Delete User
const deleteUser = async(req,res) => {
    try {

        const id = req.query.id;
        await User.deleteOne({ _id:id });
        res.redirect('/admin/adminView');
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    adminView,
    newUserLoad,
    editUserLoad,
    updateUsers,
    deleteUser,
    logout
} 