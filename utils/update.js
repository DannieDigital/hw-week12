const inquirer = require('inquirer');

function removeEmployee(connection, cb) {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "removeEmployee",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].first_name);
                        }
                        return choiceArray;
                    },
                    message: "Remove an employee here:"
                }
            ])
            .then(function (answer) {
                let query = 'DELETE FROM employee WHERE first_name = ?;'
                connection.query(query, answer.removeEmployee, function (err, res) {
                    if (err) throw err;
                    console.log("Employee successfully deleted");
                    cb();
                });
            });
    });
};


function updateRoles(connection, cb) {

    let newRoles = {};

    connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN roles ON employee.roles_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employee.id", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "updateEmployee",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].first_name);
                        }
                        return choiceArray;
                    },
                    message: "Update employee here:"
                }
            ])
            .then(function (answer) {

                newRoles.first_name = answer.updateEmployee;

                connection.query("SELECT * FROM roles", function (err, res) {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                name: "updateRoles",
                                type: "list",
                                choices: function () {
                                    let choiceArray = [];
                                    for (var i = 0; i < results.length; i++) {
                                        choiceArray.push(results[i].title);
                                    }
                                    return choiceArray;
                                },
                                message: "Modify employees' roles title here?"
                            }
                        ])
                        .then(function (answer) {
                         
                            connection.query("SELECT * FROM roles WHERE title = ?", answer.updateRoles, function (err, results) {
                                if (err) throw err;

                                newRoles.roles_id = results[0].id;

                                connection.query("UPDATE employee SET roles_id = ? WHERE first_name = ?", [newRoles.roles_id, newRoles.first_name], function (err, res) {
                                    if (err) throw (err);
                                    console.log('Employee roles successfully updated.');
                                    cb();
                                })

                            })
                        });
                });
            });
    })
};

function updateManager(connection, cb) {

    let newManager = {};

    connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN roles ON employee.roles_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employee.id", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "updateEmployee",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].first_name);
                        }
                        return choiceArray;
                    },
                    message: "Which employee would you like to update?"
                }
            ])
            .then(function (answer) {

                newManager.first_name = answer.updateEmployee;

                connection.query("SELECT * FROM employee", function (err, res) {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                name: "updateManager",
                                type: "list",
                                choices: function () {
                                    let choiceArray = [];
                                    for (var i = 0; i < results.length; i++) {
                                        choiceArray.push(results[i].first_name);
                                    }
                                    return choiceArray;
                                },
                                message: "Who would you like to change their manager to?"
                            }
                        ])
                        .then(function (answer) {
                            connection.query("SELECT * FROM employee WHERE first_name = ?", answer.updateManager, function (err, results) {
                                if (err) throw err;

                                newManager.manager_id = results[0].id;

                                connection.query("UPDATE employee SET manager_id = ? WHERE first_name = ?", [newManager.manager_id, newManager.first_name], function (err, res) {
                                    if (err) throw (err);
                                    console.log('Employee manager successfully updated.');
                                    cb();
                                })

                            })
                        });
                });
            });
    })
};

function removeRoles(connection, cb) {
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "removeRoles",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].title);
                        }
                        return choiceArray;
                    },
                    message: "Which roles would you like to remove?"
                }
            ])
            .then(function (answer) {
                let query = 'DELETE FROM roles WHERE title = ?;'
                connection.query(query, answer.removeRoles, function (err, res) {
                    if (err) throw err;
                    console.log("Roles successfully deleted");
                    cb();
                });
            });
    });
};


function removeDepartment (connection, cb) {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "removeDept",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].name);
                        }
                        return choiceArray;
                    },
                    message: "Which department would you like to remove?"
                }
            ])
            .then(function (answer) {
                let query = 'DELETE FROM department WHERE name = ?;'
                connection.query(query, answer.removeDept, function (err, res) {
                    if (err) throw err;
                    console.log("Department successfully deleted");
                    cb();
                });
            });
    });
}



module.exports = {
    removeEmployee: removeEmployee,
    updateRoles: updateRoles,
    updateManager: updateManager,
    removeRoles: removeRoles,
    removeDepartment: removeDepartment
}