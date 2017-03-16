DROP TABLE survey_response;
DROP TABLE survey_qestion;
DROP TABLE survey_category;
DROP TABLE survey;
DROP TABLE semester_record;
DROP TABLE student;
DROP TABLE cohort;
DROP TABLE school;

# BEGINNING OF DDL
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
  `user_modified` int(11) DEFAULT NULL,
  PRIMARY KEY (`school_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ;

CREATE TABLE `cohort` (
  `cohort_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `cohort_year` int(11) DEFAULT NULL,
  `date_modified` date DEFAULT NULL,
  `user_modified` int(11) DEFAULT NULL,
  PRIMARY KEY (`cohort_id`),
  KEY `fk_school_id` (`school_id`),
  CONSTRAINT `fk_school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `student_first_name` varchar(255) NOT NULL,
  `student_last_name` varchar(255) NOT NULL,
  `student_dob` date NOT NULL,
  `student_gender` varchar(15) NOT NULL,
  `student_start_date` date NOT NULL,
  `student_phone` varchar(20) NOT NULL,
  `student_email` varchar(255) NOT NULL,
  `guardian_one_name` varchar(255) NOT NULL,
  `guardian_one_email` varchar(255) NOT NULL,
  `guardian_one_phone` varchar(20) NOT NULL,
  `guardian_two_name` varchar(255) NOT NULL,
  `guardian_two_email` varchar(255) NOT NULL,
  `guardian_two_phone` varchar(20) NOT NULL,
  `middleschool_suspensions` tinyint(4) NOT NULL,
  `highschool_absences` tinyint(4) NOT NULL,
  `highschool_suspensions` tinyint(4) NOT NULL,
  `cumulative_gpa` decimal(5,2) NOT NULL,
  `total_credits_earned` int(11) NOT NULL,
  `date_modified` date DEFAULT NULL,
  `user_modified` int(11) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `fk_cohort` (`cohort_id`),
  CONSTRAINT `fk_cohort` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`)
) ENGINE=InnoDB AUTO_INCREMENT=99758 DEFAULT CHARSET=utf8 ;

