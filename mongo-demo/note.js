const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser: true,
    })
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error('could not connect', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now,
    },
    isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

// const Course = mongoose.model('Course', 'courseSchema');

async function createCourse() {
    const course = new Course({
        name: 'node js course',
        author: 'Philemon',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log('save this doc on into your db...', result)
};
async function getCourses() {
    const courses = await Course.find()
    console.log(courses)
}


createCourse()