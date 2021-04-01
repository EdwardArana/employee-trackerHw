DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (

  id INT NOT NULL AUTO_INCREMENT,

  firstName VARCHAR (30) NOT NULL,

  lastName VARCHAR (30) NOT NULL,

  roleID INT,

  managerID INT,

  PRIMARY KEY(id)

);


CREATE TABLE department (

  id INT NOT NULL AUTO_INCREMENT,

  name VARCHAR (30) NOT NULL,

  PRIMARY KEY(id)

);



CREATE TABLE role (

  id INT NOT NULL AUTO_INCREMENT,

  title VARCHAR (30) NOT NULL,

  salary DECIMAL(65,2) NOT NULL,

  departmentID INT,

  PRIMARY KEY(id),


);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employees;