CREATE TABLE `semester_record` (
  `semester_record_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `number_as` int(11) NOT NULL,
  `number_bs` int(11) NOT NULL,
  `number_cs` int(11) NOT NULL,
  `number_ds` int(11) NOT NULL,
  `semester_gpa` decimal(5,2) NOT NULL,
  `semester_credits` int(11) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` int(11) NOT NULL,
  PRIMARY KEY (`semester_record_id`),
  KEY `fk_student` (`student_id`),
  CONSTRAINT `fk_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `survey` (
  `survey_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_name` varchar(45) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` int(11) NOT NULL,
  PRIMARY KEY (`survey_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `survey_category` (
  `survey_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_id` int(11) NOT NULL,
  `survey_category_name` varchar(45) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` int(11) NOT NULL,
  PRIMARY KEY (`survey_category_id`),
  KEY `fk_survey` (`survey_id`),
  CONSTRAINT `fk_survey` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `survey_question` (
  `survey_question_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_category_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `question_negated` tinyint(4) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` int(11) NOT NULL,
  PRIMARY KEY (`survey_question_id`),
  KEY `fk_survey_category` (`survey_category_id`),
  CONSTRAINT `fk_survey_category` FOREIGN KEY (`survey_category_id`) REFERENCES `survey_category` (`survey_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `survey_response` (
  `survey_response_id` int(11) NOT NULL AUTO_INCREMENT,
  `survey_question_id` int(11) NOT NULL,
  `semester_record_id` int(11) NOT NULL,
  `response` tinyint(4) NOT NULL,
  `date_modified` date NOT NULL,
  `user_modified` int(11) NOT NULL,
  PRIMARY KEY (`survey_response_id`),
  KEY `fk_survey_question` (`survey_question_id`),
  KEY `fk_semester_record` (`semester_record_id`),
  CONSTRAINT `fk_survey_question` FOREIGN KEY (`survey_question_id`) REFERENCES `survey_question` (`survey_question_id`),
  CONSTRAINT `fk_semester_record` FOREIGN KEY (`semester_record_id`) REFERENCES `semester_record` (`semester_record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# END OF DDL

# BEGINNING OF SEED DATA

# Schools
INSERT INTO school VALUES (1,"School1","321 Sunny Lane","3211231234","Johnathan Smith","3214561234","janathonsmith2@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com",Now(),1);
INSERT INTO school VALUES (2,"School2","213 Sunny Lane","2131231234","Jonathan Smith","2134561234","jonathonsmith2@gmail.com", "Gin Kim","3456669086","ginkim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com",Now(), 1);
INSERT INTO school VALUES (3,"School3","123 Sunny Lane","1231231234","John Smith","1234561234","johnmith2@gmail.com","Sean Kim","2341132235","seankim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com","Amy Kim","2344567754","amykim5@gmail.com",Now(),1);

#Cohorts
INSERT INTO cohort VALUES (1,(SELECT school_id from school where school_id=1),2017,Now(),1);
INSERT INTO cohort VALUES (2,(SELECT school_id from school where school_id=2),2017,Now(),1);
INSERT INTO cohort VALUES (3,(SELECT school_id from school where school_id=3),2017,Now(),1);

# Students for School 1
INSERT INTO student VALUES (96047,(SELECT cohort_id FROM cohort WHERE cohort_id=1),"Lindsay","Morrison", 1996-06-17, "Female", 2015-11-11,"5018351272","LMorrison42@gmail.com","Lucas","LMorrison22@gmail.com","6529375241","Holly","HMorrison65@gmail.com","3591712902",5,2,1,3.26,22,Now(),1);
INSERT INTO student VALUES (96057,(SELECT cohort_id FROM cohort WHERE cohort_id=1),'Ray',"Massey",2001-6-21,"Male",2015-6-11,"5018841272","RMassey85@gmail.com","Gary","GMassey39@gmail.com","6529309241","Evelyn","EMassey45@gmail.com","3596713902",4,7,2,3.18,218,Now(),1);
INSERT INTO student VALUES (95047,(SELECT cohort_id FROM cohort WHERE cohort_id=1),"Lisa","Hall", 2002-3-06,"Female", 2015-5-17,"9598351272","LHall54@gmail.com","Ken","KHall40@gmail.com","6520856241","Sharon","SHall60@gmail.com","2942960351",6,7,4,3.31,23,Now(),1);

# Students for School 2
INSERT INTO student VALUES (92347,(SELECT cohort_id FROM cohort WHERE cohort_id=2),"Rick","Rios",2002-1-31,"Male", 2015-8-09,"5018989452","RRios23@gmail.com","Thomas","TRios66@gmail.com","6529375671","Nellie","NRios87@gmail.com","9101712902",2,3,2,3.10,29,Now(),1);
INSERT INTO student VALUES (16057,(SELECT cohort_id FROM cohort WHERE cohort_id=2),"Stuart","Obrien",2003-5-15, "Female", 2016-3-26,"5768941272","SObrien09@gmail.com","Perry","PObrien62@gmail.com","6529309841","Jennifer","JObrien12@gmail.com","3596719542",6,4,4,2.98,32,Now(),1);
INSERT INTO student VALUES (75840,(SELECT cohort_id FROM cohort WHERE cohort_id=2),"Nellie","Hawkins", 2002-2-14,"Female", 2015-7-24,"1920351272","NHawkins20@gmail.com","Spencer","SHawkins53@gmail.com","6520859087","Sheryl","SHawkins13@gmail.com","2942842301",6,3,5,3.07,27,Now(),1);

# Students for School 3
INSERT INTO student VALUES (97423,(SELECT cohort_id FROM cohort WHERE cohort_id=3),"Juanita","Perry", 2001-9-13,"Female", 2015-1-22,"5019089782","JPerry56@gmail.com","Phillip","PPerry26@gmail.com","6528905641","Jeanne","JPerry90@gmail.com","3594869702",3,4,2,2.87,20,Now(),1);
INSERT INTO student VALUES (99757,(SELECT cohort_id FROM cohort WHERE cohort_id=3),"Garrett","Cohen",2001-5-03,"Male",2014-9-27,"5018123452","GCohen02@gmail.com","Willie","WCohen42@gmail.com","6523009421","Mary","MCohen@gmail.com","3596131425",2,1,4,2.76,21,Now(),1);
INSERT INTO student VALUES (95147,(SELECT cohort_id FROM cohort WHERE cohort_id=3),"Frances","Logan", 2002-4-21,"Female", 2016-8-12,"9598980952","FLogan10@gmail.com","Raymond","RLogan56@gmail.com","6529276521","Marianne","MLogan18@gmail.com","2942983490",5,8,2,2.82,24,Now(),1);

# Semester Records
INSERT INTO semester_record VALUES (1, (SELECT student_id FROM student WHERE student_id=96047), 6, 5, 3, 1, "3", "4",3.32, 15, Now(), 1);
INSERT INTO semester_record VALUES (2, (SELECT student_id FROM student WHERE student_id=96057), 8, 6, 3, 1, "4", "4",3.44, 18, Now(), 1);
INSERT INTO semester_record VALUES (3, (SELECT student_id FROM student WHERE student_id=95047), 6, 8, 3, 1, "2", "4",3.65, 18, Now(), 1);
INSERT INTO semester_record VALUES (4, (SELECT student_id FROM student WHERE student_id=92347), 10, 5, 2, 3, "2", "4",3.75, 20, Now(), 1);
INSERT INTO semester_record VALUES (5, (SELECT student_id FROM student WHERE student_id=16057), 10, 2, 0, 0, "2", "4",3.95, 12, Now(), 1);
INSERT INTO semester_record VALUES (6, (SELECT student_id FROM student WHERE student_id=75840), 10, 5, 3, 2, "1", "4",3.6, 20, Now(), 1);
INSERT INTO semester_record VALUES (7, (SELECT student_id FROM student WHERE student_id=97423), 11, 5, 3, 2, "1", "4",3.65, 21, Now(), 1);
INSERT INTO semester_record VALUES (8, (SELECT student_id FROM student WHERE student_id=99757), 10, 8, 0, 0, "3", "4",4.0, 18, Now(), 1);
INSERT INTO semester_record VALUES (9, (SELECT student_id FROM student WHERE student_id=95147), 10, 5, 0, 0, "3", "4",3.95, 15, Now(), 1);
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
