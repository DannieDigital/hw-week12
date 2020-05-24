-- Seeds for SQL table.
USE employeeTracker_db;

-- Insert rows into department table
INSERT INTO department (name)
VALUES ("Human Resources"), 
       ("Information Technology"), 
       ("Marketing"),
       ("Customer Service"), 
       ("Senior Management"), 
       ("C-Suite"), 
       ("Operations");

SELECT * FROM department;

-- Insert rows into roles table 
INSERT INTO roles (title, salary, department_id)
VALUES ("CEO", 1500000.00, 1), 
       ("CTO", 1000000.00, 2), 
       ("HR Director", 300000.00, 3),
       ("Marketing Manager", 90000.00, 4), 
       ("Marketing Director", 250000.00, 4),
       ("Operations Director", 195000.00, 5), 
       ("Customer Service Director", 250000.00, 6), 
       ("Customer Service Rep", 40000.00, 6);

SELECT * FROM roles;

-- Insert rows into employees table managers only using role id
INSERT INTO employee (first_name, last_name, roles_id)
VALUES ("Danielle", "Beaty", 1), ("Keisha", "Santana", 2), ("Cherise", "Johnson", 3),("Dominique", "Browder", 4);

-- Insert rows into employees table employees only: view employees by manager using manager_id
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Brown", 4, 2), ("Julie", "Smith", 2, 3),  ("Trish", "Cummings", 4, 3), ("Jerome", "White", 2, 4);

SELECT * FROM employee;