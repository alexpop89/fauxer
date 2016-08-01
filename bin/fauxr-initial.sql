-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fauxr-errors
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fauxr-errors
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fauxr-errors` DEFAULT CHARACTER SET utf8 ;
USE `fauxr-errors` ;

-- -----------------------------------------------------
-- Table `fauxr-errors`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fauxr-errors`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fauxr-errors`.`projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fauxr-errors`.`projects` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `hash` VARCHAR(255) NOT NULL,
  `owner` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_1_idx` (`owner` ASC),
  CONSTRAINT `fk_1`
    FOREIGN KEY (`owner`)
    REFERENCES `fauxr-errors`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fauxr-errors`.`locations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fauxr-errors`.`locations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `ipAddress` VARCHAR(255) NOT NULL,
  `countryCode` VARCHAR(255) NULL DEFAULT NULL,
  `regionCode` VARCHAR(255) NULL DEFAULT NULL,
  `regionName` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `zipCode` VARCHAR(255) NULL DEFAULT NULL,
  `timeZone` VARCHAR(255) NULL DEFAULT NULL,
  `latitude` INT(11) NULL DEFAULT NULL,
  `longitude` INT(11) NULL DEFAULT NULL,
  `metro_code` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fauxr-errors`.`errors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fauxr-errors`.`errors` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `message` TEXT NULL DEFAULT NULL,
  `source` TEXT NULL DEFAULT NULL,
  `lineNo` INT(11) NULL DEFAULT NULL,
  `colNo` INT(11) NULL DEFAULT NULL,
  `timestamp` VARCHAR(255) NULL DEFAULT NULL,
  `userAgent` VARCHAR(255) NULL DEFAULT NULL,
  `loadState` INT(11) NULL DEFAULT NULL,
  `stackTrace` TEXT NULL DEFAULT NULL,
  `location` INT(11) NOT NULL,
  `project` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_1_idx` (`project` ASC),
  INDEX `fk_2_idx` (`location` ASC),
  CONSTRAINT `fk_errors_1`
    FOREIGN KEY (`project`)
    REFERENCES `fauxr-errors`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_errors_2`
    FOREIGN KEY (`location`)
    REFERENCES `fauxr-errors`.`locations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `fauxr-errors`.`sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fauxr-errors`.`sessions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `startTimestamp` VARCHAR(255) NOT NULL,
  `user` INT NOT NULL,
  `hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sessions_1_idx` (`user` ASC),
  UNIQUE INDEX `user_UNIQUE` (`user` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `hash_UNIQUE` (`hash` ASC),
  CONSTRAINT `fk_sessions_1`
    FOREIGN KEY (`user`)
    REFERENCES `fauxr-errors`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
