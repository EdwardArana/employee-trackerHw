const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const { connect } = require("node:http2");
const { Console } = require("node:console");
const { CONNREFUSED } = require("node:dns");

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password:"",

    database: "employees_db"

});

connection.connect(function(err) {
    if (err) throw err;

    console.log("Connected as ID " + connection.threadId);

    console.clear();

    console.log("======================================");

    console.log("");

    console.log("  WELCOME TO THE EMPLOYEE DATABASE   ");

    console.log("");

    console.log("======================================");
    runEmployeeDB();

});

function runEmployeeDB() {

    inquirer.prompt([

        {
            type: "list",

            message: "What would you like to do today?",

            name: "action",

            choices: [

                "View All Employmees",

                "View All Departments",

                "View All Roles ",

                "View All Employees by Department",

                "View All Employee by Role",

                "Add Department",

                "Add Role",

                "Add Employee",

                "Update Employee Role",
                
                "Exit"

            ]

        }

    ]).then(function (answers) {

        switch (answers.action) {

            case "View All Employees":

                viewAllEmployees();

            break;

            case "View All Departments":

                viewAllDepts();

            break;

            case "View All Roles":

                viewAllRoles();
            
            break;

            case "View All Employees by Department":

                viewEmployeesByDept();

            break;

            case "View All Employees by Role":

                viewEmployeesByRole();

            break;

            case "Exit":

                console.log("======================================")

                console.log("");

                console.log(" THANK YOU FOR USING THE EMPLOYEE DATABASE");

                console.log(""),

                console.log("======================================");

                connection.end();
            
            break;
         }
    })
};

    function viewAllEmployees() {

    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(e.firstName, ' ' ,e.lastName) AS Manager FROM employees INNER JOIN role on role.id = employees.roleID INNER JOIN department on department.id = role.departmentID LEFT JOIN employees e on employees.managerID = e.id;", 
        
        function(err, res) {

      if (err) throw err

      console.log("");

      console.log("*** EMPLOYEES LIST ***");

      console.log("");

      console.table(res)

      runEmployeeDB()
        
    })
}


function viewAllDepts() {

    connection.query("SELECT department.id AS ID, department.name AS Department FROM department",
        
        function(err, res) {

      if (err) throw err

      console.log("");

      console.log("*** Department LIST ***");

      console.log("");

      console.table(res)

      runEmployeeDB()
        
    })
}

function viewAllRoles() {

    connection.query("SELECT role.id AS Dept_ID, role.title AS Title FROM role",
        
        function(err, res) {
            
      if (err) throw err

      console.log("");

      console.log("*** ROLE LIST ***");

      console.log("");

      console.table(res)

      runEmployeeDB()
        
    })
}
