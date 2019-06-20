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
  `vehicle_id` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `ror` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_risk_profile_vehicle1_idx` (`vehicle_id` ASC),
  CONSTRAINT `fk_risk_profile_vehicle1`
    FOREIGN KEY (`vehicle_id`)
    REFERENCES `vehicle` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `risk_profile_id` INT(11) NOT NULL,
  `vehicle_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `amount` DECIMAL(10,0) NOT NULL,
  `contribution_fixed` DECIMAL(10,0) NULL DEFAULT NULL,
  `contribution_percent` INT(11) NULL DEFAULT NULL,
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
  `user_id` INT(11) NOT NULL,
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
INSERT INTO `vehicle` (`id`, `asset_name`, `is_qualified`, `is_fixed`, `max_contribution`, `is_pretax`, `has_employer_match`) VALUES (1, 'stocks', 0, 1, NULL, 0, 0);

COMMIT;


-- -----------------------------------------------------
-- Data for table `risk_profile`
-- -----------------------------------------------------
START TRANSACTION;
USE `retiredb`;
INSERT INTO `risk_profile` (`id`, `vehicle_id`, `name`, `description`, `ror`) VALUES (1, 1, 'convservative', 'low risk - low reward', 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `retiredb`;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (1, 'smithy', 'smithy', 'jsmithy@smith', 'user', 1);
INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`, `enabled`) VALUES (2, 'grettle', 'grettle', 'grettle@grettle', 'user', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `asset`
-- -----------------------------------------------------
START TRANSACTION;
USE `retiredb`;
INSERT INTO `asset` (`id`, `risk_profile_id`, `vehicle_id`, `user_id`, `amount`, `contribution_fixed`, `contribution_percent`) VALUES (1, 1, 1, 1, 50000, 5000, 5);

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
INSERT INTO `user_profile` (`id`, `user_id`, `retirement_age`, `life_expectancy`, `percent_income`, `first_name`, `last_name`, `dob`, `income`, `pay_period`) VALUES (1, 1, 75, 86, 80, 'John', 'Smith', '1967-01-28', 80000, 'bi-weekly');

COMMIT;

