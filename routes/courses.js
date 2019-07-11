const express = require('express');
const router = express.Router(); // this was just changed from app to router 
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

router.get('/', (req, res) => {
    res.send(courses); // define new app by calling app.get
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema) // this is the one that u should remember 

}

router.post("/", (req, res) => {
    const { error } = validateCourse(req.body) // this is equivalent to getting result.error oh
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    };
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)); //to find a particular course from the array 
    if (!course)
        return res.status(404).send('the course with the given id was not found ');

    const { error } = validateCourse(req.body) // this is equivalent to getting result.error oh

    if (error)
        return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
    console.log(res.body)
});


router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('this id is not valid for any course');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

router.get("/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)); //to find a particular course from the array 
    if (!course) return res.status(404).send('the course with the given id was not found ');
    res.send(course);
});
module.exports = router;