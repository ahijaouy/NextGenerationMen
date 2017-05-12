var express       = require('express'),
    authenticate  = require('connect-ensure-login').ensureLoggedIn(),
    router        = express.Router(),
    mysql         = require('mysql'),
    dbconfig      = {host: process.env.DATABASE_HOST, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD, database: process.env.DATABASE},
    connection    = mysql.createConnection(dbconfig);  

connection.query('USE ' + process.env.DATABASE);

//Deafult route to Survey page
router.route('/')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res) {
    var query1 = "SELECT * FROM survey";
    var query2 = "SELECT COUNT(*) FROM survey_category"
    connection.query("SELECT * FROM survey", function(err, rows){
      if (err) {console.log(err)}
      res.render('surveys', { surveys: rows, user: req.user._json});
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
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res) {
    var query1 = "SELECT survey_name FROM survey where survey_id=" + req.params.id + ";";
    var query2 = "SELECT COUNT(*) FROM survey_category"
    connection.query(query1, function(err, surveyName){
      if (err) {console.log(err)}
      getSurveyQuestionsAndCategories(req.params.id, function(compositeList) {
        res.render('viewSurvey', { composite: compositeList, survey_name: surveyName[0].survey_name, user: req.user._json});
      });
    });
  });

//Route for deleting surveys
router.route('/:id/delete')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res) {
    var query1 = "DELETE FROM survey where survey_id=" + req.params.id + ";";
    connection.query(query1, function(err, surveyName){
      if (err) {console.log(err)}
      res.redirect('/surveys');
    });
  });

//Route for editing surveys
router.route('/:id/edit')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res) {
    var query1 = "SELECT survey_name, survey_id FROM survey where survey_id=" + req.params.id + ";";
    var query2 = "SELECT COUNT(*) FROM survey_category"
    connection.query(query1, function(err, surveyName){
      if (err) {console.log(err)}
      getSurveyQuestionsAndCategories(req.params.id, function(compositeList) {
        res.render('editSurvey', 
          { composite: compositeList, survey_name: surveyName[0].survey_name, survey_id:surveyName[0].survey_id, user: req.user._json});
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
  .all(authenticate, function(req, res, next) {next();})
  .get(function(req, res) {
    var query1 = "SELECT survey_category_name FROM survey_category "
      + "where survey_category_id=" + req.params.categoryId + ";";
    var query2 = "SELECT survey_name FROM survey where survey_id=" + req.params.surveyId + ";";

    connection.query(query1, function(err1, rows1){
      if (err1) {console.log(err1)};
      connection.query(query2, function(err2, rows2){
        res.render('editSurveyCategory', { survey: rows2[0], current: rows1[0], user: req.user._json});
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
  .all(authenticate, function(req, res, next) {next();})
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
              user: req.user._json
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
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res) {
    var query1 = "SELECT survey_category_name FROM survey_category "
      + "where survey_id=" + req.params.id + ";";
    var query2 = "SELECT survey_name, survey_id FROM survey where survey_id=" + req.params.id + ";";

    connection.query(query1, function(err1, rows1){
      if (err1) {console.log(err1)};
      connection.query(query2, function(err2, rows2){
        res.render('addSurveyCategory', { survey: rows2[0], categories: rows1, user: req.user._json});
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
  .all(authenticate, function (req, res, next) {next();})
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
            { survey: rows2[0], categories: rows1, user: req.user._json, composite: compositeList});
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


 /***************************************************************
 * HELPER METHODS START HERE
 ****************************************************************/


/**
 * Helper Method to get the questions for a specific category
 *
 * parameters:
 * categoryId -> from DB the category_id to get questions for
 * array      -> variable to pass in all the questions to. 
 * callback   -> method to pass parameters to
 */
var getQuestionsFromCategory = function(categoryId, array, callback) {

  var query = "SELECT  question, survey_question_id FROM survey_question where survey_category_id=" + categoryId + ";";
  
  connection.query(query, function(err, questions) {
    if (err) {console.log(err)};
    array.push(questions);
    callback();
  });
};


/**
 * Helper Method to get the categories for a specific survey
 *
 * parameters:
 * surveyId -> from DB the survey_id to get categories for
 * callback -> method to pass parameters to
 */
var getCategoriesFromSurvey = function(surveyId,callback) {


  var query = "SELECT  survey_category_name, survey_category_id FROM survey_category where survey_id=" + surveyId + ";";
  
  connection.query(query, function(err, categories) {
    if (err) {console.log(err)};
    
    callback(categories);
  });
};


/**
 * Helper Method to compile all the survey categories and questions
 * into a JSON object to be parsed by handelbars.
 *
 * parameters:
 * surveyId -> from DB the survey_id to get categories/questions for
 * callback -> method to pass parameters to
 */
var getSurveyQuestionsAndCategories = function(surveyId, callback) {

  //temp vars
  var compositeList = []; 
  var questionsList = [];

  getCategoriesFromSurvey(surveyId, function(categories) {
    var j = 0;

    for (var i = 0; i < categories.length; i++) {
      getQuestionsFromCategory(categories[i].survey_category_id, questionsList, function(){
        
        var toAdd = {
          category: categories[j].survey_category_name, 
          categroyId:categories[j].survey_category_id, 
          question: questionsList[j]
        };
        j++;
        compositeList.push(toAdd);

        //after going through full list initiate callback
        if (questionsList.length == i) {

          callback(compositeList)
        }
      });
    }
  });
  
}
  

module.exports = router;