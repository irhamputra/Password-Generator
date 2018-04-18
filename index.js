const express = require('express');
const path = require('path');
const passwordGenerator = require('password-generator');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

// serve a static page
app.use(express.static(path.join(__dirname, 'client/build')));

// generate password
app.get('/api/passwords', (req, res) => {
    const count = 5;

    const passwords = Array.from(Array(count).keys()).map(i => passwordGenerator(12, false, /([\w])/g, 'RPD!*'));

    res.json(passwords);
    console.log(`Sent ${count} passwords`)
});

// match all path return to index.html
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
});

// app listen
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
});