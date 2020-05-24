-- Drops the employeeTracker_db if it already exists --
DROP DATABASE IF EXISTS employeeTracker_db;

-- Create a database called employeeTracker_db --
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

/* Created tables for department, role, and employee with a primary key that auto-increments, and a text field */
CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
     PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title  VARCHAR(30) NOT NULL,
    salary DECIMAL (15, 2), 
    department_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30)
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
   
):

 -- https://www.techonthenet.com/sql_server/foreign_keys/foreign_delete_null.php

-- https://stackoverflow.com/questions/32984684/deleting-an-employee-conflicts-with-department-manager-foreign-key-constraint