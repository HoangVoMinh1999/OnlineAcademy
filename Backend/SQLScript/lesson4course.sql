CREATE TABLE `lessons4course` (
  `id` int NOT NULL,
  `course_id` int NOT NULL,
  `title` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `content` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `Log_CreatedDate` datetime DEFAULT NULL,
  `Log_CreatedBy` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Log_UpdatedDate` datetime DEFAULT NULL,
  `Log_UpdatedBy` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`,`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
