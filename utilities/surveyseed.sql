INSERT INTO survey (
    survey_id,
    survey_name,
    date_modified,
    user_modified
) VALUES (
    1,
    "NGM Survey",
    now(),
    1
);

INSERT INTO survey_category VALUES (
    1,
    (SELECT survey_id from survey where survey_id=1),
    "Grit",
    now(),
    1
);
INSERT INTO survey_category VALUES (
    2,
    (SELECT survey_id from survey where survey_id= 1),
    'Problem Solving',
    now(),
    1
);
INSERT INTO survey_category VALUES (
    3,
    (SELECT survey_id from survey where survey_id= 1),
    'Academic Self-Efficacy',
    now(),
    1
);
INSERT INTO survey_category VALUES (
    4,
    (SELECT survey_id from survey where survey_id= 1),
    'Teamwork',
    now(),
    1
);
INSERT INTO survey_category VALUES (
    5,
    (SELECT survey_id from survey where survey_id= 1),
    'Social Competence',
    now(),
    1
);
INSERT INTO survey_category VALUES (
    6,
    (SELECT survey_id from survey where survey_id= 1),
    'Growth Mindset',
    now(),
    1
);
INSERT INTO survey_category VALUES (
    7,
    (SELECT survey_id from survey where survey_id= 1),
    'Academic Behaviors',
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
    (SELECT survey_category_id from survey_category where survey_category_id=1),
    'New ideas and projects sometimes distract me from previous ones.',
    0,
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
    2,
    (SELECT survey_category_id from survey_category where survey_category_id=1),
    'I have been obsessed with a certain ideas or project for a short time but later lost interest.',
    1,
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
    3,
    (SELECT survey_category_id from survey_category where survey_category_id=1),
    'I am a hard worker.',
    0,
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
    4,
    (SELECT survey_category_id from survey_category where survey_category_id=1),
    'I often set a goal but later choose to pursue (follow) a different one.',
    1,
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
    5,
    (SELECT survey_category_id from survey_category where survey_category_id=1),
    'I have difficulty maintining (keeping) my focus on projects that take more than a few months to complete.',
    1,
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
    6,
    (SELECT survey_category_id from survey_category where survey_category_id=1),
    'I finish whatever I begin.',
    0,
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
    7,
    (SELECT survey_category_id from survey_category where survey_category_id=1),
    'I am dilligent (hard working and careful).',
    0,
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
    8,
    (SELECT survey_category_id from survey_category where survey_category_id=2),
    'I compare each possible solution with the others to find the best one to solve my problem.',
    0,
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
    9,
    (SELECT survey_category_id from survey_category where survey_category_id=2),
    "I look at a problem from many different viewpoints (my own, my friends', my parents', etc.).",
    0,
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
    10,
    (SELECT survey_category_id from survey_category where survey_category_id=2),
    "I'm confident I can do an excellent job on assignments and tests.",
    0,
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
    11,
    (SELECT survey_category_id from survey_category where survey_category_id=2),
    'When solving a problem, I look at all possible solutions.',
    0,
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
    12,
    (SELECT survey_category_id from survey_category where survey_category_id=2),
    'I try to get all the facts before trying to solve a problem.',
    0,
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
    13,
    (SELECT survey_category_id from survey_category where survey_category_id=2),
    'I try to look at the long term results of each possible solution.',
    0,
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
    14,
    (SELECT survey_category_id from survey_category where survey_category_id=3),
    "I'm certain I can understand the most difficult material presented in texts.",
    0,
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
    15,
    (SELECT survey_category_id from survey_category where survey_category_id=3),
    "I'm confident I can understand the most complex material presented by the teacher.",
    0,
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
    16,
    (SELECT survey_category_id from survey_category where survey_category_id=3),
    'When faced with a problem, I wait to see if it will go away.',
    1,
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
    17,
    (SELECT survey_category_id from survey_category where survey_category_id=3),
    "I'm certain I can master the skills being taught in school.",
    0,
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
    18,
    (SELECT survey_category_id from survey_category where survey_category_id=4),
    "I can be a good group leader.",
    0,
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
    19,
    (SELECT survey_category_id from survey_category where survey_category_id=4),
    "I can help a group be successful.",
    0,
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
    20,
    (SELECT survey_category_id from survey_category where survey_category_id=4),
    "I can be happy even when my group has decided to do something I don't want to do.",
    0,
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
    21,
    (SELECT survey_category_id from survey_category where survey_category_id=4),
    "I can appreciate opinions that are different from my own.",
    0,
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
    22,
    (SELECT survey_category_id from survey_category where survey_category_id=4),
    "I can place group goals above the things that I want.",
    0,
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
    23,
    (SELECT survey_category_id from survey_category where survey_category_id=4),
    "I can cooperate with others.",
    0,
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
    24,
    (SELECT survey_category_id from survey_category where survey_category_id=4),
    "I can be a team-player in a small group.",
    0,
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
    25,
    (SELECT survey_category_id from survey_category where survey_category_id=4),
    "I know I can get along with other people in a small group.",
    0,
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
    26,
    (SELECT survey_category_id from survey_category where survey_category_id=5),
    "I work well with other students.",
    0,
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
    27,
    (SELECT survey_category_id from survey_category where survey_category_id=5),
    "I can solve problems with other students without being aggressive.",
    0,
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
    28,
    (SELECT survey_category_id from survey_category where survey_category_id=5),
    "I often think about the feelings of other students.",
    0,
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
    29,
    (SELECT survey_category_id from survey_category where survey_category_id=5),
    "I usually cooperate with other students without being told to do so.",
    0,
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
    30,
    (SELECT survey_category_id from survey_category where survey_category_id=5),
    "I understand the feelings of other students.",
    0,
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
    31,
    (SELECT survey_category_id from survey_category where survey_category_id=5),
    "I can resolve problems with other students on my own.",
    0,
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
    32,
    (SELECT survey_category_id from survey_category where survey_category_id=6),
    "You have a certain amount of intelligence and you can't really do much to change it.",
    1,
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
    33,
    (SELECT survey_category_id from survey_category where survey_category_id=6),
    "Your intelligence is something about you that you can't change very much.",
    1,
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
    34,
    (SELECT survey_category_id from survey_category where survey_category_id=6),
    "You can learn new things but you can't really change your basic intelligence.",
    1,
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
    35,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Get teachers to help me when I get stuck on schoolwork.",
    0,
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
    36,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Get another student to help me when I get stuck on schoolwork.",
    0,
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
    37,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Get adults to help me when I have social problems.",
    0,
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
    38,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Get a friend to help me when I have social problems.",
    0,
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
    39,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Finish my homework assignments by deadlines.",
    0,
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
    40,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Get myself to study when there are other interesting things to do.",
    0,
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
    41,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Always concentrate on school subjects during class.",
    0,
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
    42,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Take good notes during class instruction.",
    0,
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
    43,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Use the library to get information for class assignments.",
    0,
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
    44,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Plan my schoolwork for the day.",
    0,
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
    45,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Organize my schoolwork.",
    0,
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
    46,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Remember well information presented in class and testbooks.",
    0,
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
    47,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Arrange a place to study without distractions.",
    0,
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
    48,
    (SELECT survey_category_id from survey_category where survey_category_id=7),
    "Get myself to do schoolwork.",
    0,
    now(),
    1
);
