const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile, writeToFile} = require('../helpers/fsUtils');

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

notes.delete('/:id', (req, res, next) => {
    const deleteID = req.params.id;
    readFromFile('./db/db.json').then((data) => {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            console.log('storednotes', data[i].id)
            if (data[i].id === deleteID) {
                data.splice(i, 1);
                writeToFile('./db/db.json', data);
            res.json('Item deleted');
            };
        };
    }
    );
});

module.exports = notes;