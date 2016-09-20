CREATE TABLE Student
	(
	    id INTEGER NOT NULL,
	    name VARCHAR(255) NOT NULL,
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
        ms_suspensions INTEGER,
        hs_suspensions INTEGER,
        hs_absenses INTEGER,
        CONSTRAINT fk_prerec FOREIGN KEY(pr_sid) REFERENCES Student(id),
        PRIMARY KEY(id)
    );

CREATE TABLE CurrentRec
    (
        id INTEGER NOT NULL,
        cr_sid INTEGER NOT NULL,
        gpa DECIMAL(5,2) NOT NULL,
        semester INTEGER NOT NULL,
        credits_earned INTEGER NOT NULL,
        total_credits INTEGER NOT NULL,
        CONSTRAINT fk_currec FOREIGN KEY(cr_sid) REFERENCES Student(id),
        PRIMARY KEY(id)
    );
CREATE TABLE SemesterRecord
    (
        id INTEGER NOT NULL AUTO_INCREMENT,
        extra_curr TEXT,
        grades TEXT NOT NULL,
        PRIMARY KEY(id)
    );

