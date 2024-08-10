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
router.post('/',  (req, res) => {
    const { title, description, priority } = req.body;
   
    if (isNaN(priority)) {
        return res.status(400).send('Priority must be a number');
      }

    const queryText = `
                      INSERT INTO "tasks" 
                          ( "title", "description", "priority") 
                      VALUES
                          ($1, $2, $3);
                      `;
  // We use "$1, $2 and $3" for sanitation by Pg
  // To avoid client messing with the DB
  
  
   // We have PG fill in the SQl variables for us
   pool.query(queryText, [title, description, priority])
   .then(result => {
       console.log('db insert response successful:', result);
       res.sendStatus(201);
   })
   .catch(error => {
       console.log('db insert response failed', error);
       res.sendStatus(500);
   });
  
  });

// PUT

// DELETE

module.exports = router;
