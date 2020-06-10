var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "employeedatabase"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
        .prompt({
            name: "chooseAction",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Roles", "End program"]
        })
        .then(function (answer) {

            if (answer.chooseAction === "Add Department") {
                addDepartment();
            }
            else if (answer.chooseAction === "Add Role") {
                addRole();
            }
            else if (answer.chooseAction === "Add Employee") {
                addEmployee();
            }
            else if (answer.chooseAction === "View Departments") {
                viewDepartments();
            }
            else if (answer.chooseAction === "View Roles") {
                viewRoles();
            }
            else if (answer.chooseAction === "View Employees") {
                viewEmployees();
            }
            else if (answer.chooseAction === "Update Employee Roles") {
                updateRole();    
            }

            else if (answer.chooseAction === "End program") {
                connection.end();
                process.exit(0);
            }

            else {
                connection.end();
            }
        })
        .catch(function (err) {
            // console.log(err);
        });

}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "newDept",
                type: "input",
                message: "What would you like to name the new department?"
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.newDept

                },
                function (err, res) {
                    if (err) throw err;
                    //  console.log("Your department was created successfully!", res);
                    // re-prompt the user 
                    start();
                }
            );
        })
        .catch(function (err) {
            // console.log(err);
        });
}

function addRole() {

    inquirer
        .prompt([
            {
                name: "newRole",
                type: "input",
                message: "What would you like to name the new role?"
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.newRole

                },
                function (err, res) {
                    if (err) throw err;
                    // console.log("Your role was created successfully!");
                    // re-prompt the user 
                    start();
                }
            );
        })
        .catch(function (err) {
            // console.log(err);
        });

}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "newEmployeefirst",
                type: "input",
                message: "What would you like to first name the new Employee?"
            },


            {
                name: "newEmployeelast",
                type: "input",
                message: "What would you like to last name the new Employee?"
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.newEmployeefirst,
                    last_name: answer.newEmployeelast
                },
                function (err, res) {
                    if (err) throw err;
                     console.log("Your employee was created successfully!");
                    // re-prompt the user 
                    start();
                }
            );

        })
        .catch(function (err) {
             console.log(err);
        });

}

function viewDepartments() {

    // console.log("Viewing all departments...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        
         console.log(res);

        if (err) throw err;
        // Log all results of the SELECT statement
        
        // connection.end();
        start();
    
    })
     .catch (function (err) {
            // console.log(err);
        });

}

function viewRoles() {

    console.log("Viewing all roles...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
         console.log(res);
        // connection.end();
        start();
    });

}

function viewEmployees() {
console.log("inside employee view");
    console.log("Viewing all employees...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        // connection.end();
        start();
    });

}

function updateRole() {

    inquirer
        .prompt([
            {
                name: "employeeID",
                type: "input",
                message: "Please enter your employee ID?"
            },

            {
                name: "roleID",
                type: "input",
                message: "Please enter your role ID?"
            }])

        .then(function (answer) {

            // console.log("Updating Role...\n");
            var query = connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: answer.roleID
                    },
                    {
                        ID: answer.employeeID
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                     console.log(res.affectedRows + " roles updated!\n");
                    start();
                }
            );

            // logs the actual query being run
            // console.log(query.sql);


        })
        .catch(function (err) {
             console.log(err);
        });

};
