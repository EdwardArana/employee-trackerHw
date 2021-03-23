const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: process.env.DB_PASSWORD,

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

            case "Add Role":

                addRole();

            break;

            case "Add Employee":

                addEmployee();

            break;

            case "Add Department":

                addDept();

            break;

            case "Update Employee Role":

                updateEmployeeRole();

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

      console.log(" ");

      console.log("*** EMPLOYEES LIST ***");

      console.log(" ");

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

function viewEmployeesByDept() {

    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, department.name AS Department FROM employees JOIN role ON employees.roleID = role.id JOIN department ON role.departmentID = department.id ORDER BY department.id;",
        
        function(err, res) {
            
      if (err) throw err

      console.log("");

      console.log("*** EMPLOYEES LIST BY DEPARTMENT ***");

      console.log("");

      console.table(res)

      runEmployeeDB()
        
    })
}

function viewEmployeesByRole() {

    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, department.name AS Department FROM employees JOIN role ON employees.roleID = role.id JOIN department ON role.departmentID = department.id ORDER BY department.id;",
        
        function(err, res) {
            
      if (err) throw err

      console.log("");

      console.log("*** EMPLOYEES LIST BY ROLE ***");

      console.log("");

      console.table(res)

      runEmployeeDB()
        
    })
}


let roleArray = [];

function selectRole() {

    connection.query("SELECT * FROM role", function(err, res) {

        if (err) throw err 

        for (var i = 0; i < res.length; i++) {

            roleArray.push(res[i].title);
        }
    })
    return roleArray;

}

let managersArray = [];

function selectManager() {

    connection.query("SELECT firstName, lastName FROM employees", function(err, res) {

        if (err) throw err 

        for (var i =0; i < res.length; i++) {

            managersArray.push(res[i].firstName);
        }
    })

    return managersArray;

}

let deptArray = [];

function selectDepartment() {

    connection.query("SELECT firstName, lastName FROM employees", function(err, res) {

        if (err) throw err 

        for (var i =0; i < res.length; i++) {

            deptArray.push(res[i].firstName);
        }
    })

    return deptArray;

}


function addEmployee() {

    inquirer.prompt([

        {
            name: "firstName",

            type: "input",

            message: "First Name: "
        },

        {
            name: "lastName",

            type: "input",

            message: "Last Name: "

        },
        {
            name: "role",

            type: "list",

            message: "What is the new employee's title? ",

            choices: selectRole()
        },
        {
            name: "choice",

            type: "rawlist",

            message: "Who is managing the new employee? ",

            choices: selectManager()
        }

    ]).then(function (answers) {

        let roleId = selectRole().indexOf(answers.role) + 1

        let managerId = selectManager().indexOf(answers.choice) + 1

        connection.query("INSERT INTO employees SET ?", 
        {
            firstName: answers.firstName,

            lastName: answers.lastName,

            managerID: managerId,

            roleID: roleId
            
        },

        function(err) {

            if (err) throw err

            console.table(answers)

            runEmployeeDB()
        })
  
    })

}

function updateEmployeeRole() {

    connection.query("SELECT employees.lastName, role.title FROM employees JOIN role ON employees.roleID = role.id;",
    
    (err, res) => {

        if (err) throw err;

        inquirer.prompt([
            {
                name: "lastName",

                type: "rawlist",

                choices: function () {

                    let lastName = [];

                    for (var i = 0; i < res.length; i++) {

                        lastName.push(res[i].lastName);

                    }

                    return lastName;
                },

                message: "What is the employee's last name? ",
            },
            {
                name: "role",

                type: "rawlist",

                message: "What is the employee's new title? ",

                choices: selectRole()
            },  
        ]).then(function (answers) {

            let roleId = selectRole().indexOf(answers.role) + 1;

            connection.query("UPDATE employees SET WHERE ?",

                {
                    lastName: answers.lastName,

                    roleID: roleId
                },
    
                function (err) {

                    if (err) throw err;

                    console.table(answers);

                    runEmployeeDB();

                });
        });
    });
};


function addDept() { 

    inquirer.prompt([
        
        {
          name: "name",

          type: "input",

          message: "What Department would you like to add? "

        },
        {
            name: "id",

            type: "input",

            message: "What is the new Department ID number? "

        }

    ]).then(function(answers) {

        connection.query("INSERT INTO department SET ? ",

            {
             
              name: answers.name,

              id: answers.id

            },
            function(err) {

                if (err) throw err

                console.table(res);

                runEmployeeDB();
            }
        );
    });
  };

  function addRole() { 

    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;",   function(err, res) {

      inquirer.prompt([

        {
            name: "title",

            type: "input",

            message: "What is name of the new role?"

        },
        {
            name: "salary",

            type: "input",

            message: "What is the salary of the new role?"

        },
        {
            name: "department",

            type: "rawlist",

            message: "Under which department does this new role fall?",

            choices: selectDepartment()
        }
      ]).then(function(answers) {

          let deptId = selectDepartment().indexOf(answers.choice) + 1

          connection.query("INSERT INTO role SET ?",

            {
                title: answers.title,

                salary: answers.salary,

                departmentID: deptId
            },

            function(err) {

            if (err) throw err

            console.table(answers);
                
            runEmployeeDB();
            }
          )     
      });
    });
};