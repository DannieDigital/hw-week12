const mysql = require("mysql");
const inquirer = require("inquirer");



const view = require('./utils/view.js');
const add = require('./utils/add.js');
const update = require('./utils/update.js');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employeeTracker_db"
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

function start() {
  inquirer
      .prompt({
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: [
              "View all employees",
              "View all employees by Department",
              "View all employees by Manager",
              "Add an employee",
              "Update an employee role",
              "Update an employee's manager",
              "Remove an employee",
              "View all company's roles",
              "Add a new role",
              "Remove a role",
              "View all departments",
              "Add a department",
              "Remove a department",
              "Exit"
          ]
      })
      .then((answer) => {
          switch (answer.action) {
              case "View all employees":
                  view.viewAllEmployees(connection, start);
                  break;

              case "View all employees by Department":
                  view.viewEmployeeDept(connection, start);
                  break;

              case "View all employees by Manager":
                  view.viewEmployeeMgr(connection, start);
                  break;

              case "Add an employee":
                  add.addEmployee(connection, start);
                  break;

              case "Update an employee role":
                  update.updateRole(connection, start);
                  break;

              case "Update an employee's manager":
                  update.updateManager(connection, start);
                  break;

              case "Remove an employee":
                  update.removeEmployee(connection, start);
                  break;

              case "View all company's role":
                  view.viewRole(connection, start);
                  break;

              case "Add a new role":
                  add.addRolenod(connection, start);
                  break;

              case "Remove a role":
                  update.removeRole(connection, start);
                  break;

              case "View all departments":
                  view.viewDepartments(connection, start);
                  break;

              case "Add a department":
                  add.addDepartment(connection, start);
                  break;

              case "Remove a department":
                  update.removeDepartment(connection, start);
                  break;

              case "EXIT":
                  connection.end();
                  break;
          }
      })
}