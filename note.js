/*

so first of all 				todo:
rest has to do with the CRUD			learn how to use query string parameters
CRUD - create , read , update and delete;	read the doc for exress(app.)			

get for getting data 
post for posting data 
put for updating data 
delete for deleting data 

set and procedures to take 
run npm init --yes
run npm i express // to install express 

note 
req.params.id is used to read the parameters ... 
res.send is use to send a response to the user 
res.query is used to read query parameters 
res.status(404) is to respond error 
 const course = courses.find( c => c.id ===parseInt(req.params.id));//to find a particular course from the array 
    if(!course) res.status(404).send('the course with the given id was not found ');
 */



// so remember to read and video on  middleware 
// this was used to post ... when u are not using db
// read on JWT
// learn to use middleware( third party middleware);

app.post("/api/courses", (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
//input validation 
// you will first of all run npm i joi
// then u define a schema (to define the shape of our object(like email and string))
const schema = {
    name: Joi.string().min(3).required()
};

const result = Joi.validate(req.body, schema);
// check the value of result prop
const result = Joi.validate(req.body, schema)
if (result.error) {
    res.status(400).send(result.error.details[0].message)
}
// app.put is used to update 


// look up the course 
// if not existing, return 404
app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)); //to find a particular course from the array 
    if (!course) res.status(404).send('the course with the given id was not found ');
});

// validate 
// if invalid, return 400-Bad request
const schema = {
    name: Joi.string().min(3).required()
};

const result = Joi.validate(req.body, schema) // this is the one that u should remember 

if (result.error) {
    res.status(400).send(result.error.details[0].message)
}

// update 
course.name = req.body.name;
res.send(course);


//so in the process of refactoring we made the validation to be a function 
// and then we did it by creating the validation function 
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema) // this is the one that u should remember 

}

// now let us do  middleware
// a middleware is a function that takes a request objest .. so it either returns the answer or pass it to another middleware funvtion   
// 
app.use(express.json()); //pass the body into a Json() structure 
// to create  a middleware 
app.use(function(req, res, next) {
    console.log('logging..')
    next();
});

/* to template all you will have to do is just app.set('view engine', 'pub') 
then u use res.render in place of res.send 
*/
// structuring the application 
/* 
so to begin .. you are going to create a folder named routes .. then you 
are going to put all the routes that are working with courses in courses.js 
 
then u export them .. after renaming every app to router ... then u change every router to '/'

then u go to the index js app ...import the router module then u 
app.use(/api/courses',courses*/