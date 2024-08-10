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
    const { title, description, status } = req.body;
   

    const queryText = `
                      INSERT INTO "tasks" 
                          ( "title", "description", "status") 
                      VALUES
                          ($1, $2, $3);
                      `;
  // We use "$1, $2 and $3" for sanitation by Pg
  // To avoid client messing with the DB
  
  
   // We have PG fill in the SQl variables for us
   pool.query(queryText, [title, description, status])
   .then(result => {
       console.log('db insert response successful:', result);
       res.sendStatus(201);
   })
   .catch(error => {
       console.log('db insert response failed', error);
       res.sendStatus(500);
   });
  
  });

// DELETE

router.delete('/:id', (req, res) => {
    const taskId = req.params.id; // Extract the task ID from the URL parameters
  
    const queryText = 'DELETE FROM "tasks" WHERE "id" = $1;'; // SQL query to delete the task
  
    pool.query(queryText, [taskId])
      .then((result) => {
        if (result.rowCount === 0) {
          // If no rows were affected, the task was not found
          return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
      })
      .catch((error) => {
        console.error(`Error executing query: ${queryText}`, error);
        res.sendStatus(500); // Send a 500 status code for server errors
      });
  });

  // PUT 

  router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body; // Expecting the status to be 'completed'
    const queryText = `
      UPDATE "tasks" 
      SET "status" = $1 
      WHERE "id" = $2;
    `;
    
    pool.query(queryText, [status, taskId])
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task marked as completed' });
      })
      .catch((error) => {
        console.error(`Error executing query: ${queryText}`, error);
        res.sendStatus(500);
      });
  });
  

module.exports = router;
