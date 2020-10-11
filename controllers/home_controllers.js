const Post=require('../models/post');
const User=require('../models/user');

module.exports.home = (req,res)=>{
    // if(req.isAuthenticated()){
    //     Post.find({user:req.user._id},(err,feedPost)=>{
    //         if(err){
    //             console.log("Error in fetching posts from db");
    //             return;
    //         }
    //        return res.render('home',{ 
    //            title:"Home",
    //            posts: feedPost
    //        });
    //    });
    // }
    // Post.find({},(err,feedPost)=>{
    //     if(err){
    //         console.log("Error in fetching posts from db");
    //         return;
    //     }
    //     return res.render('home',{ 
    //         title:"Home",
    //        posts: feedPost
    //    });
    // });
    // return res.render('home',{
    //     title:"Home",
    //     posts: 
    // });

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
    .exec((err,posts)=>{

        User.find({},(err,users)=>{
            return res.render('home',{
                title:"Home",
                posts: posts,
                all_users: users
            });
        });
    });
};

// module.exports.actionName = (request,response)=>{};
