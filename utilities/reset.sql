DROP TABLE staff;
DROP TABLE survey_response;
DROP TABLE survey_qestion;
DROP TABLE survey_category;
DROP TABLE survey;
DROP TABLE semester_record;
DROP TABLE student;
DROP TABLE cohort;
DROP TABLE school;

# BEGINNING OF DDL
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
# END OF DDL

# BEGINNING OF SEED DATA

# Schools
INSERT INTO school VALUES (1,"School1","321 Sunny Lane","3211231234","Johnathan Smith","3214561234",Now(),1);
INSERT INTO school VALUES (2,"School2","213 Sunny Lane","2131231234","Jonathan Smith","2134561234",Now(), 1);
INSERT INTO school VALUES (3,"School3","123 Sunny Lane","1231231234","John Smith","1234561234",Now(),1);

#Cohorts
INSERT INTO cohort VALUES (1,(SELECT school_id from school where school_id=1),2017,Now(),1);
INSERT INTO cohort VALUES (2,(SELECT school_id from school where school_id=2),2017,Now(),1);
INSERT INTO cohort VALUES (3,(SELECT school_id from school where school_id=3),2017,Now(),1);

#School 1
INSERT INTO student VALUES (96047,(SELECT cohort_id FROM cohort WHERE cohort_id=1),"Lindsay","Morrison",2000-1-11,2015-11-11,5018351272,"LMorrison42@gmail.com","Lucas","LMorrison22@gmail.com",6529375241,"Holly","HMorrison65@gmail.com",3591712902,5,2,1,3.26,22,Now(),1);
INSERT INTO student VALUES (96057,(SELECT cohort_id FROM cohort WHERE cohort_id=1),'Ray',"Massey",2001-6-21,2015-6-11,5018841272,"RMassey85@gmail.com","Gary","GMassey39@gmail.com",6529309241,"Evelyn","EMassey45@gmail.com",3596713902,4,7,2,3.18,218,Now(),1);
INSERT INTO student VALUES (95047,(SELECT cohort_id FROM cohort WHERE cohort_id=1),"Lisa","Hall",2002-3-06,2015-5-17,9598351272,"LHall54@gmail.com","Ken","KHall40@gmail.com",6520856241,"Sharon","SHall60@gmail.com",2942960351,6,7,4,3.31,23,Now(),1);

#School 2
INSERT INTO student VALUES (92347,(SELECT cohort_id FROM cohort WHERE cohort_id=2),"Rick","Rios",2002-1-31,2015-8-09,5018989452,"RRios23@gmail.com","Thomas","TRios66@gmail.com",6529375671,"Nellie","NRios87@gmail.com",9101712902,2,3,2,3.10,29,Now(),1);
INSERT INTO student VALUES (16057,(SELECT cohort_id FROM cohort WHERE cohort_id=2),"Stuart","Obrien",2003-5-15,2016-3-26,5768941272,"SObrien09@gmail.com","Perry","PObrien62@gmail.com",6529309841,"Jennifer","JObrien12@gmail.com",3596719542,6,4,4,2.98,32,Now(),1);
INSERT INTO student VALUES (75840,(SELECT cohort_id FROM cohort WHERE cohort_id=2),"Nellie","Hawkins",2002-2-14,2015-7-24,1920351272,"NHawkins20@gmail.com","Spencer","SHawkins53@gmail.com",6520859087,"Sheryl","SHawkins13@gmail.com",2942842301,6,3,5,3.07,27,Now(),1);

