CREATE TABLE `studentinclass` (
  `student_id` int NOT NULL,
  `course_id` int NOT NULL,
  `process` float DEFAULT NULL,
  `IsDeted` bit(1) NOT NULL DEFAULT b'0',
  `Log_CreatedDate` datetime DEFAULT NULL,
  `Log_CreatedBy` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Log_UpdatedDate` datetime DEFAULT NULL,
  `Log_UpdatedBy` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`student_id`,`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
