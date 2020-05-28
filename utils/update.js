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


function updaterole(connection, cb) {

    let newrole = {};

    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id", function (err, results) {
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

                newrole.first_name = answer.updateEmployee;

                connection.query("SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                name: "updateRole",
                                type: "list",
                                choices: function () {
                                    let choiceArray = [];
                                    for (var i = 0; i < results.length; i++) {
                                        choiceArray.push(results[i].title);
                                    }
                                    return choiceArray;
                                },
                                message: "Modify employees' role title here?"
                            }
                        ])
                        .then(function (answer) {
                         
                            connection.query("SELECT * FROM role WHERE title = ?", answer.updateRole, function (err, results) {
                                if (err) throw err;

                                newrole.role_id = results[0].id;

                                connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [newrole.role_id, newRole.first_name], function (err, res) {
                                    if (err) throw (err);
                                    console.log('Employee role successfully updated.');
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

    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id", function (err, results) {
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

function removerole(connection, cb) {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "removerole",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].title);
                        }
                        return choiceArray;
                    },
                    message: "Which role would you like to remove?"
                }
            ])
            .then(function (answer) {
                let query = 'DELETE FROM role WHERE title = ?;'
                connection.query(query, answer.removerole, function (err, res) {
                    if (err) throw err;
                    console.log("role successfully deleted");
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
    updaterole: updaterole,
    updateManager: updateManager,
    removerole: removerole,
    removeDepartment: removeDepartment
}