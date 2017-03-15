CREATE TABLE IF NOT EXISTS USERS
	(
		`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
		`username` VARCHAR(20) NOT NULL,
		`password` CHAR(60) NOT NULL,
		PRIMARY KEY (`id`),
		UNIQUE INDEX `id_UNIQUE` (`id` ASC),
		UNIQUE INDEX `username_UNIQUE` (`username` ASC)
	);

CREATE TABLE IF NOT EXISTS Staff 
    (
      `staff_id` int(11) NOT NULL AUTO_INCREMENT,
      `first_name` varchar(255) NOT NULL,
      `last_name` varchar(255) DEFAULT NULL,
      `phone` varchar(20) DEFAULT NULL,
      `email` varchar(255) DEFAULT NULL,
      PRIMARY KEY (`staff_id`)
    );

CREATE TABLE IF NOT EXISTS Student
	(
	    `id` INTEGER NOT NULL AUTO_INCREMENT,
	    `first_name` VARCHAR(255) NOT NULL,
        `last_name` VARCHAR(255) NOT NULL,
	    `dob` DATE NOT NULL,
	    `gender` TINYINT NOT NULL,
        `startdate` DATE NOT NULL,
        `phonenum` VARCHAR(20) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `parentone_name` VARCHAR(255) NOT NULL,
        `parentone_num` VARCHAR(20) NOT NULL,
        `parentone_email` VARCHAR(255) NOT NULL,
        `parenttwo_name` VARCHAR(255),
        `parenttwo_num` VARCHAR(20),
        `parenttwo_email` VARCHAR(255),
        `cohort` VARCHAR(50),
        `school` VARCHAR(255),
        PRIMARY KEY(`id`)
	);

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

CREATE TABLE IF NOT EXISTS School
    (
        `school_id` INTEGER NOT NULL AUTO_INCREMENT,
        `school_name` VARCHAR(255) NOT NULL,
        `school_address` VARCHAR(255) NOT NULL,
        `school_phone` VARCHAR(20) NOT NULL,
        `principal_name` VARCHAR(255) NOT NULL,
        `principal_phone` VARCHAR(255) NOT NULL,
        `principal_email` VARCHAR(255) NOT NULL,
        `assistant_principal_name` VARCHAR(255),
        `assistant_principal_phone` VARCHAR(20),
        `assistant_principal_email` VARCHAR(255),
        `cohort_coach_name` VARCHAR(255),
        `cohort_coach_phone` VARCHAR(20),
        `cohort_coach_email` VARCHAR(255),
        `ngm_fellow_name` VARCHAR(255),
        `ngm_fellow_phone` VARCHAR(20),
        `ngm_fellow_email` VARCHAR(255),
        `counselor_name` VARCHAR(255),
        `counselor_phone` VARCHAR(20),
        `counselor_email` VARCHAR(255),
        `social_worker_name` VARCHAR(255),
        `social_worker_phone` VARCHAR(20),
        `social_worker_email` VARCHAR(255),
        `data_liason_name` VARCHAR(255),
        `data_liason_phone` VARCHAR(20),
        `data_liason_email` VARCHAR(255),
        `cis_coordinator_name` VARCHAR(255),
        `cis_coordinator_phone` VARCHAR(20),
        `cis_coordinator_email` VARCHAR(255),
        `college_coach_name` VARCHAR(255),
        `college_coach_phone` VARCHAR(20),
        `college_coach_email` VARCHAR(255),
        PRIMARY KEY(`school_id`)
    );

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
