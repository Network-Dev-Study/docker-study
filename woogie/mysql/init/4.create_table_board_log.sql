CREATE TABLE board_log(
  log_id int AUTO_INCREMENT PRIMARY KEY,
  log_content JSON NOT NULL,
  creation_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);