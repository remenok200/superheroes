CREATE TABLE customers(
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(256),
    email VARCHAR(256)
);

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(256),
    price DECIMAL(10, 2)
);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

///////////////

INSERT INTO customers(name, email) VALUES
('Ivan Ivanov', 'ivan.ivanov@gmail.com'),
('Petr Petrov', 'petr.petrov@gmail.com'),
('Sidr Sidorov', 'sidr.sidorov@gmail.com');
-- Сидр Сидоров - нічого не замовляв

INSERT INTO products(name, price) VALUES
('Samsung Telephone', 500.5),
('Huawei Telephone', 356),
('Xiaomi Telephone', 420.65),
('IPhone', 799.99);
-- Xiaomi - ніхто не замовляв

INSERT INTO orders(customer_id, product_id, quantity) VALUES
(1, 1, 1), -- Іванов замовив Самсунг, Хуавей, Айфон (всього 3 товари)
(1, 2, 1),
(1, 4, 1),
(2, 2, 1); -- Петров замовив тільки Хуавей (всього 1 товар)


////////////////

-- Задача: Вивести повну інформацію про замовлення (інформація про замовлення + інформація про замовника + інформація про товар)

SELECT * FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id
INNER JOIN products ON orders.product_id = products.product_id;

-- Задача: Вивести повну інформацію про замовника (інформація про його замовлення)

SELECT * FROM customers
LEFT JOIN orders ON orders.customer_id = customers.customer_id
LEFT JOIN products ON orders.product_id = products.product_id;

--

SELECT * FROM orders
RIGHT JOIN customers ON orders.customer_id = customers.customer_id
RIGHT JOIN products ON orders.product_id = products.product_id;

SELECT * FROM customers
FULL JOIN orders ON orders.customer_id = customers.customer_id
FULL JOIN products ON orders.product_id = products.product_id;