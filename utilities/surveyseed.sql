INSERT INTO survey (
    survey_id,
    survey_name,
    date_modified,
    user_modified
) VALUES (
    1,
    'NGM Survey',
    now(),
    1
)

INSERT INTO survey_category (
    survey_category_id,
    survey_id,
    survey_category_name,
    date_modified,
    user_modified,
) VALUES (
    1,
    (SELECT survey_id from survey where survey_name='NGM Survey'),
    'Grit',
    now(),
    1
);

INSERT INTO survey_question (
    survey_question_id,
    survey_category_id,
    question,
    question_negated,
    date_modified,
    user_modified
) VALUES (
    1,
    (SELECT survey_category_id from survey_category where survey_category_name='Grit'),
    'New ideas and projects sometimes distract me from previous ones.',
    0,
    now(),
    1
)
INSERT INTO survey_question (
    survey_question_id,
    survey_category_id,
    question,
    question_negated,
    date_modified,
    user_modified
) VALUES (
    2,
    (SELECT survey_category_id from survey_category where survey_category_name='Grit'),
    'I have been obsessed with a certain ideas or project for a short time but later lost interest.',
    1,
    now(),
    1
)
--INSERT INTO survey_category (
--     survey_category_id,
--     survey_id,
--     survey_category_name,
--     date_modified,
--     user_modified)
-- VALUES(
--     1,
--     (SELECT survey_id from survey where survey_name="NGM Survey"),
--     "Grit",
--     NOW(),1);
