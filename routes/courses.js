const mongoose = require("mongoose");
const { Course, validate } = require("../models/course");
const express = require("express");
const Joi = require("joi");
const router = express.Router(); // this was just changed from app to router

router.get("/", async(req, res) => {
    const courses = await Course.find().sort("name");
    res.send(courses); // JSON.stringify(res.send(Course.find().sort("name"))); // define new app by calling app.get
});
router.post("/", async(req, res) => {
    const { error } = validateCourse(req.body); // this is equivalent to getting result.error oh
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    let course = new Course({ name: req.body.name });
    course = await course.save();
    res.send(course);
});

router.put("/:id", async(req, res) => {
    const { error } = validateCourse(req.body); // this is equivalent to getting result.error oh
    if (error) return res.status(400).send(error.details[0].message);
    const course = await Course.findByIdAndUpdate(
        req.params.id, { name: req.body.name }, { new: true }
    );

    // const course = courses.find(c => c.id === parseInt(req.params.id)); //to find a particular course from the array
    if (!course)
        return res.status(404).send("the course with the given id was not found ");

    res.send(course);
    // console.log(res.body)
});

router.delete("/:id", async(req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    // const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("this id is not valid for any course");

    // const index = courses.indexOf(course);
    // courses.splice(index, 1);

    res.send(course);
});

router.get("/:id", async(req, res) => {
    const course = Course.findById(req.param.id);
    // const course = courses.find(c => c.id === parseInt(req.params.id)); //to find a particular course from the array
    if (!course)
        return res.status(404).send("the course with the given id was not found ");
    res.send(course);
});
module.exports = router;