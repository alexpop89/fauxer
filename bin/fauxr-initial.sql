-- MySQL Script generated by MySQL Workbench
-- Tue Jul 26 15:55:58 2016
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

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
DROP TABLE IF EXISTS `fauxr-errors`.`users` ;

CREATE TABLE IF NOT EXISTS `fauxr-errors`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fauxr-errors`.`projects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fauxr-errors`.`projects` ;

CREATE TABLE IF NOT EXISTS `fauxr-errors`.`projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `hash` VARCHAR(255) NOT NULL,
  `owner` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_1_idx` (`owner` ASC),
  CONSTRAINT `fk_1`
    FOREIGN KEY (`owner`)
    REFERENCES `fauxr-errors`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fauxr-errors`.`locations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fauxr-errors`.`locations` ;

CREATE TABLE IF NOT EXISTS `fauxr-errors`.`locations` (
  `id` INT NOT NULL,
  `ipAddress` VARCHAR(255) NOT NULL,
  `countryCode` VARCHAR(255) NULL,
  `regionCode` VARCHAR(255) NULL,
  `regionName` VARCHAR(255) NULL,
  `city` VARCHAR(255) NULL,
  `zipCode` VARCHAR(255) NULL,
  `timeZone` VARCHAR(255) NULL,
  `latitude` INT NULL,
  `longitude` INT NULL,
  `metro_code` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fauxr-errors`.`errors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fauxr-errors`.`errors` ;

CREATE TABLE IF NOT EXISTS `fauxr-errors`.`errors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` TEXT NULL,
  `source` TEXT NULL,
  `lineNo` INT NULL,
  `colNo` INT NULL,
  `timestamp` VARCHAR(255) NULL,
  `userAgent` VARCHAR(255) NULL,
  `loadState` INT NULL,
  `stackTrace` TEXT NULL,
  `location` INT NOT NULL,
  `project` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_1_idx` (`project` ASC),
  INDEX `fk_2_idx` (`location` ASC),
  CONSTRAINT `fk_1`
    FOREIGN KEY (`project`)
    REFERENCES `fauxr-errors`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_2`
    FOREIGN KEY (`location`)
    REFERENCES `fauxr-errors`.`locations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;