const express = require('express');
// const Course = mongoose.model('Course', courseSchema);
const router = express.Router();
const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router(); // this was just changed from app to router 
// const courseSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//     }
// });
// const Course = mongoose.model('Course', courseSchema);


// router.get('/', async(req, res) => {
//     JSON.stringify(res.send(Course.find().sort("name")));
//     // res.render('index', { title: 'My Express App', message: 'Hello' }) // read the express doc to understand this very well //code red
// });

module.exports = router