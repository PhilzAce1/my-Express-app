const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello' }) // read the express doc to understand this very well //code red
});

module.exports = router