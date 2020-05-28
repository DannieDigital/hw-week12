const inquirer = require('inquirer');

function addEmployee(connection, cb) {
    let newEmployee = {};
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "first_name",
                    type: "input",
                    default: "First Name Required",
                    message: "What is the employee's first name?",
                    validate: function (answer) {
                        if (answer.length < 1) {
                            return console.log("Please add a valid first name.");
                        }
                        return true;
                    }
                },
                {
                    name: "last_name",
                    type: "input",
                    default: "Last Name Required",
                    message: "What is the employee's last name?",
                    validate: function (answer) {
                        if (answer.length < 1) {
                            return console.log("Please add a valid last name.");
                        }
                        return true;
                    }
                },
                {
                    name: "role",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].title);
                        }
                        return choiceArray;
                    },
                    message: "What is the employee's role?"
                }
            ])
            .then(function (answer) {

                newEmployee.first_name = answer.first_name;
                newEmployee.last_name = answer.last_name;

              
                connection.query("SELECT * FROM role WHERE title = ?", answer.role, function (err, results) {
                    if (err) throw err;

                    newEmployee.role_id = results[0].id;

                   
                    connection.query("SELECT * FROM employee;", function (err, results) {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    name: "manager_name",
                                    type: "list",
                                    choices: function () {
                                        let choiceArray = [];
                                        for (var i = 0; i < results.length; i++) {
                                            choiceArray.push(results[i].first_name);
                                        }
                                        return choiceArray;
                                    },
                                    message: "Who is the employee's manager?"
                                }
                            ])
                            .then(function (answer) {
                                connection.query("SELECT id FROM employee WHERE first_name = ?", answer.manager_name, function (err, results) {
                                    if (err) throw err;
                                    newEmployee.manager_id = results[0].id;
                                    console.log("Adding new employee: ", newEmployee);

                                    connection.query('INSERT INTO employee SET ?', newEmployee, function (err, results) {
                                        if (err) throw err;
                                        console.log("Employee successfully added.");
                                        cb();
                                    })
                                })
                            });
                    });
                });
            });
    })
};

function addrole(connection, cb) {
    let newrole = {};
    connection.query("SELECT * FROM department", function (err, results) {
        inquirer
            .prompt([
                {
                    name: "role_title",
                    type: "input",
                    default: "Lead Engineer",
                    message: "Add employee here:",
                    validate: function (answer) {
                        if (answer.length < 1) {
                            return console.log("Please add a valid role.");
                        }
                        return true;
                    }
                },
                {
                    name: "salary",
                    type: "input",
                    default: "0000",
                    message: "What is the salary for this role?",
                    validate: function (answer) {
                        if (answer.length < 1) {
                            return console.log("Please add a valid salary.");
                        }
                        return true;
                    }
                },
                {
                    name: "dept_name",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].name);
                        }
                        return choiceArray;
                    },
                    message: "What is the employee's department?"
                }
            ])
            .then(function (answer) {

                newrole.title = answer.role_title;
                newrole.salary = answer.salary;

             
                connection.query("SELECT id FROM department WHERE name = ?", answer.dept_name, function (err, results) {
                    if (err) throw err;
                    newrole.department_id = results[0].id;
                    console.log("Adding new role: ", newrole);

                    connection.query('INSERT INTO role SET ?', newrole, function (err, results) {
                        if (err) throw err;
                        console.log("role successfully added.");
                        cb();
                    });
                })

            })
    })
};


function addDepartment(connection, cb) {
    inquirer
        .prompt([
            {
                name: "dept_name",
                type: "input",
                default: "Marketing",
                message: "What is the departmen would you like to add?",
                validate: function (answer) {
                    if (answer.length < 1) {
                        return console.log("Please add a valid department.");
                    }
                    return true;
                }
            }
        ])
        .then(function (answer) {
                connection.query('INSERT INTO department (name) VALUES (?)', answer.dept_name, function (err, results) {
                    if (err) throw err;
                    console.log("Department successfully added.");
                    cb();
                });

        })

};


module.exports = {
    addEmployee: addEmployee,
    addrole: addrole,
    addDepartment: addDepartment
};