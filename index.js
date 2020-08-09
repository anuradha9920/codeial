const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts)

// use express router

app.use('/',require('./routes'));

//set u the view engine
app.set('view engine',"ejs");
app.set('views','./views');


app.listen(port,(err)=>{
    if(err){
        console.log(`ERROR in running the server: ${err}`);
        return;
    }
    console.log(`server is runnning on port : ${port}`);
});
