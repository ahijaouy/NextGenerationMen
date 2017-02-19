INSERT INTO school (
    school_id,
    school_name,
    school_address,
    school_phone,
    principal_name,
    principal_phone,
    date_modified,
    user_modified
) VALUES (
    1,
    "School1",
    "123 Sunny Lane",
    "1231231234",
    "John Smith",
    "1234561234",
    Now(),
    1
)

INSERT INTO school (school_id,school_name,school_address,school_phone,principal_name,principal_phone,date_modified,user_modified) VALUES (2,"School2","321 Sunny Lane","3211231234","Johnathan Smith","3214561234",Now(),1);
INSERT INTO school (school_id,school_name,school_address,school_phone,principal_name,principal_phone,date_modified,user_modified) VALUES (3,"School3","213 Sunny Lane","2131231234","Jonathan Smith","2134561234",Now(), 1);

INSERT INTO cohort (
    cohort_id,
    school_id,
    cohort_year,
    date_modified,
    user_modified
) VALUES (
    1,
    (SELECT school_id from school where school_name="school1"),
    2017,
    Now(),
    1
)

INSERT INTO cohort (
    cohort_id,
    school_id,
    cohort_year,
    date_modified,
    user_modified
) VALUES (
    2,
    (SELECT school_id from school where school_name="school2"),
    2017,
    Now(),
    1
)

INSERT INTO cohort (
    cohort_id,
    school_id,
    cohort_year,
    date_modified,
    user_modified
) VALUES (
    3,
    (SELECT school_id from school where school_name="school3"),
    2017,
    Now(),
    1
)

-- Lindsay	Morrison
-- Frances	Logan
-- Dixie	Holland
-- Wendy	Burns
-- Marianne	Doyle
-- Mamie	Lynch
-- Nellie	Hawkins
-- Raymond	Bush
-- Phillip	Farmer
-- Stuart	Allison
-- Thomas	Sutton
-- Jeanne	Obrien
-- Ray	Massey
-- Perry	Mccormick
-- Mary	Adams
-- Evelyn	Gilbert
-- June	Tran
-- Spencer	Mitchell
-- Rick	Alvarez
-- Rick	Alvarez
-- Todd	Morton
-- Willie	Jordan
-- Holly	Rios
-- Kelvin	Cortez
-- Seth	Walton
-- Jermaine	Wise
-- Lucas	Herrera
-- Leland	Anderson
-- Juanita	Perry
-- Ken	Gutierrez
-- Lisa	Hall
-- Sheryl	Hammond
-- Elijah	Watson
-- Sharon	Roy
-- Leroy	Bryant
-- Garrett	Benson
-- 96047	41672	50776	65603	70156
-- 38197	59633	68373	60594	84983
-- 90926	22886	13354	99355	16535
-- 37085	35250	53711	99068	45848
-- 63154	12398	45206	20464	64020
-- 2000-11-11
-- 2001-07-20
-- 2002-02-02
-- 2002-03-14
-- 2003-05-23
-- 2003-08-05
-- 2004-09-27
-- 2004-11-10
-- 2004-11-23
-- 2005-05-20
-- 501	835	127	479	727
-- 699	214	652	937	524
-- 737	980	501	910	920
-- 785	359	171	290	656
-- 549	576	683	337	610

INSERT INTO cohort (
    student_id,
    cohort_id,
    student_first_name,
    student_last_name,
    student_dob,
    student_start_date,
    student_phone,
    student_email,
    guardian_one_name,
    guardian_one_email,
    guardian_one_phone,
    guardian_two_name,
    guardian_two_email,
    guardian_two_phone,
    middleschool_absences,
    highschool_absences,
    highschool_suspensions,
    total_credits_earned,
    date_modified,
    user_modified
) VALUES (
    96047,
    1,
    "Lindsay",
    "Morrison",
    2000-11-11,
    2015-11-11,
    5018351272,
    "LMorrison42@gmail.com",
    "Lucas",
    "LMorrison22@gmail.com",
    6529375241
    "Holly",
    "HMorrison65@gmail.com"
    3591712902,
    5,
    2,
    1,
    3.78,
    22,
    Now(),
    1
)

INSERT INTO cohort (
    student_id,
    cohort_id,
    student_first_name,
    student_last_name,
    student_dob,
    student_start_date,
    student_phone,
    student_email,
    guardian_one_name,
    guardian_one_email,
    guardian_one_phone,
    guardian_two_name,
    guardian_two_email,
    guardian_two_phone,
    middleschool_absences,
    highschool_absences,
    highschool_suspensions,
    total_credits_earned,
    date_modified,
    user_modified
) VALUES (
    96057,
    1,
    "Ray",
    "Massey"
    2001-6-21,
    2015-6-11,
    5018841272,
    "RMassey85@gmail.com",
    "Gary",
    "GMassey39@gmail.com",
    6529309241
    "Evelyn",
    "EMassey45@gmail.com"
    3596713902,
    4,
    7,
    2,
    3.76,
    218,
    Now(),
    1
)

INSERT INTO cohort (
    student_id,
    cohort_id,
    student_first_name,
    student_last_name,
    student_dob,
    student_start_date,
    student_phone,
    student_email,
    guardian_one_name,
    guardian_one_email,
    guardian_one_phone,
    guardian_two_name,
    guardian_two_email,
    guardian_two_phone,
    middleschool_absences,
    highschool_absences,
    highschool_suspensions,
    total_credits_earned,
    date_modified,
    user_modified
) VALUES (
    95047,
    1,
    "Lisa",
    "Hall",
    2002-3-06,
    2015-5-17,
    9598351272,
    "LHall54@gmail.com",
    "Ken",
    "KHall40@gmail.com",
    6520856241
    "Sharon",
    "SHall60@gmail.com"
    2942960351,
    6,
    7,
    4,
    3.82,
    23,
    Now(),
    1
)

