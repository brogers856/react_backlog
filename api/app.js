const axios = require('axios')
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const logger = require('morgan');
const cors = require("cors");
require('dotenv').config();
const passport = require('passport');
const localPassport = require('passport-local');
const User = require('./models/user')
const MongoDBStore = require("connect-mongo")(session);
const ExpressError = require('./utils/ExpressError')

const dbUrl = process.env.DB_URL
const secret = process.env.SECRET || 'thisshouldbeabettersecret!'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo connection opened');
  })
  .catch(err => {
    console.log('Mongo connection error');
    console.log(err);
  });


const store = new MongoDBStore({
  url: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60
});

const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
}

const usersRouter = require('./routes/users');
const backlogRouter = require('./routes/backlogs');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localPassport(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).send(err.message)
})

module.exports = app;
