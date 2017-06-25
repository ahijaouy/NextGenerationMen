module.exports = function(connection) {

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
  return {getSurveyQuestionsAndCategories:getSurveyQuestionsAndCategories};
}