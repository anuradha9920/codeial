const User = require('../models/user');
const Post=require('../models/post')

module.exports.profile = async(req,res)=>{
    try{
        let user = await User.findById(req.params.id)
        .populate({
            path:'posts',
            model: 'Post',
            populate:{
                path:'comments',
                model: 'Comment',
                populate:{
                    path:'user',
                    model: 'User'
                }
            }
        });
        return res.render('profile',{
            title: 'User Profile',
            profile_user: user
        });
    }catch(err){
        console.log("Error : ",err);
    }
};

module.exports.update = async (req,res)=>{
    try{
        if(req.user.id == req.params.id){
            let user = await User.findByIdAndUpdate(req.params.id,req.body);
            req.flash('success','Updated Successfully!');
            return res.redirect('back');
        }else{
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        console.log("ERROR : ",err);
    }
};

// Render the sign up page
module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    req.flash('success','Signed-up Successfully!');
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
module.exports.create = async (req,res)=>{
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        let user = await User.create(req.body);
        return res.redirect('/users/sign-in');
    }else{
        return res.redirect('back');
    }
};

//sign in and create session for the user
module.exports.createSession = (req,res)=>{
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
};

//to destroy session log out
module.exports.destroySession = (req,res)=>{
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/');
};





// module.exports.profile = (req,res)=>{
//     User.findById(req.params.id)
//     .populate({
//         path:'posts',
//         model: 'Post',
//         populate:{
//             path:'comments',
//             model: 'Comment',
//             populate:{
//                 path:'user',
//                 model: 'User'
//             }
//         }
//     })
//     .exec((err,user)=>{
//         return res.render('profile',{
//             title: 'User Profile',
//             profile_user: user
//         });
//     });
// };
// module.exports.update = (req,res)=>{
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id,req.body,(err,user)=>{
//             return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('Unauthorized');
//     }
// }
// // Render the sign up page
// module.exports.signUp = (req,res)=>{
//     if(req.isAuthenticated()){
//         return res.redirect('/users/profile');
//     }
//     return res.render('user_sign_up',{
//         title:"Codeial| Sign Up"
//     });
// };
// // Render the sign in page
// module.exports.signIn = (req,res)=>{
//     if(req.isAuthenticated()){
//         return res.redirect('/users/profile');
//     }
//     return res.render('user_sign_in',{
//         title:"Codeial| Sign In"
//     });
// };
// //post the sign up data
// module.exports.create = (req,res)=>{
//     if(req.body.password!=req.body.confirm_password){
//         return res.redirect('back');
//     }
//     User.findOne({email : req.body.email},(err,user)=>{
//         if(err){
//             console.log('error in finding user in signing up');
//             return;
//         }
//         if(!user){
//             User.create(req.body,(err,user)=>{
//                 if(err){
//                     console.log("err in creating user while signing up "); 
//                     return;
//                 }
//                 return res.redirect('/users/sign-in');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// };
// //sign in and create session for the user
// module.exports.createSession = (req,res)=>{
//     return res.redirect('/');
// };
// //to destroy session log out
// module.exports.destroySession = (req,res)=>{
//     req.logout();
//     return res.redirect('/');
// };