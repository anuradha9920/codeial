const express = require('express');
const app = express();
const port = 8000;


app.listen(port,(err)=>{
    if(err){
        console.log(`ERROR in running the server: ${err}`);
        return;
    }
    console.log(`server is runnning on port : ${port}`);
});
