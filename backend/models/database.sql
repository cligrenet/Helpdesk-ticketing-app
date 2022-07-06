CREATE DATABASE pernhelpdesk;

-- Define schema

CREATE TABLE users(
    userId SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL, 
    password VARCHAR(150) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TYPE product AS ENUM ('iPhone','Macbook Pro','Macbook Air', 'iMac', 'iPad');
CREATE TYPE status AS ENUM('new', 'open', 'closed');
CREATE TABLE tickets(
    ticketId SERIAL PRIMARY KEY NOT NULL,
    userId INT REFERENCES users NOT NULL, 
    product product NOT NULL, 
    description VARCHAR(500),
    status status NOT NULL DEFAULT 'new',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes(
    noteId SERIAL PRIMARY KEY NOT NULL,
    ticketId INT REFERENCES tickets NOT NULL,
    userId INT REFERENCES users NOT NULL,
    text VARCHAR(500) NOT NULL,
    isStaff BOOLEAN DEFAULT FALSE,
    staffId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)