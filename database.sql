-- Created a Task table
CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "due_date" DATE,
    "priority" INTEGER DEFAULT 1,
    "is_completed" BOOLEAN DEFAULT FALSE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserted some data
INSERT INTO tasks (title, description, due_date, priority, is_completed, created_at, updated_at)
VALUES ('Finish project report', 'Complete the quarterly project report', '2024-08-15', 3, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- I noticed that ( is_completed, created_at, updated_at) fields take the default data and no need to specify when inserting unless you want to override it!
INSERT INTO tasks (title, description, due_date, priority)
VALUES 
('Call mom', 'Weekly check-in call', '2024-08-05', 1),
('Pay electricity bill', 'Due on the 10th', '2024-08-10', 2),
('Schedule dentist appointment', NULL, '2024-08-20', 1);