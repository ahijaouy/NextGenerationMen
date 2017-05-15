CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `school` (
  `school_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_name` varchar(255) NOT NULL,
  `school_address` varchar(255) NOT NULL,
  `school_phone` varchar(20) NOT NULL,
  `principal_name` varchar(255) NOT NULL,
  `principal_phone` varchar(255) NOT NULL,
  `principal_email` varchar(255) NOT NULL,
  `assistant_principal_name` varchar(255) DEFAULT NULL,
  `assistant_principal_phone` varchar(20) DEFAULT NULL,
  `assistant_principal_email` varchar(255) DEFAULT NULL,
  `cohort_coach_name` varchar(255) DEFAULT NULL,
  `cohort_coach_phone` varchar(20) DEFAULT NULL,
  `cohort_coach_email` varchar(255) DEFAULT NULL,
  `ngm_fellow_name` varchar(255) DEFAULT NULL,
  `ngm_fellow_phone` varchar(20) DEFAULT NULL,
  `ngm_fellow_email` varchar(255) DEFAULT NULL,
  `counselor_name` varchar(255) DEFAULT NULL,
  `counselor_phone` varchar(20) DEFAULT NULL,
  `counselor_email` varchar(255) DEFAULT NULL,
  `social_worker_name` varchar(255) DEFAULT NULL,
  `social_worker_phone` varchar(20) DEFAULT NULL,
  `social_worker_email` varchar(255) DEFAULT NULL,
  `data_liason_name` varchar(255) DEFAULT NULL,
  `data_liason_phone` varchar(20) DEFAULT NULL,
  `data_liason_email` varchar(255) DEFAULT NULL,
  `cis_coordinator_name` varchar(255) DEFAULT NULL,
  `cis_coordinator_phone` varchar(20) DEFAULT NULL,
  `cis_coordinator_email` varchar(255) DEFAULT NULL,
  `college_coach_name` varchar(255) DEFAULT NULL,
  `college_coach_phone` varchar(20) DEFAULT NULL,
  `college_coach_email` varchar(255) DEFAULT NULL,
  `date_modified` date DEFAULT NULL,
  `user_modified` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`school_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

CREATE TABLE `cohort` (
  `cohort_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `cohort_year` int(11) DEFAULT NULL,
  `date_modified` date DEFAULT NULL,
  `user_modified` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cohort_id`),
  KEY `fk_school_id` (`school_id`),
  CONSTRAINT `fk_school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `student_first_name` varchar(255) NOT NULL,
  `student_last_name` varchar(255) NOT NULL,
  `student_dob` date DEFAULT NULL,
  `student_gender` varchar(15) DEFAULT NULL,
  `student_start_date` date DEFAULT NULL,
  `student_phone` varchar(20) DEFAULT NULL,
  `student_email` varchar(255) DEFAULT NULL,
  `guardian_one_name` varchar(255) DEFAULT NULL,
  `guardian_one_email` varchar(255) DEFAULT NULL,
  `guardian_one_phone` varchar(255) DEFAULT NULL,
  `guardian_two_name` varchar(255) DEFAULT NULL,
  `guardian_two_email` varchar(255) DEFAULT NULL,
  `guardian_two_phone` varchar(20) DEFAULT NULL,
  `middleschool_suspensions` tinyint(4) DEFAULT NULL,
  `highschool_absences` tinyint(4) DEFAULT NULL,
  `highschool_suspensions` tinyint(4) DEFAULT NULL,
  `cumulative_gpa` decimal(5,2) DEFAULT NULL,
  `total_credits_earned` int(11) DEFAULT NULL,
  `date_modified` date DEFAULT NULL,
  `user_modified` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `fk_cohort` (`cohort_id`),
  CONSTRAINT `fk_cohort` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99855 DEFAULT CHARSET=utf8;

CREATE TABLE `semester_record` (
  `semester_record_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `number_as` int(11) NOT NULL,
  `number_bs` int(11) NOT NULL,
  `number_cs` int(11) NOT NULL,
  `number_ds` int(11) NOT NULL,
  `semester_number` varchar(45) NOT NULL,
  `grade` varchar(45) NOT NULL,
  `semester_gpa` decimal(5,2) NOT NULL,
  `semester_credits` int(11) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` varchar(45) NOT NULL,
  PRIMARY KEY (`semester_record_id`),
  KEY `fk_student` (`student_id`),
  CONSTRAINT `fk_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `attendance_record` (
  `attendance_record_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `classes_missed` int(11) DEFAULT NULL,
  `days_missed` int(11) DEFAULT NULL,
  `suspensions` int(11) DEFAULT NULL,
  `semester_number` varchar(45) NOT NULL,
  `grade` varchar(45) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` varchar(45) NOT NULL,
  PRIMARY KEY (`attendance_record_id`),
  KEY `fk_student2` (`student_id`),
  CONSTRAINT `fk_student2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `survey` (
  `survey_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_name` varchar(45) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` varchar(45) NOT NULL,
  PRIMARY KEY (`survey_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `survey_record` (
  `survey_record_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `survey_id` int(11) NOT NULL,
  `date_surveyed` date NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` varchar(45) NOT NULL,
  PRIMARY KEY (`survey_record_id`),
  KEY `fk_student3` (`student_id`),
  KEY `fk_survey2` (`survey_id`),
  CONSTRAINT `fk_student3` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_survey2` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `survey_category` (
  `survey_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_id` int(11) NOT NULL,
  `survey_category_name` varchar(45) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` varchar(45) NOT NULL,
  PRIMARY KEY (`survey_category_id`),
  KEY `fk_survey` (`survey_id`),
  CONSTRAINT `fk_survey` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `survey_question` (
  `survey_question_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_category_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `question_negated` tinyint(4) NOT NULL,
  `max_score` tinyint(4) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` varchar(45) NOT NULL,
  PRIMARY KEY (`survey_question_id`),
  KEY `fk_survey_category` (`survey_category_id`),
  CONSTRAINT `fk_survey_category` FOREIGN KEY (`survey_category_id`) REFERENCES `survey_category` (`survey_category_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `survey_response` (
  `survey_response_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_question_id` int(11) NOT NULL,
  `survey_record_id` int(11) NOT NULL,
  `response` tinyint(4) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` varchar(45) NOT NULL,
  PRIMARY KEY (`survey_response_id`),
  KEY `fk_survey_question` (`survey_question_id`),
  KEY `fk_survey_record` (`survey_record_id`),
  CONSTRAINT `fk_survey_question` FOREIGN KEY (`survey_question_id`) REFERENCES `survey_question` (`survey_question_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_survey_record` FOREIGN KEY (`survey_record_id`) REFERENCES `survey_record` (`survey_record_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
