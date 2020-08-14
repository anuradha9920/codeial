module.exports.profile = (req,res)=>{
    return res.render('profile.ejs',{
        title:"Anuradha"
    });
};



// Render the sign in page
module.exports.signUp = (req,res)=>{
    return res.render('user_sign_up',{
        title:"Codeial| Sign Up"
    });
};


// Render the sign in page
module.exports.signIn = (req,res)=>{
    return res.render('user_sign_in',{
        title:"Codeial| Sign In"
    });
};