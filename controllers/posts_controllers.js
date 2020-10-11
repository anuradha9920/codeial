const Post=require('../models/post')
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.create = (req,res)=>{
    User.findById(
        req.user._id,
        (err,user)=>{
            if(err){
                console.log("error in accessing user");
                return;
            }
            if(user){
                Post.create(
                    {
                    content:req.body.content,
                    user: req.user._id
                    },
                    (err,post)=>{
                        if(err){
                            console.log("error in creating post");
                            return;
                        }
                        user.posts.push(post);
                        user.save();
                        return res.redirect('back');
                    }
                );
            }
        }
    );
    // Post.create({
    //     content: req.body.content,
    //     user: req.user._id
    // },(err,post)=>{
    //     if(err){
    //         console.log("error in creating post");
    //         return;
    //     }
    //     return res.redirect('back');
    // });
};

module.exports.destroy = (req,res)=>{
    Post.findById(re.params.id)
    .populate('user')
    .exec((err,post)=>{
        if(post.user==req.user.id){
            let userId = post.user._id;
            post.remove();

            Comment.deleteMany(
                {
                    post: req.params.id
                },
                (err)=>{
                    return res.redirect('back');
                }
            );

            User.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        posts: req.params._id
                    }
                },
                (err,user)=>{
                    return res.redirect('back');
                }
            );
        }
    });
    // Post.findById(
    //     req.params.id,
    //     (err,post)=>{
    //         // .id means converting the object id into string
    //         if(post.user == req.user.id){
    //             post.remove();

    //             Comment.deleteMany(
    //                 {
    //                     post: req.params.id
    //                 },
    //                 (err)=>{
    //                     return res.redirect('back');
    //                 }
    //             );
    //         }
    //     }
    // );
};