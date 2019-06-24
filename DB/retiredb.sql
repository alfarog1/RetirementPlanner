-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema retiredb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `retiredb` ;

-- -----------------------------------------------------
-- Schema retiredb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `retiredb` DEFAULT CHARACTER SET utf8 ;
USE `retiredb` ;

-- -----------------------------------------------------
-- Table `vehicle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vehicle` ;

CREATE TABLE IF NOT EXISTS `vehicle` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `asset_name` VARCHAR(45) NULL DEFAULT NULL,
  `is_qualified` TINYINT(4) NULL DEFAULT NULL,
  `is_fixed` TINYINT(4) NULL DEFAULT NULL,
  `max_contribution` INT(11) NULL,
  `is_pretax` TINYINT(4) NULL DEFAULT NULL,
  `has_employer_match` TINYINT(4) NULL DEFAULT NULL,
  `compounding_periods` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `risk_profile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `risk_profile` ;

CREATE TABLE IF NOT EXISTS `risk_profile` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `ror` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `role` VARCHAR(45) NOT NULL DEFAULT 'user',
  `enabled` TINYINT(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `asset`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `asset` ;

CREATE TABLE IF NOT EXISTS `asset` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `risk_profile_id` INT(11) NULL,
  `vehicle_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `contribution_fixed` DECIMAL(10,2) NULL DEFAULT NULL,
  `contribution_percent` INT(11) NULL DEFAULT NULL,
  `periodic_deposit` DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_portfolio_user_idx` (`user_id` ASC),
  INDEX `fk_portfolio_asset1_idx` (`vehicle_id` ASC),
  INDEX `fk_portfolio_risk_profile1_idx` (`risk_profile_id` ASC),
  CONSTRAINT `fk_portfolio_asset1`
    FOREIGN KEY (`vehicle_id`)
    REFERENCES `vehicle` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portfolio_risk_profile1`
    FOREIGN KEY (`risk_profile_id`)
    REFERENCES `risk_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_portfolio_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `employer_match`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `employer_match` ;

CREATE TABLE IF NOT EXISTS `employer_match` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `asset_id` INT(11) NOT NULL,
  `bottom_threshold` INT(11) NOT NULL,
  `top_threshold` INT(11) NOT NULL,
  `matching_percent` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_employer_match_portfolio1_idx` (`asset_id` ASC),
  CONSTRAINT `fk_employer_match_portfolio1`
    FOREIGN KEY (`asset_id`)
    REFERENCES `asset` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `user_profile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_profile` ;

CREATE TABLE IF NOT EXISTS `user_profile` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NULL,
  `retirement_age` INT(11) NULL DEFAULT '67',
  `life_expectancy` INT(11) NULL DEFAULT '86',
  `percent_income` INT(11) NULL DEFAULT '80',
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `dob` DATE NOT NULL,
  `income` INT(11) NOT NULL,
  `pay_period` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_profile_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_profile_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE = '';
