DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (

  id INT NOT NULL AUTO_INCREMENT,

  firstName VARCHAR (30),

  lastName VARCHAR (30),

  roleID INT,

  managerID INT,

  PRIMARY KEY(id)

);


CREATE TABLE department (

  id INTNOT NULL AUTO_INCREMENT,

  name VARCHAR (30),

  PRIMARY KEY(id)

);



CREATE TABLE role (

  id INT AUTO_INCREMENT,

  title VARCHAR (30),

  salary DECIMAL(9,2),

  departmentID INT,

  PRIMARY KEY(id)

);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employees;