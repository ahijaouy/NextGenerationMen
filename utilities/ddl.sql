CREATE TABLE IF NOT EXISTS `users` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `nickname` VARCHAR(20) NOT NULL, `email` VARCHAR(255) NOT NULL, `password` CHAR(60) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), UNIQUE INDEX `username_UNIQUE` (`nickname` ASC));

CREATE TABLE IF NOT EXISTS Staff 
    (
      `staff_id` int(11) NOT NULL AUTO_INCREMENT,
      `first_name` varchar(255) NOT NULL,
      `last_name` varchar(255) DEFAULT NULL,
      `phone` varchar(20) DEFAULT NULL,
      `email` varchar(255) DEFAULT NULL,

CREATE TABLE IF NOT EXISTS `school`(
    `school_id` int(11) NOT NULL AUTO_INCREMENT,
    `school_name` VARCHAR(255) NOT NULL,
    `school_address` VARCHAR(255),
    `school_phone` VARCHAR(20),
    `principle_name` VARCHAR(255),
    `principle_phone` VARCHAR(255),
    `date_modified` DATE,
    `user_modified` INT,
    PRIMARY KEY(`school_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cohort`(
    `cohort_id` int(11) NOT NULL AUTO_INCREMENT,
    `school_id` int(11) NOT NULL,
    `cohort_year` INTEGER,
    `date_modified` DATE,
    `user_modified` INT,
    CONSTRAINT `fk_school_id` FOREIGN KEY(`school_id`) REFERENCES `school`(`school_id`),
    PRIMARY KEY(`cohort_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS Staff
	(
	    `id` INTEGER NOT NULL AUTO_INCREMENT,
		`school_id` INTEGER NOT NULL,
	    `first_name` VARCHAR(255) NOT NULL,
        `last_name` VARCHAR(255) NOT NULL,
	    `dob` DATE NOT NULL,
        `startdate` DATE NOT NULL,
        `phonenum` VARCHAR(20) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
		PRIMARY KEY(`id`),
		CONSTRAINT fk_prerecschool FOREIGN KEY(`school_id`) REFERENCES School(`school_id`)
	);

CREATE TABLE IF NOT EXISTS `student`(
    `student_id` int(11)  NOT NULL AUTO_INCREMENT,
    `cohort_id` int(11) NOT NULL,
    `student_first_name` VARCHAR(255) NOT NULL,
    `student_last_name` VARCHAR(255) NOT NULL,
    `student_dob` DATE NOT NULL,
    `student_gender` VARCHAR(15) NOT NULL,
    `student_start_date` DATE NOT NULL,
    `student_phone` VARCHAR(20) NOT NULL,
    `student_email` VARCHAR(255) NOT NULL,
    `guardian_one_name` VARCHAR(255) NOT NULL,
    `guardian_one_email` VARCHAR(255) NOT NULL,
    `guardian_one_phone` VARCHAR(20) NOT NULL,
    `guardian_two_name` VARCHAR(255) NOT NULL,
    `guardian_two_email` VARCHAR(255) NOT NULL,
    `guardian_two_phone` VARCHAR(20) NOT NULL,
    `middleschool_absences` TINYINT NOT NULL,
    `highschool_absences` TINYINT NOT NULL,
    `highschool_suspensions` TINYINT NOT NULL,
    `cumulative_gpa` DECIMAL(5,2) NOT NULL,
    `total_credits_earned` INT NOT NULL,
    `date_modified` DATE,
    `user_modified` INT,
    CONSTRAINT `fk_cohort` FOREIGN KEY(`cohort_id`) REFERENCES `cohort`(`cohort_id`),
    PRIMARY KEY(`student_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS PreRec
    (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `pr_sid` INTEGER NOT NULL,
        `prev_school_id` INTEGER NOT NULL,
        `ms_suspensions` INTEGER,
        `hs_suspensions` INTEGER,
        `hs_absences` INTEGER,
        CONSTRAINT fk_prerec FOREIGN KEY(`pr_sid`) REFERENCES Student(`id`),
        CONSTRAINT fk_prerecschool FOREIGN KEY(`prev_school_id`) REFERENCES School(`school_id`),
        PRIMARY KEY(`id`)
    );

CREATE TABLE IF NOT EXISTS CurrentRec
    (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `cr_sid` INTEGER NOT NULL,
        `curr_school_id` INTEGER NOT NULL,
        `gpa` DECIMAL(5,2) NOT NULL,
        `semester` INTEGER NOT NULL,
        `credits_earned` INTEGER NOT NULL,
        `total_credits` INTEGER NOT NULL,
        `grade_level` INTEGER NOT NULL,
        CONSTRAINT fk_currec FOREIGN KEY(`cr_sid`) REFERENCES Student(`id`),
        CONSTRAINT fk_currecschool FOREIGN KEY(`curr_school_id`) REFERENCES School(`school_id`),
        PRIMARY KEY(`id`)
    );

CREATE TABLE IF NOT EXISTS SemesterRecord
    (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `sr_sid` INTEGER NOT NULL,
        `curr_school_id` INTEGER NOT NULL,
        `extra_curr` TEXT,
        `grades` TEXT NOT NULL,
        CONSTRAINT fk_semrec FOREIGN KEY(`sr_sid`) REFERENCES Student(`id`),
        CONSTRAINT fk_semrecschool FOREIGN KEY(`curr_school_id`) REFERENCES School(`school_id`),
        PRIMARY KEY(`id`)
    );

CREATE TABLE IF NOT EXISTS SurveyData
    (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `sd_sid` INTEGER NOT NULL,
        `surveyXML` TEXT NOT NULL,
        CONSTRAINT fk_survey FOREIGN KEY(`sd_sid`) REFERENCES Student(`id`),
        PRIMARY KEY(`id`)
    );

CREATE TABLE IF NOT EXISTS `survey_question`(
    `survey_question_id` int(11) NOT NULL AUTO_INCREMENT,
    `survey_category_id` int(11) NOT NULL,
    `question` varchar(255) NOT NULL,
    `question_negated` TINYINT NOT Null,
    `date_modified` DATE NOT NULL,
    `user_modified` INT NOT NULL,
    CONSTRAINT `fk_survey_category` FOREIGN KEY (`survey_category_id`) REFERENCES `survey_category` (`survey_category_id`),
    PRIMARY KEY(`survey_question_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `survey_response`(
    `survey_response_id` int(11) NOT NULL AUTO_INCREMENT,
    `survey_question_id` int(11) NOT NULL,
    `semester_record_id` int(11) NOT NULL,
    `response` TINYINT NOT Null,
    `date_modified` DATE NOT NULL,
    `user_modified` INT NOT NULL,
    CONSTRAINT `fk_survey_question` FOREIGN KEY (`survey_question_id`) REFERENCES `survey_question` (`survey_question_id`),
    CONSTRAINT `fk_semester_record` FOREIGN KEY (`semester_record_id`) REFERENCES `semester_record` (`semester_record_id`),
    PRIMARY KEY(`survey_response_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
