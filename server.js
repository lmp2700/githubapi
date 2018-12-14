const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = 9000;
const githubcontroller = require('./controller/githubcontroller')

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/githubapi', githubcontroller)

app.listen(port, () => {
    console.log('listening on port 9000');
});