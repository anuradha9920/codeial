const express = require('express');
const cookieParser=require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');
var bodyParser = require('body-parser');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal= require('./config/passport-local-strategy');
const mongoose = require('./config/mongoose');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware= require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static('./assets'));
//extract style and scripts from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine
app.set('view engine',"ejs");
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'abcd',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db.connection,
            autoRemove: 'disabled'
        },
        (err)=>{
            console.log(err|| 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`ERROR in running the server: ${err}`);
        return;
    }
    console.log(`server is runnning on port : ${port}`);
});
