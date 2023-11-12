SET time_zone = '+09:00';
SET NAMES utf8mb4;

CREATE DATABASE `rosa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `rosa`;

DROP TABLE IF EXISTS `board`;
CREATE TABLE `board` (
  `board_no` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `board_title` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `board_content` text COLLATE utf8mb4_bin NOT NULL,
  `creation_date` datetime DEFAULT now() NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`board_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `board` (`board_no`, `board_title`, `board_content`) VALUES
(1,	'첫 번째 게시글입니다.',	'안녕하세요~!'),
(2,	'두 번째 게시글입니다.',	'반갑습니다!'),
(3,	'세 번째 게시글입니다.',	'굿모닝~');