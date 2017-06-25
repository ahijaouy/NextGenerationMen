
module.exports = function(express, connection) {

  var survey_helper = require('./helpers/survey_helpers.js')(connection), 
      router        = express.Router(); 


//Deafult route to Survey page
router.route('/')
  .get(function(req, res) {
    var query1 = "SELECT * FROM survey";
    var query2 = "SELECT COUNT(*) FROM survey_category"
    connection.query("SELECT * FROM survey", function(err, rows){
      if (err) {console.log(err)}
      res.render('surveys', { surveys: rows, user: req.user._json.user_metadata});
    });
  })
  .post(function(req, res) {
    console.log(req.body);
    var query = "INSERT INTO survey(survey_name, date_modified, user_modified) VALUES (?,?,?);";
    connection.query(query, [req.body.survey_name,new Date(Date.now()), req.user._json.user_metadata.name], function(err, rows) {
      if (err) {console.log(err)};
      var dest = "/surveys/new/" + rows.insertId + "/category/0";
      res.redirect(dest);

    })
  });

//Route for viewing surveys
router.route('/:id/view')
  .get(function(req, res) {
    var query1 = "SELECT survey_name FROM survey where survey_id=" + req.params.id + ";";
    var query2 = "SELECT COUNT(*) FROM survey_category"
    connection.query(query1, function(err, surveyName){
      if (err) {console.log(err)}
      survey_helper.getSurveyQuestionsAndCategories(req.params.id, function(compositeList) {
        res.render('viewSurvey', { composite: compositeList, survey_name: surveyName[0].survey_name, user: req.user._json.user_metadata, buffer: "../../../"});
      });
    });
  });

//Route for deleting surveys
router.route('/:id/delete')
  .get(function(req, res) {
    var query1 = "DELETE FROM survey where survey_id=" + req.params.id + ";";
    connection.query(query1, function(err, surveyName){
      if (err) {console.log(err)}
      res.redirect('/surveys');
    });
  });

//Route for editing surveys
router.route('/:id/edit')
  .get(function(req, res) {
    var query1 = "SELECT survey_name, survey_id FROM survey where survey_id=" + req.params.id + ";";
    var query2 = "SELECT COUNT(*) FROM survey_category"
    connection.query(query1, function(err, surveyName){
      if (err) {console.log(err)}
      survey_helper.getSurveyQuestionsAndCategories(req.params.id, function(compositeList) {
        res.render('editSurvey', 
          { composite: compositeList, survey_name: surveyName[0].survey_name, survey_id:surveyName[0].survey_id, user: req.user._json.user_metadata, buffer: "../../../"});
      });
    });
  })
  .post(function(req, res) {
    var query = "UPDATE survey SET survey_name='" 
      + req.body.survey_name + "' WHERE survey_id=" + req.params.id + ";";
    connection.query(query, function(err, rows) {
      if (err) {console.log(err)};
      res.redirect('/surveys/' + req.params.id + '/edit');
    })
  });
  
//Route to edit Category
router.route('/:surveyId/category/:categoryId/edit')
  .get(function(req, res) {
    var query1 = "SELECT survey_category_name FROM survey_category "
      + "where survey_category_id=" + req.params.categoryId + ";";
    var query2 = "SELECT survey_name FROM survey where survey_id=" + req.params.surveyId + ";";

    connection.query(query1, function(err1, rows1){
      if (err1) {console.log(err1)};
      connection.query(query2, function(err2, rows2){
        res.render('editSurveyCategory', { survey: rows2[0], current: rows1[0], user: req.user._json.user_metadata, buffer: "../../../../"});
      });
    });
  })
  .post(function(req,res) {
    var query = "UPDATE survey_category SET"
      + " survey_category_name='" + req.body.category_name
      + "' WHERE survey_category_id=" + req.params.categoryId + ";";
    connection.query(query, function(err, rows) {
      if (err) {console.log(err)};
      res.redirect("/surveys/" + req.params.surveyId + "/edit");
    })
  });

//Route to edit Question
router.route('/:surveyId/question/:questionId/edit')
  .get(function(req, res) {
    var query1 = "SELECT survey_category_name, survey_category_id FROM survey_category "
      + "where survey_id=" + req.params.surveyId + ";";
    var query2 = "SELECT survey_name FROM survey where survey_id=" + req.params.surveyId + ";";
    
    var query3 = "SELECT * from survey_question where survey_question_id=" + req.params.questionId + ";";
    connection.query(query1, function(err1, rows1){
      if (err1) {console.log(err1)};
      connection.query(query2, function(err2, rows2){
        if (err2) {console.log(err2)};
        connection.query(query3, function(err3, rows3){
          res.render('editSurveyQuestion', 
            { survey: rows2[0], 
              categories: rows1, 
              current: rows3[0],
              user: req.user._json.user_metadata,
              buffer: "../../../../"
            });
        });
      });
    });
  })
  .post(function(req,res) {
    var query = "UPDATE survey_question SET"
      + " survey_category_id=" + req.body.survey_category_id
      + ", question='" + req.body.question
      + "', max_score=" + req.body.max_score
      + ", question_negated=" + req.body.question_negated
      + " WHERE survey_question_id=" + req.params.questionId + ";";
    connection.query(query, function(err, rows) {
      if (err) {console.log(err)};
      res.redirect("/surveys/" + req.params.surveyId + "/edit");
    })
  });

//Routes for adding survey categories
router.route('/new/:id/category/:done')
  .get(function(req, res) {
    var query1 = "SELECT survey_category_name FROM survey_category "
      + "where survey_id=" + req.params.id + ";";
    var query2 = "SELECT survey_name, survey_id FROM survey where survey_id=" + req.params.id + ";";

    connection.query(query1, function(err1, rows1){
      if (err1) {console.log(err1)};
      connection.query(query2, function(err2, rows2){
        res.render('addSurveyCategory', { survey: rows2[0], categories: rows1, user: req.user._json.user_metadata, buffer: "../../../"});
      });
    });
  })
  .post(function(req, res) {
    var query = "INSERT INTO survey_category(survey_id, survey_category_name, date_modified, user_modified) VALUES (?,?,?,?);";
    connection.query(query, [req.params.id, req.body.category_name,new Date(Date.now()), req.user._json.user_metadata.name], function(err, rowS){
      if (err){console.log(err)};
      var dest = "/surveys/new/" + req.params.id;
      if (req.params.done == 0) {
        res.redirect(dest + "/category/0");
      } else if (req.params.done == 1) {
        res.redirect(dest + "/question/0");
      }
    })
  });

//Routes for adding survey questions
router.route('/new/:id/question/:done')
  .get(function(req, res) {

    var query1 = "SELECT survey_category_name, survey_category_id FROM survey_category "
      + "where survey_id=" + req.params.id + ";";
    var query2 = "SELECT survey_name, survey_id FROM survey where survey_id=" + req.params.id + ";";

    connection.query(query1, function(err1, rows1){
      if (err1) {console.log(err1)};
      connection.query(query2, function(err2, rows2){
        if (err2) {console.log(err2)};
        getSurveyQuestionsAndCategories(req.params.id, function(compositeList) {
          res.render('addSurveyQuestion', 
            { survey: rows2[0], categories: rows1, user: req.user._json.user_metadata, composite: compositeList, buffer: "../../../"});
        });
        
      });
    });
  })
  .post(function(req, res) {
    var query = "INSERT INTO survey_question(survey_category_id, question, max_score, question_negated, date_modified, user_modified) VALUES (?,?,?,?,?,?);";
    connection.query(query, [req.body.survey_category_id, req.body.question, req.body.max_score, req.body.question_negated, new Date(Date.now()), req.user._json.user_metadata.name], function(err, rowS){
      if (err){console.log(err)};
      var dest = "/surveys/new/" + req.params.id;
      if (req.params.done == 0) {
        res.redirect(dest + "/question/0");
      } else if (req.params.done == 1) {
        res.redirect("/surveys");
      }
    })
  });


  
  return router;
}