const Post=require('../models/post');
const User=require('../models/user');

module.exports.home = async (req,res)=>{
    //using asyn await
    try{
        let posts= await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        let users = await User.find({});
        return res.render('home',{
            title:"Home",
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log("Error : ",err);
        return;
    }
};
// module.exports.actionName = (request,response)=>{};






// module.exports.home =(req,res)=>{
//     // if(req.isAuthenticated()){
//     //     Post.find({user:req.user._id},(err,feedPost)=>{
//     //         if(err){
//     //             console.log("Error in fetching posts from db");
//     //             return;
//     //         }
//     //        return res.render('home',{ 
//     //            title:"Home",
//     //            posts: feedPost
//     //        });
//     //    });
//     // }
//     Post.find({},(err,feedPost)=>{
//         if(err){
//             console.log("Error in fetching posts from db");
//             return;
//         }
//         return res.render('home',{ 
//             title:"Home",
//            posts: feedPost
//        });
//     });
//     return res.render('home',{
//         title:"Home",
//     });
//     //populate the user of each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path: 'user'
//         }
//     })
//     .exec((err,posts)=>{
//         User.find({},(err,users)=>{
//             return res.render('home',{
//                 title:"Home",
//                 posts: posts,
//                 all_users: users
//             });
//         });
//     });  
// };
// // module.exports.actionName = (request,response)=>{};