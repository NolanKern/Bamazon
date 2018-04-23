-- Create and initialize database

CREATE DATABASE bamazon;
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

-- Create a table to store product details --

  CREATE TABLE products ( 
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY(item_id)
);

-- Initializing the database with 10 random products --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('MTG Card Sleeves', 'Gaming', 9.75, 500),
	   ('Tweesers', 'Cosemetics', 2.00, 500),
       ('Bananas', 'Grocery', .67, 1500),
       ('Band Aid', 'Pharmacy', 3.25, 550),
       ('MTG Dominaria Pack', 'Gaming', 3.50, 1750),
       ('Monster Hunter World', 'Gaming', 60.00, 200),
       ('Granny Apples', 'Produce', 0.35, 1200),
       ('Baseball Cap', 'Clothing', 5.00, 275),
       ('Dasani Bottled Water 12 pack', 'Grocery', 5.99, 600),
       ('Cricket Bat','Sports', 35.00, 100),
       ('PS4', 'Electronics', 500.00, 175),
       ('ASUS ROG STRIX Laptop', 'Electronics', 1400.00, 50);