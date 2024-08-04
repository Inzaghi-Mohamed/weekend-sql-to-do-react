const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET

// Get all tasks
router.get('/', (req, res) => {
 
    // How does the router file req data from DB
    let queryText = 'SELECT * FROM "tasks";'; // line of SQL code ? language to talk to the DB?

    // Send that query to the DB (database)
    pool.query(queryText) // This line is asking the database for what we want!
        .then((result) => {
        
            // Always respond to the client
            res.send(result.rows); // This is what we send to the server to use, when the client request it
                                    
        })
        .catch((error) => {
            console.log(`Error making query: ${queryText}`, error);
            // Never leave the client waiting
            res.sendStatus(500); //
        });

});

// POST

// PUT

// DELETE

module.exports = router;
