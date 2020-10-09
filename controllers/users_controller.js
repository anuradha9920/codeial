const User = require('../models/user');
const Post=require('../models/post')

module.exports.profile = (req,res)=>{
    Post.find({user:req.user._id})
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec((err,feedPost)=>{
        if(err){
            console.log("Error in fetching posts from db");
            return;
        }
        return res.render('profile',{ 
           title:req.user.name,
           posts: feedPost
        });
    });
    // return res.render('profile',{
    //     title:"Anuradha"
    // });
};

// Render the sign up page
module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial| Sign Up"
    });
};

// Render the sign in page
module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial| Sign In"
    });
};

//post the sign up data
module.exports.create = (req,res)=>{
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},(err,user)=>{
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){
                    console.log("err in creating user while signing up "); 
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
};

//sign in and create session for the user
module.exports.createSession = (req,res)=>{
    return res.redirect('/');
};

//to destroy session log out
module.exports.destroySession = (req,res)=>{
    req.logout();
    return res.redirect('/');
};