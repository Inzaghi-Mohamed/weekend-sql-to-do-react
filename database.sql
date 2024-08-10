CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "priority" INTEGER DEFAULT 1
   
);
INSERT INTO tasks (title, description, priority)
VALUES ('Finish project report', 'Complete the quarterly project report', 4);

SELECT * FROM "tasks";

INSERT INTO tasks (title, description, priority)
VALUES 
('Call mom', 'Weekly check-in call',  1),
('Pay electricity bill', 'Due on the 10th', 2),
('Schedule dentist appointment', NULL, 1);
INSERT INTO tasks (title, description, priority)
VALUES ('Finish project report', 'Complete the quarterly project report', 3);