#School 3
INSERT INTO student VALUES (97423,(SELECT cohort_id FROM cohort WHERE cohort_id=3),"Juanita","Perry",2001-9-13,2015-1-22,5019089782,"JPerry56@gmail.com","Phillip","PPerry26@gmail.com",6528905641,"Jeanne","JPerry90@gmail.com",3594869702,3,4,2,2.87,20,Now(),1);
INSERT INTO student VALUES (99757,(SELECT cohort_id FROM cohort WHERE cohort_id=3),"Garrett","Cohen",2001-5-03,2014-9-27,5018123452,"GCohen02@gmail.com","Willie","WCohen42@gmail.com",6523009421,"Mary","MCohen@gmail.com",3596131425,2,1,4,2.76,21,Now(),1);
INSERT INTO student VALUES (95147,(SELECT cohort_id FROM cohort WHERE cohort_id=3),"Frances","Logan",2002-4-21,2016-8-12,9598980952,"FLogan10@gmail.com","Raymond","RLogan56@gmail.com",6529276521,"Marianne","MLogan18@gmail.com",2942983490,5,8,2,2.82,24,Now(),1);

# END OF SEED DATA

# BEGINNING OF SURVEY SEED


# Survey
INSERT INTO survey (survey_id,survey_name,date_modified,user_modified) VALUES (1,"NGM Survey",now(),1);

# Survey Categories
INSERT INTO survey_category VALUES (1,(SELECT survey_id from survey where survey_id=1),"Grit",now(),1);
INSERT INTO survey_category VALUES (2,(SELECT survey_id from survey where survey_id= 1),'Problem Solving',now(),1);
INSERT INTO survey_category VALUES (3,(SELECT survey_id from survey where survey_id= 1),'Academic Self-Efficacy',now(),1);
INSERT INTO survey_category VALUES (4,(SELECT survey_id from survey where survey_id= 1),'Teamwork',now(),1);
INSERT INTO survey_category VALUES (5,(SELECT survey_id from survey where survey_id= 1),'Social Competence',now(),1);
INSERT INTO survey_category VALUES (6,(SELECT survey_id from survey where survey_id= 1),'Growth Mindset',now(),1);
INSERT INTO survey_category VALUES (7,(SELECT survey_id from survey where survey_id= 1),'Academic Behaviors',now(),1);

