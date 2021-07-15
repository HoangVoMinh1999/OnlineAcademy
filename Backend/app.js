require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');




const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json()); // creates express http server



const auth = require('./middlewares/auth.mdw')

app.use('/api/category',require('./routes/category.route'));
app.use('/api/user',require('./routes/user.route'));
app.use('/api/course',require('./routes/course.route'));
app.use('/api/lesson',require('./routes/lesson4course.route'));
app.use('/api/purchasedcourse',require('./routes/purchasedcourse.route'));
app.use('/api/comment',require('./routes/comment.route'))
app.use('/api/chatbot',require('./routes/chatbot.route'));

//handle error
app.use(function(req,res,next){
    res.status(404).json({
        'err_message':'Endpoint is not found !!!'
    })
})

app.use(function(error,req,res,next){
    console.log(error);
    res.status(500).json({
        'err_message':'Something broken !!!'
    })
})

const PORT = 4000;
app.listen(process.env.PORT || PORT,function(){
    console.log("Start server!!!")
})


