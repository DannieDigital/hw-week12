-- Seeds for SQL table.
USE employeeTracker_db;

-- Insert rows into department table
INSERT INTO department (name)
VALUES ("Human Resourcces"), ("Information Technology"), ("Marketing"),("Customer Service"), ("Senior Management"), ("Operations");

SELECT * FROM deparment;

-- Insert rows into roles table 
INSERT INTO roles (title, salary, department_id)
VALUES ("CEO", 1500000.00, 1), ("CTO", 1000000.00, 1), ("HR Director", 300000.00, 1),("Marketing Director", 250000.00, 1), ("Customer Service Director", 250000.00, 1), ("Operations Director", 195000.00, 1), ("Customer Service Representative", 250000.00, 2) ;

SELECT * FROM roles;

-- Insert rows into employees table managers only using role id
INSERT INTO employee (first_name, last_name, role_id)
VALUES (""), (""), (""),("");

-- Insert rows into employees table employees only: view employees by manager using manager_id
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (""), (""), (""),("");

SELECT * FROM employee;