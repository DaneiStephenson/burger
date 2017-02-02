### Schema
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
	`id` int NOT NULL AUTO_INCREMENT,
	`burger_name` varchar(255) NOT NULL,
	`devoured` tinyint(1) NOT NULL,
	`date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

