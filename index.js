const config = require('config');
const debug = require('debug')('app:startup'); // you have to npm install first o 
// const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi'); // import joi
const { auth, log } = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home')
const express = require('express'); // to import express
const app = express(); // to init express

app.set('view engine', "pug"); //this is neccesary for rendering templates 
// app.set('view', './views')

// console.log(logger.auth)
app.get('env');
app.use(express.json()); // so that name: req.body.name can work
app.use(log);
app.use(auth);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
app.use(morgan('tiny'));

//configuration 


console.log('application name ' + config.get('name'));
console.log(' Mail Server' + config.get('mail.host'));
console.log(' Mail password' + config.get('mail.password'));
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan is enabled');
}
// dbDebugger('connected to the database')



const Port = process.env.PORT || 3000 // this is to set the port (run set PORT=8080)
app.listen(Port, () => console.log(`istening on port: ${Port}`)); // to make ur app listen to a particular port