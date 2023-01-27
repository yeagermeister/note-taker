const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
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