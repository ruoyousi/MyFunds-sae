DROP TABLE IF EXISTS `fundcompany`;
CREATE TABLE  `fundcompany` (
  `CompanyId` int(10) unsigned NOT NULL,
  `CompanyName` varchar(256) NOT NULL,
  `Website` varchar(256) DEFAULT NULL,
  `Telephone` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`CompanyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `fundproduct`;
CREATE TABLE  `fundproduct` (
  `ProductId` varchar(6) NOT NULL,
  `ProductName` varchar(256) NOT NULL,
  `CompanyId` int(10) unsigned NOT NULL,
  `CreateDate` date DEFAULT NULL,
  `FundType` int(10) unsigned DEFAULT NULL,
  `FundStatus` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `fundearning`;
CREATE TABLE  `fundearning` (
  `ProductId` varchar(6) NOT NULL,
  `ProductName` varchar(256) NOT NULL,
  `CompanyId` int(10) unsigned NOT NULL,
  `TheDate` date NOT NULL,
  `Value` decimal(8,4) DEFAULT NULL,
  `Accumulation` decimal(8,4) DEFAULT NULL,
  `LastWeekEarningRate` decimal(8,4) DEFAULT NULL,
  `LastMonthEarningRate` decimal(8,4) DEFAULT NULL,
  `Last3MonthEarningRate` decimal(8,4) DEFAULT NULL,
  `LastHalfYearEarningRate` decimal(8,4) DEFAULT NULL,
  `LastYearEarningRate` decimal(8,4) DEFAULT NULL,
  `Last2YearEarningRate` decimal(8,4) DEFAULT NULL,
  `Last3YearEarningRate` decimal(8,4) DEFAULT NULL,
  `ThisYearEarningRate` decimal(8,4) DEFAULT NULL,
  `FromCreateEarningRate` decimal(8,4) DEFAULT NULL,
  `FundType` int(10),
  `FundStatus` int(10),
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `fundvalue`;
CREATE TABLE  `fundvalue` (
  `ProductId` varchar(6) NOT NULL,
  `TheDate` date NOT NULL,
  `ProductName` varchar(256) NOT NULL,
  `CompanyId` int(10) unsigned NOT NULL,
  `Value` decimal(8,4) DEFAULT NULL,
  `Dividend` decimal(8,4) DEFAULT NULL,
  `Accumulation` decimal(8,4) DEFAULT NULL,
  `LastDate` date ,
  `LastValue` Decimal (8,4),
  `EarningRate` Decimal (8,4),
  PRIMARY KEY (`ProductId`,`TheDate`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

