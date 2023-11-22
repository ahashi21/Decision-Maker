-- Drop and recreate Widgets table (Example)

CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER NOT NULL,
  choice_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
  FOREIGN KEY (choice_id) REFERENCES choices(id) ON DELETE CASCADE,
  UNIQUE (poll_id, choice_id)
);
