const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/category',require('./routes/category.route'))
app.use('/api/teacher',require('./routes/teacher.route'))
app.use('/api/course',require('./routes/course.route'))

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

const PORT = 3000;
app.listen(PORT,function(){
    console.log("Start server!!!")
})

