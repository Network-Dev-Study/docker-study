
CREATE USER 'local_test'@'%' IDENTIFIED BY '1234';
FLUSH PRIVILEGES;
GRANT ALL PRIVILEGES ON rosa.* TO local_test@'%';