CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER NOT NULL,
  option VARCHAR(255),
  description VARCHAR(255),
  FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE
);