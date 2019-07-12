const mongoose = require("mongoose");
const Joi = require("joi");
const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Course = mongoose.model("Course", courseSchema);

function validateCourse(course) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };

    return Joi.validate(course, schema); // this is the one that u should remember
}

exports.validate = validateCourse;
exports.Course = Course;