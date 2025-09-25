CREATE DATABASE `TapestryGlobalService`;
USE `TapestryGlobalService`;

CREATE TABLE `TBLMExternalApiDetail` (
  `ExternalApiId` INT NOT NULL AUTO_INCREMENT,
  `ApiEndPoint` VARCHAR(255) NOT NULL,
  `Name` VARCHAR(100) NOT NULL,
  `Description` VARCHAR(200) NOT NULL,
  `ApiProvider` VARCHAR(255) NOT NULL,
  `Protocol` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT 'StandardMaster-1: HTTP, 2: HTTPS',
  `CertFileName` VARCHAR(200) DEFAULT NULL,
  `RequestType` TINYINT UNSIGNED DEFAULT NULL COMMENT 'StandardMaster-1: JSON, 2: XML, 3: FORM',
  `HTTPRequestType` INT NOT NULL COMMENT 'StandardMaster-1-GET, 2-POST, 3-PUT, 4-DELETE',
  `Request` BLOB NOT NULL,
  `ValidFromDate` DATETIME DEFAULT NULL,
  `ValidToDate` DATETIME DEFAULT NULL,
  `Visibility` TINYINT UNSIGNED NOT NULL DEFAULT '1',
  `Status` TINYINT UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`ExternalApiId`)
); 

CREATE TABLE `TBLMSystemParameter` (
  `SystemParameterId` int unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Alias` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `Value` text NOT NULL,
  `ValueSourceType` tinyint unsigned NOT NULL,
  `ValueSource` varchar(100) DEFAULT NULL,
  `Validation` varchar(250) DEFAULT NULL,
  `ValidationMessageML` json DEFAULT NULL COMMENT 'This field is used to store the multiple language value in JSON format',
  `ValidFromDate` DATETIME DEFAULT NULL,
  `ValidToDate` DATETIME DEFAULT NULL,
  `Status` tinyint unsigned NOT NULL DEFAULT '0',
  `Visibility` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`SystemParameterId`),
  UNIQUE KEY `UK_Alias` (`Alias`)
);