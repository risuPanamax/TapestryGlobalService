CREATE DATABASE `TapestryGlobalService`;
USE `TapestryGlobalService`;

CREATE TABLE `TBLMExternalApiDetail` (
  `ExternalApiId` int NOT NULL AUTO_INCREMENT,
  `ApiEndPoint` varchar(255) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `ApiProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'StandardMaster: API Provider - 1: OpenTurf',
  `Protocol` tinyint unsigned NOT NULL DEFAULT '1' COMMENT 'StandardMaster: Protocol -1: HTTP, 2: HTTPS',
  `CertFileName` varchar(200) DEFAULT NULL,
  `RequestType` tinyint unsigned DEFAULT NULL COMMENT 'StandardMaster: Request Type -1: JSON, 2: XML, 3: FORM',
  `HTTPRequestType` int NOT NULL COMMENT 'StandardMaster: HTTP Request Type -1: GET, 2: POST, 3: PUT, 4: DELETE',
  `Request` blob NOT NULL,
  `ValidFromDate` datetime DEFAULT NULL,
  `ValidToDate` datetime DEFAULT NULL,
  `Visibility` tinyint unsigned NOT NULL DEFAULT '1',
  `Status` tinyint unsigned NOT NULL DEFAULT '0',
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
  `ValidFromDate` datetime DEFAULT NULL,
  `ValidToDate` datetime DEFAULT NULL,
  `Status` tinyint unsigned NOT NULL DEFAULT '0',
  `Visibility` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`SystemParameterId`),
  UNIQUE KEY `UK_Alias` (`Alias`)
);

CREATE TABLE `TBLMStandardMaster` (
  `MasterTypeId` int unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `UID` varchar(255) NOT NULL,
  `Status` tinyint unsigned NOT NULL DEFAULT '0',
  `Visibility` tinyint unsigned NOT NULL DEFAULT '1',
  `ValidFromDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ValidToDate` timestamp NOT NULL DEFAULT '2035-12-31 23:59:59',
  PRIMARY KEY (`MasterTypeId`),
  UNIQUE KEY `ExternalId` (`UID`)
);

CREATE TABLE `TBLMStandardMasterDetail` (
  `MasterDetailId` int unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `DisplayName` varchar(255) NOT NULL,
  `DisplayNameML` json DEFAULT NULL COMMENT 'This field is used to store the multiple language value in json format',
  `UID` varchar(255) NOT NULL,
  `Value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `MasterTypeId` int unsigned NOT NULL,
  `Status` tinyint unsigned NOT NULL DEFAULT '0',
  `Visibility` tinyint unsigned NOT NULL DEFAULT '1',
  `ValidFromDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ValidToDate` timestamp NOT NULL DEFAULT '2035-12-31 23:59:59',
  PRIMARY KEY (`MasterDetailId`),
  UNIQUE KEY `ExternalId` (`UID`),
  KEY `TBLMStandardMasterDetail_MasterTypeId` (`MasterTypeId`),
  CONSTRAINT `TBLMStandardMasterDetail_MasterTypeId` FOREIGN KEY (`MasterTypeId`) REFERENCES `TBLMStandardMaster` (`MasterTypeId`)
);