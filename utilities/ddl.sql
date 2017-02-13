CREATE TABLE IF NOT EXISTS `staff`(
    `staff_id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `phone` varchar(20) NOT NULL,
    `email` varchar(255) NOT NULL,
    `date_modified` DATE,
    `user_modified` INT,
    PRIMARY KEY (`staff_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


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


CREATE TABLE IF NOT EXISTS `student`(
    `student_id` int(11)  NOT NULL AUTO_INCREMENT,
    `cohort_id` int(11) NOT NULL,
    `student_first_name` VARCHAR(255) NOT NULL,
    `student_last_name` VARCHAR(255) NOT NULL,
    `student_dob` DATE NOT NULL,
    `student_start_date` DATE NOT NULL,
    `student_phone` VARCHAR(20) NOT NULL,
    `student_email` VARCHAR(255) NOT NULL,
    `guardian_one_name` VARCHAR(255) NOT NULL,
    `guardian_one_email` VARCHAR(255) NOT NULL,
    `guardian_one_phone` VARCHAR(20) NOT NULL,
    `guardian_two_name` VARCHAR(255) NOT NULL,
    `guardian_two_email` VARCHAR(255) NOT NULL,
    `guardian_two_phone` VARCHAR(20) NOT NULL,
    `middleschool_absences` INT NOT NULL,
    `highschool_absences` INT NOT NULL,
    `highschool_suspensions` INT NOT NULL,
    `cumulative_gpa` DECIMAL(5,2) NOT NULL,
    `total_credits_earned` INT NOT NULL,
    `date_modified` DATE,
    `user_modified` INT,
    CONSTRAINT `fk_cohort` FOREIGN KEY(`cohort_id`) REFERENCES `cohort`(`cohort_id`),
    PRIMARY KEY(`student_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `semester_record`(
    `semester_record_id` int(11) NOT NULL AUTO_INCREMENT,
    `student_id` int(11) NOT NULL,
    `number_as` INT NOT NULL,
    `number_bs` INT NOT NULL,
    `number_cs` INT NOT NULL,
    `number_ds` INT NOT NULL,
    `semester_gpa` DECIMAL(5,2) NOT NULL,
    `semester_credits` INT NOT NULL,
    `date_modified` DATE NOT NULL,
    `user_modified` INT NOT NULL,
    CONSTRAINT `fk_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
    PRIMARY KEY(`semester_record_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `survey`(
    `survey_id` int(11) NOT NULL AUTO_INCREMENT,
    `survey_name` varchar(45) NOT NULL,
    `date_modified` DATE NOT NULL,
    `user_modified` INT NOT NULL,
    PRIMARY KEY(`survey_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `survey_category`(
    `survey_category_id` int(11) NOT NULL AUTO_INCREMENT,
    `survey_id` int(11) NOT NULL,
    `survey_category_name` varchar(45) NOT NULL,
    `date_modified` DATE NOT NULL,
    `user_modified` INT NOT NULL,
    CONSTRAINT `fk_survey` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`),
    PRIMARY KEY(`survey_category_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
 
