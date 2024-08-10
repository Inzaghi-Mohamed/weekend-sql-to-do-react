CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(50) DEFAULT 'Pending'
   
);
INSERT INTO tasks (title, description, status)
VALUES ('Finish project report', 'Complete the quarterly project report', 'Completed');

SELECT * FROM "tasks";


INSERT INTO tasks (title, description, status)
VALUES ('Finish project', 'Complete the project report', 'Pending');