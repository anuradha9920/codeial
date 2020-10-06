//importing mongoose package
const mongoose = require('mongoose');


//connecting mongoose databse
mongoose.connect('mongodb://localhost/codeial_development');


const db=mongoose.connection;
db.on('error',console.error.bind(console, "error connecting to db"));


db.once('open',()=>{
    console.log("db connect");
});
module.exports = mongoose;
