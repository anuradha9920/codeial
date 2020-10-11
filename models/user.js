const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]

},{
    timestamps:true
});


const User=mongoose.model('User',userSchema);

module.exports = User;