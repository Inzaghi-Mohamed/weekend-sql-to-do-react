# Full-Stack Todo-APP


# Description:

 This is Fullstack Todo-App that helped me underatand how to connect the front-end and back-end. Additionally, I used the Http methods such as GET, POST, DELETE, and PUT as in RESTful API method.

# Technologies:

*  React
*  Node.js
*  Postgres
*  Express


# How I approached the Task
# Step 1:

* I set-up my database and created a database.sql file to hold my SQL table codebase.
* Check the name of the database on pool.js file
* On Postico, I pasted the already prepared SQL table in my database.sql file.
* Created the table and inserted some hardcoded data.

# Step 2:

* Set-up my server.js file by defining the route. In this case, I choose '/api/todo' as my route.
* Check router file i.e todo.router.js file. Here i wanted to make sure I was connected to the database. Therefore, i had to export pool.js file and import into this file.
* Wrote my GET req to test it whether I fetch data from the Database. I used Postman to carried out that test.

# Step 3:

* Once the GET req was succesful, I wrote my GET req on client-side (App.jsx file) to fetch data and display them on the DOM.
* Eventually, I wrote my codebase for both App.jsx file and todo.router.js file. Of course, using Postman to test each http method.

