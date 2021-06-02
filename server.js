const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./connection");
require("console.table");

//establish connection
connection.connect(() => {



const askQuestions = () => {
    console.log("*******")
    inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "What data would you like to see or do?",
            choices: [
                {
                    name: "View Employees",
                    value: "view_employees"
                },
                {
                    name: "View Department",
                    value: "view_department"
                },
                {
                    name: "View Role",
                    value: "view_role"
                },
                {
                    name: "Add Employee",
                    value: "add_employees"
                },
                {
                    name: "Add Department",
                    value: "add_department"
                },
                {
                    name: "Add Role",
                    value: "add_role"
                },
                {
                    name: "Update Employees by role",
                    value: "update_roles"
                },
            ]
        }
    ])
    
    .then((answer) => {
        console.log("*8******");
        switch (answer.userChoice) {
            case "view_employees":
                viewEmployee();
                break;

            case "view_department":
                viewDepartment();
                break;

            case "view_role":
                viewRole();
                break;

            case "add_employees":
                addEmployees();
                break;

            case "add_department":
                addDepartment();
                break;

            case "add_role":
                addRole();
                break;

            case "update_role":
                updateRole();
                break;

            default:
                //connection.end
                break;
        }
    });
};





const viewEmployee = () => {
    connection.query(`
    SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name,' ',manager.last_name) AS manager
    FROM
        employee
            LEFT JOIN role on employee.role_id = role.id
            LEFT JOIN department on role.department_id = department.id
            LEFT JOIN employee manager on manager.id = employee.manager_id;
    `,
        function (err, data) {
            if (err) throw err;
            console.table(data);
            askQuestions();
        })
};

const viewRole = () => {
    connection.query("SELECT * FROM Role",
        function (err, data) {
            console.table(data);
            askQuestions();
        })
};

const viewDepartment = () => {
    connection.query("SELECT * FROM department",
        function (err, data) {
            console.table(data);
            askQuestions();
        })
};

const addEmployees = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }
    ]).then(function (res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
};

const addDepartment = () => {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    },]).then(function (res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function (err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

};

const updateRole = () => {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

};

//start the app
askQuestions();



});