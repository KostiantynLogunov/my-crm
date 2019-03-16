const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true
})
    .then(() => console.log('mongoDB connected!'))
    .catch(error =>console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
//localhosT:5000/api/auth/login
app.use('/api/auth', authRoutes);
//localhosT:5000/api/order
app.use('/api/order', orderRoutes);
//localhosT:5000/api/category
app.use('/api/category', categoryRoutes);
//localhosT:5000/api/position
app.use('/api/position', positionRoutes);
//localhosT:5000/api/analytics
app.use('/api/analytics', analyticsRoutes);

module.exports = app;
