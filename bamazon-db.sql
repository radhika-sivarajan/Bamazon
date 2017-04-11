DROP DATABASE bamazon;

CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(200) NULL,
    department_name VARCHAR(200) NULL,
    price DECIMAL(10 , 2 ) NOT NULL DEFAULT 0,
    stock_quantity INT NULL,
    product_sales DECIMAL(10 , 2 ) NOT NULL DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Dress","Clothing","102","20"),
("I phone","Electronics","500","30"),
("Earrings","Jewelry","50","78"),
("Shirt","Clothing","100","30"),
("Pendant","Jewelry","40","22"),
("Chair","Furniture","304","10"),
("Jeans","Clothing","65","89"),
("Gown","Clothing","800","2"),
("Necklace","Jewelry","209","20"),
("Watch","Electronics","400","44");

SELECT * FROM products;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(200) NULL,
    over_head_costs DECIMAL(10 , 2 ) NOT NULL DEFAULT 0,
    total_sales DECIMAL(10 , 2 ) NOT NULL DEFAULT 0,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs) VALUES 
("Clothing","1002"),
("Electronics","1500"),
("Jewelry","500"),
("Furniture","1000"),
("Toys","200");

SELECT * FROM departments;