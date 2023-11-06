CREATE TABLE `board` (
  `board_no` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `board_title` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `board_content` text COLLATE utf8mb4_bin NOT NULL,
  `creation_date` datetime DEFAULT now() NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`board_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;