-- TODO
-- School 2
INSERT INTO cohort (
    student_id,
    cohort_id,
    student_first_name,
    student_last_name,
    student_dob,
    student_start_date,
    student_phone,
    student_email,
    guardian_one_name,
    guardian_one_email,
    guardian_one_phone,
    guardian_two_name,
    guardian_two_email,
    guardian_two_phone,
    middleschool_absences,
    highschool_absences,
    highschool_suspensions,
    total_credits_earned,
    date_modified,
    user_modified
) VALUES (
    92347,
    2,
    "Rick",
    "Rios",
    2002-1-31,
    2015-8-09,
    5018989452,
    "RRios23@gmail.com",
    "Thomas",
    "TRios66@gmail.com",
    6529375671
    "Nellie",
    "NRios87@gmail.com"
    9101712902,
    2,
    3,
    2,
    3.88,
    29,
    Now(),
    1
)

INSERT INTO cohort (
    student_id,
    cohort_id,
    student_first_name,
    student_last_name,
    student_dob,
    student_start_date,
    student_phone,
    student_email,
    guardian_one_name,
    guardian_one_email,
    guardian_one_phone,
    guardian_two_name,
    guardian_two_email,
    guardian_two_phone,
    middleschool_absences,
    highschool_absences,
    highschool_suspensions,
    total_credits_earned,
    date_modified,
    user_modified
) VALUES (
    16057,
    2,
    "Stuart",
    "Obrien"
    2003-5-15,
    2016-3-26,
    5768941272,
    "SObrien09@gmail.com",
    "Perry",
    "PObrien62@gmail.com",
    6529309841
    "Jennifer",
    "JObrien12@gmail.com"
    3596719542,
    6,
    4,
    4,
    3.90,
    32,
    Now(),
    1
)

INSERT INTO cohort (
    student_id,
    cohort_id,
    student_first_name,
    student_last_name,
    student_dob,
    student_start_date,
    student_phone,
    student_email,
    guardian_one_name,
    guardian_one_email,
    guardian_one_phone,
    guardian_two_name,
    guardian_two_email,
    guardian_two_phone,
    middleschool_absences,
    highschool_absences,
    highschool_suspensions,
    total_credits_earned,
    date_modified,
    user_modified
) VALUES (
    75840,
    2,
    "Nellie",
    "Hawkins",
    2002-2-14,
    2015-7-24,
    1920351272,
    "NHawkins20@gmail.com",
    "Spencer",
    "SHawkins53@gmail.com",
    6520859087
    "Sheryl",
    "SHawkins13@gmail.com"
    2942842301,
    6,
    3,
    5,
    3.86,
    27,
    Now(),
    1
)

-- TODO
-- School 3
INSERT INTO cohort (
    student_id,
    cohort_id,
    student_first_name,
    student_last_name,
    student_dob,
    student_start_date,
    student_phone,
    student_email,
    guardian_one_name,
    guardian_one_email,
    guardian_one_phone,
    guardian_two_name,
    guardian_two_email,
    guardian_two_phone,
    middleschool_absences,
    highschool_absences,
    highschool_suspensions,
    total_credits_earned,
    date_modified,
    user_modified
) VALUES (
    96047,
    3,
    "Lindsay",
    "Morrison",
    2000-11-11,
    2015-11-11,
    5018351272,
    "LMorrison42@gmail.com",
    "Lucas",
    "LMorrison22@gmail.com",
    6529375241
    "Holly",
    "HMorrison65@gmail.com"
    3591712902,
    5,
    2,
    1,
    3.78,
    22,
    Now(),
    1
)

INSERT INTO cohort (
    student_id,
    cohort_id,
    student_first_name,
    student_last_name,
    student_dob,
    student_start_date,
    student_phone,
    student_email,
    guardian_one_name,
    guardian_one_email,
    guardian_one_phone,
    guardian_two_name,
    guardian_two_email,
    guardian_two_phone,
    middleschool_absences,
    highschool_absences,
    highschool_suspensions,
    total_credits_earned,
    date_modified,
    user_modified
) VALUES (
    96057,
    3,
    "Ray",
    "Massey"
    2001-6-21,
    2015-6-11,
    5018841272,
    "RMassey85@gmail.com",
    "Gary",
    "GMassey39@gmail.com",
    6529309241
    "Evelyn",
    "EMassey45@gmail.com"
    3596713902,
    4,
    7,
    2,
    3.76,
    28,
    Now(),
    1
)

INSERT INTO cohort (
    student_id,
    cohort_id,
    student_first_name,
    student_last_name,
    student_dob,
    student_start_date,
    student_phone,
    student_email,
    guardian_one_name,
    guardian_one_email,
    guardian_one_phone,
    guardian_two_name,
    guardian_two_email,
    guardian_two_phone,
    middleschool_absences,
    highschool_absences,
    highschool_suspensions,
    total_credits_earned,
    date_modified,
    user_modified
) VALUES (
    95047,
    3,
    "Lisa",
    "Hall",
    2002-3-06,
    2015-5-17,
    9598351272,
    "LHall54@gmail.com",
    "Ken",
    "KHall40@gmail.com",
    6520856241
    "Sharon",
    "SHall60@gmail.com"
    2942960351,
    6,
    7,
    4,
    3.82,
    23,
    Now(),
    1
)
