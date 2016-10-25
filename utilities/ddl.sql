CREATE TABLE Student
	(
	    id INTEGER NOT NULL,
	    first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
	    dob DATE NOT NULL,
        startdate DATE NOT NULL,
        phonenum INTEGER NOT NULL,
        email VARCHAR(255) NOT NULL,
        parentone_name VARCHAR(255) NOT NULL,
        parentone_num INTEGER NOT NULL,
        parentone_email VARCHAR(255) NOT NULL,
        parenttwo_name VARCHAR(255),
        parenttwo_num INTEGER,
        parenttwo_email VARCHAR(255),
        PRIMARY KEY(id)
	);

CREATE TABLE PreRec
    (
        id INTEGER NOT NULL AUTO_INCREMENT,
        pr_sid INTEGER NOT NULL,
        prev_school VARCHAR(255) NOT NULL,
        ms_suspensions INTEGER,
        hs_suspensions INTEGER,
        hs_absenses INTEGER,
        CONSTRAINT fk_prerec FOREIGN KEY(pr_sid) REFERENCES Student(id),
        CONSTRAINT fk_prerecschool FOREIGN KEY(prev_school) REFERENCES School(school_id),
        PRIMARY KEY(id)
    );

CREATE TABLE CurrentRec
    (
        id INTEGER NOT NULL AUTO_INCREMENT,
        cr_sid INTEGER NOT NULL,
        curr_school VARCHAR(255) NOT NULL,
        gpa DECIMAL(5,2) NOT NULL,
        semester INTEGER NOT NULL,
        credits_earned INTEGER NOT NULL,
        total_credits INTEGER NOT NULL,
        CONSTRAINT fk_currec FOREIGN KEY(cr_sid) REFERENCES Student(id),
        CONSTRAINT fk_currecschool FOREIGN KEY(curr_school) REFERENCES School(school_id),
        PRIMARY KEY(id)
    );

CREATE TABLE SemesterRecord
    (
        id INTEGER NOT NULL AUTO_INCREMENT,
        sr_sid INTEGER NOT NULL,
        curr_school VARCHAR(255) NOT NULL,
        extra_curr TEXT,
        grades TEXT NOT NULL,
        CONSTRAINT fk_semrec FOREIGN KEY(sr_sid) REFERENCES Student(id),
        CONSTRAINT fk_semrecschool FOREIGN KEY(curr_school) REFERENCES School(school_id),
        PRIMARY KEY(id)
    );

CREATE TABLE SurveyData
    (
        id INTEGER NOT NULL AUTO_INCREMENT,
        sd_sid INTEGER NOT NULL,
        surveyXML TEXT NOT NULL,
        CONSTRAINT fk_survey FOREIGN KEY(sd_sid) REFERENCES Student(id),
        PRIMARY KEY(id)
    );

CREATE TABLE School
    (
        school_id INTEGER NOT NULL AUTO_INCREMENT,
        school_name VARCHAR(255) NOT NULL,
        school_address VARCHAR(255),
        school_phone INTEGER,
        PRIMARY KEY(school_id)
    );