const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')
const { result } = require('lodash');
const { render } = require('ejs');
//express app
const app = express();
//register view engine
app.set('view engine','ejs');
// connect to mongoDB

const dbURI = "mongodb+srv://zeelu1111:Samosa_1788@cluster0.fzss1xz.mongodb.net/Blog"
//listen for requests
mongoose.connect(dbURI , {useNewUrlParser: true , useUnifiedTopology: true}).then((result) => {app.listen(3000);}).catch((err) => {
    console.log(err);
});


app.use(morgan('dev'));
app.use((req,res,next) => {
    console.log('new reuest made');
    console.log('host' ,req.hostname);
    console.log('path: ',req.path);
    console.log('method: ',req.method);
    next();
});

// mongoose and mongo sandbox routes


app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.get('/' , (req,res) => {
    res.redirect('/blogs');
});


app.use('/blogs' , blogRoutes)

app.get('/about',(req,res) =>{
    res.render('about' , {title: 'Home'});
});



app.get('*',(req,res) =>{
    res.render('pnf' ,  {title: 'Home'});
});

