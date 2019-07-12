const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/playground", {
        useNewUrlParser: true
    })
    .then(() => console.log("connected to MongoDB..."))
    .catch(err => console.error("could not connect", err));
//schema and validator
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
            // match:
    },
    category: {
        type: String,
        required: true,
        enum: ["web", "mobile", "network"],
        lowercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: "A course should have a reasonable tag na ... use ur brain "
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 10000,
        get: v => Math.round(v),
        set: v => Math.round(v) // this will be used to round up the values
    }
});

const Course = mongoose.model("Course", courseSchema);

//this is how you create DOC
async function createCourse() {
    const course = new Course({
        name: "node js course",
        author: "Jude the boss",
        tags: ["node", "backend"],
        price: 25,
        category: "web",
        isPublished: true
    });
    // console.log(result)
    try {
        const result = await course.save();
        console.log("save this doc on into your db...", result);
    } catch (ex) {
        for (field in ex.errors) console.log(ex.erroes[field].message);
    }
}
// this is how to build queries
async function getCourses() {
    // const courses = await Course
    // .find(({ author: 'Philemon' }))
    // .find({ price: { $gt: 10, $lte: 20 } })

    // .find()

    // .or([{author:"mosh"},{isPublished:true}])

    //regex :.find(author: /^Philemon/)=> for courses that author begins with philemon ... /ace$/=> courses that author ends with ace
    // /.*mosh.*/i => this is used to filter out any course whose author has mosh in his name
    //     .limit(10) // this is self ecplanatory na
    //         .sort({ name: 1 }) // "1" means in ascending other ... while "-1" means in desending
    //         .count()
    //         // .select({ name: 1, tags: 1 }); // we can select the properties that we want to return
    //     console.log(courses);
    // }
    // this was created for  pagination
    // async function getCourses() {
    //     const pageNumber = 2;
    //     const pageSize = 10;

    const courses = await Course.find({ author: " philemon", isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    // course.isPublished = false;
    // course.author = 'Akuagwu Philemon ';
    course.set({
        isPublished: false,
        author: "Akuagwu Philemon "
    });
    const result = await course.save();
    console.log(result);
}

// async function updateCourse(id) {
//     // const result = await Course.update({ _id: id }, { or
//     const course = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: "jason",
//             isPublished: false
//         },
//     }, { new: true }); //this is to choose the document that you want to update

//     console.log(course)
//         // course.set({
//         //     isPublished:true,
//         //     author:'Another Author'
// }
async function removeCourse(name) {
    const result = await Course.deleteMany({ author: name });
    console.log(result);
}
// removeCourse("philemon");

// getCourses()
// updateCourse('5d2495ee73021c28d04f37c1');
createCourse();
//comparism operators
/*eq (equal)
ne(not equal)
gt ( greater than)
gte ( greaterthan or equal to)
lt (less than )
lte(less than ot equal to )
in 
nin(not in )  
   */