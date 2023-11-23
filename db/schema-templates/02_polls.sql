CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER NOT NULL,
  admin_link VARCHAR(255),
  user_link VARCHAR(255),
  FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);