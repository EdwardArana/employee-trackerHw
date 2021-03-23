INSERT INTO department (id, name) VALUES (1, 'Engineering');

INSERT INTO department (id, name) VALUES (2, 'Sales');

INSERT INTO department (id, name) VALUES (3, 'Finace');

INSERT INTO department (id, name) VALUES (4, 'Legal');

INSERT INTO department (id, name) VALUES (10, 'Human Rescources');



INSERT INTO role (title, salary, departmentID) VALUES ("Lead Engineer", 150000, 1);
INSERT INTO role (title, salary, departmentID) VALUES ("Engineer", 125000, 1);


INSERT INTO role (title, salary, departmentID) VALUES ("Sales Mgr.", 138600, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Print Sales Rep.", 150000, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Online Sale Rep.", 150000, 2);


INSERT INTO role (title, salary, departmentID) VALUES ("Comptrolleer", 166000, 3);
INSERT INTO role (title, salary, departmentID) VALUES ("Accoutant", 138000, 3);
INSERT INTO role (title, salary, departmentID) VALUES ("Billing Coordinator", 122000, 3);


INSERT INTO role (title, salary, departmentID) VALUES ("Lawyer", 145000, 4);

INSERT INTO role (title, salary, departmentID) VALUES ("Operation Mgr.", 134400, 5);

INSERT INTO role (title, salary, departmentID) VALUES ("Hr Coordinator", 110000, 10);


INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Craig', 'Yang',1, null );

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Jerry', 'Young', 2, 1);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Patrick', 'Fitzgerald', 3, null);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('William', 'Black', 4, 3);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Nathan', 'Jet',5, 3);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Charlie', 'Tango', 6, null);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Suzie', 'Silver', 7, 6);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Pink', 'Rollins', 8, 6);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Perry', 'Terry', 9, null);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Deigo', 'McRae', 10, null);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Edward', 'Mac', 2, 1);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Thomas', 'Miller', 11, null);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Mack', 'Mueller', 7, 6);

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Bruce', 'Horn', 2, 1);