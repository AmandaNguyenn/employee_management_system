use employees;
INSERT INTO department (name)
VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Accounting'),
    ('Sales');
INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 90000, 1),
    ('Salesperson', 80000, 1),
    ('Billing Specialist', 100000, 2),
    ('Graphic Designer', 110000, 2),
    ('Account Manager', 120000, 3),
    ('Accountant', 115000, 3),
    ('Vice President of HR', 250000, 4),
    ('HR Manager', 150000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Amanda', 'Nguyen', 1, NULL),
    ('Chris', 'Bright', 2, 1),
    ('Bodhi', 'Nguyen', 3, NULL),
    ('Jane', 'Doe', 4, 3),
    ('John', 'Doe', 5, NULL),
    ('Jon', 'Smith', 6, 5),
    ('Joe', 'Rehfus', 7, NULL),
    ('Denis', 'Malloy', 8, 7);