DROP USER IF EXISTS retire@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'retire'@'localhost' IDENTIFIED BY 'retire';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'retire'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `vehicle`
-- -----------------------------------------------------
START TRANSACTION;
USE `retiredb`;
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (1, 'Stocks', 0, 1, NULL, 0, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (2, 'Bonds', 0, 1, NULL, 0, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (3, 'Savings', 0, 1, NULL, 0, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (4, 'Annuity', 0, 0, NULL, 0, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (5, 'Traditional IRA', 1, 0, 7000, 1, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (6, 'Roth Ira', 1, 0, 7000, 0, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (7, '457B', 1, 0, 25000, 1, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (8, '401K', 1, 0, 25000, 1, 1, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (9, '401A', 1, 0, 25000, 1, 1, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (10, '403B', 1, 0, 25000, 1, 1, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (11, '457', 0, 0, 25000, 1, 1, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (12, 'Investment Property', 0, 1, NULL, 0, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (13, 'Non Qualified', 0, 0, NULL, 0, 1, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (14, 'Profit Sharing', 0, 0, NULL, 0, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (15, 'Money Purchase', 0, 0, NULL, 0, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (16, 'Mutual Fund', 0, 0, NULL, 0, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (17, 'TSP', 1, 0, NULL, 1, 0, NULL);
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`, `compounding_periods`) VALUES (18, 'Other', 0, 0, NULL, 0, 0, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `risk_profile`
-- -----------------------------------------------------
START TRANSACTION;
USE `retiredb`;
INSERT INTO `risk_profile` (`id`, `name`, `description`, `ror`) VALUES (1, 'convservative', 'low risk - low reward', 4);
INSERT INTO `risk_profile` (`id`, `name`, `description`, `ror`) VALUES (2, 'moderately_conservative', 'low to medium risk - low to medium risk', 5);
INSERT INTO `risk_profile` (`id`, `name`, `description`, `ror`) VALUES (3, 'moderate', 'medium risk - medium reward', 6);
INSERT INTO `risk_profile` (`id`, `name`, `description`, `ror`) VALUES (4, 'moderately_aggressive', 'medium to high risk - medium to high return', 7);
INSERT INTO `risk_profile` (`id`, `name`, `description`, `ror`) VALUES (5, 'aggressive', 'high risk - high return', 8);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `retiredb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (1, 'laurenceF', 'laurence', 'laurence@aol.com', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (2, 'kd', 'kelly', 'kelly@gmail.com', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (3, 'adam', '$2a$10$UJb.HtIXHk8cwKKdtgEprO/loqqaQkMd.NToI/68L647GMh2K5dOu', 'adam@adam.com  ', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (4, 'JTurner', 'jacob', 'jacob@yahoo.com', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (5, 'LeslieHunts', 'leslie', 'leslie@gmail.com', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (6, 'MrFitch', 'marcus', 'marcus@yahoo.com', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (7, 'Jess', 'jessica', 'jessica@aol.com', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (8, 'MPerez10', 'monica', 'monica@gmail.com', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (9, 'DD4', 'dion', 'dion@aol.com', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (10, 'Moss', 'alexander', 'alexander@gmail.com', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (11, 'user', '$2a$10$qXOl2X/57LVg3L9zZY1fauvBCu9WXjfe6dES3mAf/9mtP1e9txHRy', 'user@user.com', 'user', DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `asset`
-- -----------------------------------------------------
START TRANSACTION;
USE `retiredb`;
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (1, NULL, 1, 1, 10000, 1000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (2, 5, 9, 2, 50000, NULL, 5, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (3, NULL, 1, 2, 15000, 2000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (4, NULL, 13, 3, 20000, 1500, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (5, NULL, 10, 3, 40000, 2000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (6, NULL, 14, 4, 16000, 4000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (7, NULL, 11, 4, 90000, 8000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (8, NULL, 4, 4, 120000, 13000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (9, NULL, 15, 5, 70000, 10000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (10, NULL, 10, 5, 180000, NULL, 15, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (11, NULL, 5, 6, 375000, NULL, 10, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (12, NULL, 8, 6, 250000, NULL, 5, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (13, 3, 3, 6, 150000, 12000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (14, NULL, 5, 7, 90000, 13000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (15, NULL, 8, 7, 110000, NULL, 8, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (16, 5, 12, 7, 50000, 2000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (17, NULL, 5, 8, 60000, 1500, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (18, NULL, 8, 8, 22000, NULL, 6, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (19, NULL, 16, 8, 100000, NULL, 4, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (20, NULL, 6, 9, 170000, 12000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (21, NULL, 10, 9, 27500, NULL, 8, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (22, NULL, 18, 9, 320000, 22000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (23, NULL, 6, 10, 250000, NULL, 5, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (24, NULL, 10, 10, 400000, 30000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (25, 2, 2, 10, 525000, 10000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (26, 5, 1, 10, 340000, 10000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (27, 1, 1, 10, 250000, 20000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (28, 5, 1, 3, 75000, 10000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (29, NULL, 8, 3, 250000, NULL, 5, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (30, 1, 2, 3, 50000, NULL, 2, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (31, NULL, 5, 3, 225000, 20000, NULL, DEFAULT);
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`, `periodic_deposit`) VALUES (32, 1, 3, 3, 35000, 35000, NULL, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `employer_match`
-- -----------------------------------------------------
START TRANSACTION;
USE `retiredb`;
INSERT INTO `employer_match` (`id`, `asset_id`, `bottom_threshold`, `top_threshold`, `matching_percent`) VALUES (1, 1, 0, 3, 100);
INSERT INTO `employer_match` (`id`, `asset_id`, `bottom_threshold`, `top_threshold`, `matching_percent`) VALUES (2, 1, 3, 5, 50);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_profile`
-- -----------------------------------------------------
START TRANSACTION;
USE `retiredb`;
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (1, 1, 75, 86, 80, 'Laurence', 'Fisher', '1967-01-28', 80000, 'bi-weekly');
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (2, 2, 72, 88, 75, 'Kelly', 'Day', '1975-03-22', 85000, 'monthly');
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (3, 3, 78, 82, 90, 'Adam', 'Crawford', '1987-01-09', 83000, 'bi-weekly');
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (4, 4, 69, 80, 83, 'Jacob', 'Turner', '1980-07-15', 70000, 'weekly');
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (5, 5, 71, 84, 85, 'Leslie', 'Hunter', '1978-03-11', 71000, 'bi-weekly');
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (6, 6, 55, 88, 90, 'Marcus', 'Fitch', '1985-12-22', 140000, 'monthly');
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (7, 7, 63, 84, 80, 'Jessica', 'Alexander', '1990-10-28', 90000, 'bi-weekly');
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (8, 8, 66, 80, 65, 'Monica', 'Perez', '1991-05-22', 100000, 'monthly');
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (9, 9, 58, 88, 70, 'Dion', 'Davis', '1979-09-04', 110000, 'bi-weekly');
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (10, 10, 68, 83, 95, 'Alexander', 'Moss', '1965-10-10', 95000, 'monthly');
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (11, 11, 69, 85, 90, 'user', 'name', '1995-12-01', 100000, 'bi-weekly');

COMMIT;

