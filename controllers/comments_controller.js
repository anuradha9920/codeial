const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req,res)=>{
    Post.findById(req.body.post,(err,post)=>{
        if(err){
            console.log("error in accessing the post");
            return;
        }
        if(post){
            Comment.create({
                content : req.body.content,
                post: req.body.post,
                user: req.user._id
            },(err,comment)=>{
                if(err){
                    console.log("error in creating comment");
                    return;
                }

                //commet pushed in comments of the post
                //update
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            });
        }
    });
};

module.exports.destroy = (req,res)=>{
    Comment.findById(req.params.id)
    .populate('post')
    .exec((err,comment)=>{
        if((comment.user == req.user.id)||(comment.post.user == req.user.id)){
            let postId = comment.post._id;
            comment.remove();

            Post.findByIdAndUpdate(
                postId,
                {
                    $pull: {
                        comments: req.params._id
                    }
                },
                (err,post)=>{
                    return res.redirect('back');
                }
            );
        }else{
            return res.redirect('back');
        }
    });
}