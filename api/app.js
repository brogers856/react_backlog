const axios = require('axios')
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var logger = require('morgan');
var cors = require("cors");
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/backlogDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo connection opened');
    })
    .catch(err => {
        console.log('Mongo connection error');
        console.log(err);
    });

var usersRouter = require('./routes/users');
var backlogRouter = require('./routes/backlogs');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/backlogs', backlogRouter);

app.post('/search', async (req, res) => {
  const { query } = req.body
  let response = await axios.get('https://www.giantbomb.com/api/search/?api_key=' + process.env.GIANT_BOMB_API_KEY + "&query=" + query + "&resources=game&format=json&field_list=guid,name")
  res.send(response.data.results)
})


app.listen(9000, () => {
  console.log('Serving on port 9000')
})

module.exports = app;
