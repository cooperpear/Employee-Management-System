CREATE DATABASE employeeDatabase;
USE employeeDatabase;

CREATE TABLE department(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
FOREIGN KEY (role_id) REFERENCES role(id),
manager_id INT,
FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT employee.first_name, employee.last_name, title, salary, department.name, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department
ON department_id = department.id
LEFT JOIN employee manager 
ON employee.manager_id = manager.id
