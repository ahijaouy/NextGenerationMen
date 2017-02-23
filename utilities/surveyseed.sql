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
<<<<<<< Updated upstream
    (SELECT survey_id from survey where survey_id=1),
    "Grit",
=======
    (SELECT survey_id from survey where survey_id= 1),
    'Grit',
>>>>>>> Stashed changes
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
    (SELECT survey_category_id from survey_category where survey_category_name='Grit'),
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
    (SELECT survey_category_id from survey_category where survey_category_name='Grit'),
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
    (SELECT survey_category_id from survey_category where survey_category_name='Grit'),
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
    (SELECT survey_category_id from survey_category where survey_category_name='Grit'),
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
    (SELECT survey_category_id from survey_category where survey_category_name='Grit'),
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
    (SELECT survey_category_id from survey_category where survey_category_name='Grit'),
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
    (SELECT survey_category_id from survey_category where survey_category_name='Grit'),
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
    1,
    (SELECT survey_category_id from survey_category where survey_category_name='Problem Solving'),
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
    2,
    (SELECT survey_category_id from survey_category where survey_category_name='Problem Solving'),
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
    3,
    (SELECT survey_category_id from survey_category where survey_category_name='Problem Solving'),
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
    4,
    (SELECT survey_category_id from survey_category where survey_category_name='Problem Solving'),
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
    5,
    (SELECT survey_category_id from survey_category where survey_category_name='Problem Solving'),
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
    6,
    (SELECT survey_category_id from survey_category where survey_category_name='Problem Solving'),
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
    1,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Self-Efficacy'),
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
    2,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Self-Efficacy'),
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
    3,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Self-Efficacy'),
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
    4,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Self-Efficacy'),
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
    1,
    (SELECT survey_category_id from survey_category where survey_category_name='Teamwork'),
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
    2,
    (SELECT survey_category_id from survey_category where survey_category_name='Teamwork'),
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
    3,
    (SELECT survey_category_id from survey_category where survey_category_name='Teamwork'),
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
    4,
    (SELECT survey_category_id from survey_category where survey_category_name='Teamwork'),
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
    5,
    (SELECT survey_category_id from survey_category where survey_category_name='Teamwork'),
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
    6,
    (SELECT survey_category_id from survey_category where survey_category_name='Teamwork'),
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
    7,
    (SELECT survey_category_id from survey_category where survey_category_name='Teamwork'),
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
    8,
    (SELECT survey_category_id from survey_category where survey_category_name='Teamwork'),
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
    1,
    (SELECT survey_category_id from survey_category where survey_category_name='Social Competence'),
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
    2,
    (SELECT survey_category_id from survey_category where survey_category_name='Social Competence'),
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
    3,
    (SELECT survey_category_id from survey_category where survey_category_name='Social Competence'),
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
    4,
    (SELECT survey_category_id from survey_category where survey_category_name='Social Competence'),
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
    5,
    (SELECT survey_category_id from survey_category where survey_category_name='Social Competence'),
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
    6,
    (SELECT survey_category_id from survey_category where survey_category_name='Social Competence'),
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
    1,
    (SELECT survey_category_id from survey_category where survey_category_name='Growth Mindset'),
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
    2,
    (SELECT survey_category_id from survey_category where survey_category_name='Growth Mindset'),
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
    3,
    (SELECT survey_category_id from survey_category where survey_category_name='Growth Mindset'),
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
    1,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    2,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    3,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    4,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    5,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    6,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    7,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    8,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    9,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    10,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    11,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    12,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    13,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
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
    14,
    (SELECT survey_category_id from survey_category where survey_category_name='Academic Behaviors'),
    "Get myself to do schoolwork.",
    0,
    now(),
    1
);
