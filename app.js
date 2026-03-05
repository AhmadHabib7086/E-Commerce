const express  = require('express');
const app = express();
const db = require('./config/mongoose-connection')
require('dotenv').config();

const cookieParser = require('cookie-parser');
const path  = require('path');

const  expressSession = require('express-session');
const flash = require('connect-flash');



const ownerRouter = require('./routes/ownerRouter');
const userRouter =require('./routes/userRouter');
const productRouter =require('./routes/productRouter');
const indexRouter =require('./routes/index');





app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));

app.use(expressSession({
    resave : false,
    saveUninitialized : true,

    secret: process.env.JWT_KEY, 
   //  process.env.EXPRESS_SESSION_SECRET,
}));




app.use(flash());

app.use(express.static(path.join(__dirname , 'public')));
app.set('view engine' , 'ejs');

app.use('/' ,indexRouter)
app.use('/owner', ownerRouter );
app.use('/user', userRouter );
app.use('/product', productRouter );

// app.get('/' , (req , res) =>{
//     res.send('hello world');
// });


app.listen(3000 ,() =>{
    console.log('server is running on port 3000')
})