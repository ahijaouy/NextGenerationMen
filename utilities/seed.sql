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
INSERT INTO school (school_id, school_name, school_address, school_phone, principal_name, principal_phone, date_modified, user_modified) VALUES (3, "School3", "213 Sunny Lane","2131231234","Jonathan Smith","2134561234",Now(), 1);
