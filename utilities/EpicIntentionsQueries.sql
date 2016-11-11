#INSERT MANDATORY INFO into  STUDENT
INSERT INTO Student
(		first_name,
        last_name,
	    dob,
        startdate,
        phonenum,
        email,
        parentone_name,
        parentone_num,
        parentone_email
)
VALUES
(	'Paul',
	'Dorsch',
	'1997-01-01',
	'2006-02-02',
	'7033406218',
	'paul.dorsch@gmial.com',
	'Grace Dorsch',
	'gld@me.com',
	'7034314906');

#INSERT OPTIONAL INFO into STUDENT
UPDATE Student
SET		parenttwo_name = 'Steve',
        parenttwo_num = '7302239754',
        parenttwo_email = 'stv@me.com'
WHERE
(	id = '1');

#INSERT ALL DATA into USERS
INSERT INTO USERS(username,password)
VALUES('user','password');

#INSERT all data into school
INSERT INTO School
(	school_name,
    school_address,
    school_phone)
VALUES
(	'school name',
	'address',
	'3729384923');

#INSERT Mandaotry Info INTO PREREC
INSERT INTO PreRec
(		pr_sid,
        prev_school_id)
VALUES
(	'1',
	'1');

#INSERT Optional Info INTO PREREC
UPDATE PreRec
SET ms_suspensions = '10',
        hs_suspensions = '13',
        hs_absenses = '3'
WHERE (pr_sid = '1');

#INSERT all data into currentrec
INSERT INTO CurrentRec
(		cr_sid,
        curr_school_id,
        gpa,
        semester,
        credits_earned,
        total_credits,
        grade_level)
VALUES
(	'1',
	'1',
	'3.97',
	'3',
	'15',
	'13',
	'9');

#INSERT mandatory data into semester record
INSERT INTO SemesterRecord
(		sr_sid,
        curr_school_id,
        grades)
VALUES
(	'1',
	'1',
	'grades');

#Insert optional info into semester record
UPDATE SemesterRecord
SET extra_curr = 'grades file'
WHERE sr_sid = '1';

#INSERT all data into survey data
INSERT INTO SurveyData
(	sd_sid,
	surveyXML)
VALUES
(	'1',
	'SurveyResults');


#gets all names, school, gpa, and gradelevel in descending order by last name (A-Z)
SELECT  St.last_name, St.first_name, Sch.school_name, C.gpa, C.grade_level
FROM Student AS St, CurrentRec AS C, school as Sch
WHERE (St.id = C.cr_sid) && (C.curr_school_id = Sch.school_id)
ORDER BY St.last_name DESC;

#gets all names in ascending order by last name
SELECT  last_name, first_name
FROM Student
ORDER BY last_name ASC;

#get student info
SELECT dob, startdate, phonenum, email
FROM Student
WHERE (id = '"/*insert student id string here*/"');

#get parent 1 info
SELECT parentone_name, parentone_num, parentone_email
FROM Student
WHERE (id = '"/*insert student id string here*/"');

#get parent 2 info if exists
SELECT parenttwo_name, parenttwo_num, parenttwo_email
FROM Student
WHERE (id = '"/*insert student id string here*/"') && (!(parenttwo_name IS NULL) && !(parenttwo_num IS NULL) && !(parenttwo_email IS NULL));

#get mandatory pre rec info
SELECT P.pr_sid, Sch.school_name
FROM PreRec AS P, School AS Sch
WHERE (pr_sid = '"/*insert student id string here*/"') && P.prev_school_id = Sch.school_id;

#get optional pre rec info
SELECT ms_suspensions, hs_suspensions, hs_absences
FROM PreRec
WHERE (pr_sid = '"/*insert student id string here*/"') && (!(ms_suspensions IS NULL) && !(hs_suspensions IS NULL) && !(hs_absences IS NULL));

#get current rec info
SELECT Sch.school_name ,C.gpa, C.semester, C.credits_earned, C.total_credits, C.grade_level
FROM CurrentRec AS C, School AS Sch
WHERE (cr_sid = '"/*insert student id string here*/"') && (C.curr_school_id = Sch.school_id);

#get semester record xml
SELECT grades
FROM SemesterRecord
WHERE (sr_sid = '"/*insert student id string here*/"');


#get survey data xml
SELECT surveyXML 
FROM SurveyData
WHERE (sd_sid = '"/*insert student id string here*/"');

#search student by last name, first name, or id
SELECT last_name, first_name, id
FROM Student
WHERE ((id ='"/*insert student id string here*/"') OR 
	(last_name = '"/*insert student name string here*/"') OR
	(first_name = '"/*insert student name string here*/"'));

#search student by current gpa
SELECT S.last_name, S.first_name, S.id, C.gpa
FROM Student as S, CurrentRec as C
WHERE S.id == C.cr_sid
ORDER BY C.gpa DESC;


