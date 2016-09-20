CREATE TABLE Student
	(
		id INTEGER NOT NULL, 
		name VARCHAR(255) NOT NULL, 
		dob DATE NOT NULL, 
		startdate DATE NOT NULL, 
		PRIMARY KEY(id)
	);

CREATE TABLE PreRec(id INTEGER NOT NULL, ms_suspensions INTEGER, hs_suspensions INTEGER, hs_absenses INTEGER, PRIMARY KEY(id));

CREATE TABLE CurrentRec
    (
        id INTEGER NOT NULL,
        gpa DECIMAL(5,2) NOT NULL,
        semester INTEGER NOT NULL,
        credits_earned INTEGER NOT NULL,
        total_credits INTEGER NOT NULL,
        PRIMARY KEY(id)
    );
