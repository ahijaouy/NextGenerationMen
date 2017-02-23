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
