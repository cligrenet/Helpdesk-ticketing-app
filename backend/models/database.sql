CREATE DATABASE pernhelpdesk;

-- Define schema

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL, 
    password VARCHAR(150) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TYPE product AS ENUM ('iPhone','Macbook Pro','Macbook Air', 'iMac', 'iPad');
CREATE TYPE status AS ENUM('new', 'open', 'closed');
CREATE TABLE tickets(
    ticket_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users NOT NULL, 
    product product NOT NULL, 
    description VARCHAR(500),
    status status NOT NULL DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);