# Grit
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (1,(SELECT survey_category_id from survey_category where survey_category_id=1),'New ideas and projects sometimes distract me from previous ones.',0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (2,(SELECT survey_category_id from survey_category where survey_category_id=1),'I have been obsessed with a certain ideas or project for a short time but later lost interest.',1,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (3,(SELECT survey_category_id from survey_category where survey_category_id=1),'I am a hard worker.',0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (4,(SELECT survey_category_id from survey_category where survey_category_id=1),'I often set a goal but later choose to pursue (follow) a different one.',1,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (5,(SELECT survey_category_id from survey_category where survey_category_id=1),'I have difficulty maintining (keeping) my focus on projects that take more than a few months to complete.',1,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (6,(SELECT survey_category_id from survey_category where survey_category_id=1),'I finish whatever I begin.',0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (7,(SELECT survey_category_id from survey_category where survey_category_id=1),'I am dilligent (hard working and careful).',0,now(),1);

# Problem-Solving
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (8,(SELECT survey_category_id from survey_category where survey_category_id=2),'I compare each possible solution with the others to find the best one to solve my problem.',0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (9,(SELECT survey_category_id from survey_category where survey_category_id=2),"I look at a problem from many different viewpoints (my own, my friends', my parents', etc.).",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (10,(SELECT survey_category_id from survey_category where survey_category_id=2),"I'm confident I can do an excellent job on assignments and tests.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (11,(SELECT survey_category_id from survey_category where survey_category_id=2),'When solving a problem, I look at all possible solutions.',0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (12,(SELECT survey_category_id from survey_category where survey_category_id=2),'I try to get all the facts before trying to solve a problem.',0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (13,(SELECT survey_category_id from survey_category where survey_category_id=2),'I try to look at the long term results of each possible solution.',0,now(),1);

# Teamwork
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (14,(SELECT survey_category_id from survey_category where survey_category_id=3),"I'm certain I can understand the most difficult material presented in texts.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (15,(SELECT survey_category_id from survey_category where survey_category_id=3),"I'm confident I can understand the most complex material presented by the teacher.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (16,(SELECT survey_category_id from survey_category where survey_category_id=3),'When faced with a problem, I wait to see if it will go away.',1,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (17,(SELECT survey_category_id from survey_category where survey_category_id=3),"I'm certain I can master the skills being taught in school.",0,now(),1);

#Social Competence
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (18,(SELECT survey_category_id from survey_category where survey_category_id=4),"I can be a good group leader.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (19,(SELECT survey_category_id from survey_category where survey_category_id=4),"I can help a group be successful.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (20,(SELECT survey_category_id from survey_category where survey_category_id=4),"I can be happy even when my group has decided to do something I don't want to do.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (21,(SELECT survey_category_id from survey_category where survey_category_id=4),"I can appreciate opinions that are different from my own.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (22,(SELECT survey_category_id from survey_category where survey_category_id=4),"I can place group goals above the things that I want.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (23,(SELECT survey_category_id from survey_category where survey_category_id=4),"I can cooperate with others.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (24,(SELECT survey_category_id from survey_category where survey_category_id=4),"I can be a team-player in a small group.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (25,(SELECT survey_category_id from survey_category where survey_category_id=4),"I know I can get along with other people in a small group.",0,now(),1);

# Growth Mindset
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (26,(SELECT survey_category_id from survey_category where survey_category_id=5),"I work well with other students.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (27,(SELECT survey_category_id from survey_category where survey_category_id=5),"I can solve problems with other students without being aggressive.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (28,(SELECT survey_category_id from survey_category where survey_category_id=5),"I often think about the feelings of other students.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (29,(SELECT survey_category_id from survey_category where survey_category_id=5),"I usually cooperate with other students without being told to do so.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (30,(SELECT survey_category_id from survey_category where survey_category_id=5),"I understand the feelings of other students.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (31,(SELECT survey_category_id from survey_category where survey_category_id=5),"I can resolve problems with other students on my own.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (32,(SELECT survey_category_id from survey_category where survey_category_id=6),"You have a certain amount of intelligence and you can't really do much to change it.",1,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (33,(SELECT survey_category_id from survey_category where survey_category_id=6),"Your intelligence is something about you that you can't change very much.",1,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (34,(SELECT survey_category_id from survey_category where survey_category_id=6),"You can learn new things but you can't really change your basic intelligence.",1,now(),1);

#Academic Behaviors
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (35,(SELECT survey_category_id from survey_category where survey_category_id=7),"Get teachers to help me when I get stuck on schoolwork.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (36,(SELECT survey_category_id from survey_category where survey_category_id=7),"Get another student to help me when I get stuck on schoolwork.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (37,(SELECT survey_category_id from survey_category where survey_category_id=7),"Get adults to help me when I have social problems.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (38,(SELECT survey_category_id from survey_category where survey_category_id=7),"Get a friend to help me when I have social problems.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (39,(SELECT survey_category_id from survey_category where survey_category_id=7),"Finish my homework assignments by deadlines.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (40,(SELECT survey_category_id from survey_category where survey_category_id=7),"Get myself to study when there are other interesting things to do.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (41,(SELECT survey_category_id from survey_category where survey_category_id=7),"Always concentrate on school subjects during class.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (42,(SELECT survey_category_id from survey_category where survey_category_id=7),"Take good notes during class instruction.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (43,(SELECT survey_category_id from survey_category where survey_category_id=7),"Use the library to get information for class assignments.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (44,(SELECT survey_category_id from survey_category where survey_category_id=7),"Plan my schoolwork for the day.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (45,(SELECT survey_category_id from survey_category where survey_category_id=7),"Organize my schoolwork.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (46,(SELECT survey_category_id from survey_category where survey_category_id=7),"Remember well information presented in class and testbooks.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (47,(SELECT survey_category_id from survey_category where survey_category_id=7),"Arrange a place to study without distractions.",0,now(),1);
INSERT INTO survey_question (survey_question_id,survey_category_id,question,question_negated,date_modified,user_modified) VALUES (48,(SELECT survey_category_id from survey_category where survey_category_id=7),"Get myself to do schoolwork.",0,now(),1);
# END OF SURVEY SEED
