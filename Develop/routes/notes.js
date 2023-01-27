const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    console.log(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
    console.log(`${req.method} request received for notes`);
    const {title, text} = req.body;

    if (title && text) {
        const newPost = {
            title,
            text,
            id: uuid()
        };

        readAndAppend(newPost, './db/db.json');


        const response = {
            status: "success",
            body: newPost
        };

        res.json(response);
    
    } else {
        res.json('Error in posting note')
    };
});


module.exports = notes;