$(document).ready(function() {
        survey_responseOverTime();
});

$('#graphSelect li a').click(function() {
  $('#menu1').text($(this).text());
  if ($(this).text() == "Students per School") {
    studentsPerSchool();
  } else if ($(this).text() == "GPA per School") {
    gpaPerSchool();
  } else if ($(this).text() == "GPA per Cohort") {
    gpaPerCohort();
  } else if ($(this).text() == "Survey Response over Time") {
    survey_responseOverTime();
  } else {
    emptyGraph();
  }
});

function survey_responseOverTime() {
  $('#Graph-Title').text("Survey Response Over Time");
  var surveyInfo = [];
  var counter = 0;
  {{#each survey_response}}
    counter++;
    var semesterRecordId = {{this.semester_record_id}};
    var surveyQuestionId = {{this.survey_question_id}};
    if (surveyInfo[semesterRecordId] == null) {
      surveyInfo[semesterRecordId] = {};
      if (surveyQuestionId <= 7) {
        surveyInfo[semesterRecordId].gritAvg = [{{this.response}}, 1];
      } else if (surveyQuestionId <= 13) {
        surveyInfo[semesterRecordId].probSolvAvg = [{{this.response}}, 1];
      } else if (surveyQuestionId <= 17) {
        surveyInfo[semesterRecordId].aseAvg = [{{this.response}}, 1];
      } else if (surveyQuestionId <= 25) {
        surveyInfo[semesterRecordId].tmwrkAvg = [{{this.response}}, 1];
      } else if (surveyQuestionId <= 31) {
        surveyInfo[semesterRecordId].scompAvg = [{{this.response}}, 1];
      } else if (surveyQuestionId <= 34) {
        surveyInfo[semesterRecordId].grwthAvg = [{{this.response}}, 1];
      } else if (surveyQuestionId <= 48) {
        surveyInfo[semesterRecordId].behaveAvg = [{{this.response}}, 1];
      }
    } else {
      var avg;
      if (surveyQuestionId <= 7) {
        if (surveyInfo[semesterRecordId].gritAvg == null) {
          surveyInfo[semesterRecordId].gritAvg = [{{this.response}}, 1];
        } else {
          avg = surveyInfo[semesterRecordId].gritAvg;
          avg[0] *= avg[1];
          avg[0] += {{this.response}};
          avg[0] /= avg[1] + 1;
          avg[1]++;
          surveyInfo[semesterRecordId].gritAvg = avg;
        }
      } else if (surveyQuestionId <= 13) {
        if (surveyInfo[semesterRecordId].probSolvAvg == null) {
          surveyInfo[semesterRecordId].probSolvAvg = [{{this.response}}, 1];
        } else {
          avg = surveyInfo[semesterRecordId].probSolvAvg;
          avg[0] *= avg[1];
          avg[0] += {{this.response}};
          avg[0] /= avg[1] + 1;
          avg[1]++; 
          surveyInfo[semesterRecordId].probSolvAvg = avg;
        }
      } else if (surveyQuestionId <= 17) {
        if (surveyInfo[semesterRecordId].aseAvg == null) {    
          surveyInfo[semesterRecordId].aseAvg = [{{this.response}}, 1];
        } else {
          avg = surveyInfo[semesterRecordId].aseAvg;
          avg[0] *= avg[1];
          avg[0] += {{this.response}};
          avg[0] /= avg[1] + 1;
          avg[1]++; 
        surveyInfo[semesterRecordId].aseAvg = avg;
        }
      } else if (surveyQuestionId <= 25) {
        if (surveyInfo[semesterRecordId].tmwrkAvg == null) {
          surveyInfo[semesterRecordId].tmwrkAvg = [{{this.response}}, 1];
        } else {
          avg = surveyInfo[semesterRecordId].tmwrkAvg;
          avg[0] *= avg[1];
          avg[0] += {{this.response}};
          avg[0] /= avg[1] + 1;
          avg[1]++;
          surveyInfo[semesterRecordId].tmwrkAvg = avg;

        }
      } else if (surveyQuestionId <= 31) {
        if (surveyInfo[semesterRecordId].scompAvg == null) {
          surveyInfo[semesterRecordId].scompAvg = [{{this.response}}, 1];
        } else {
          avg = surveyInfo[semesterRecordId].scompAvg;
          avg[0] *= avg[1];
          avg[0] += {{this.response}};
          avg[0] /= avg[1] + 1;
          avg[1]++;
          surveyInfo[semesterRecordId].scompAvg = avg;
        }
      } else if (surveyQuestionId <= 34) {
        if (surveyInfo[semesterRecordId].grwthAvg == null) {
          surveyInfo[semesterRecordId].grwthAvg = [{{this.response}}, 1];
        } else {
          avg = surveyInfo[semesterRecordId].grwthAvg;
          avg[0] *= avg[1];
          avg[0] += {{this.response}};
          avg[0] /= avg[1] + 1;
          avg[1]++;
          surveyInfo[semesterRecordId].grwthAvg = avg;
        }
      } else if (surveyQuestionId <= 48) {
        if (surveyInfo[semesterRecordId].behaveAvg == null) {
          surveyInfo[semesterRecordId].behaveAvg = [{{this.response}}, 1];
        } else {
          avg = surveyInfo[semesterRecordId].behaveAvg;
          avg[0] *= avg[1];
          avg[0] += {{this.response}};
          avg[0] /= avg[1] + 1;
          avg[1]++;
          surveyInfo[semesterRecordId].behaveAvg = avg;
        }
      }
      


      console.log("surveyQuestionId: " + surveyQuestionId);
    }
    
    
  {{/each}}
  console.log(surveyInfo[1]);
  console.log("7 | 13 | 17 | 25 | 31 | 34 | 44");
  for (x in surveyInfo[1]) {
    console.log(x + ": " + surveyInfo[1][x]);
  }
  var compositeAvg = [];
      for (x in surveyInfo) {
        
        if (surveyInfo[x] != null) {
          var sumAvg = 0;
          for (y in surveyInfo[x]) {
            sumAvg += surveyInfo[x][y][0];
          }
        }
        compositeAvg.push(sumAvg);
      }

      var data = [];
      var pos = 2;
      for (x in compositeAvg) {
          data.push([pos, compositeAvg[x]]);
          pos = pos + 3;
      }
      console.log("data: " + data);
      var schoolTicks = [];
      pos = 2;
      {{#each survey_response}}
          schoolTicks.push([pos, "Semester #{{this.semester_number}}"]);
          pos = pos + 3;
      {{/each}}
      console.log("schoolTicks: " + schoolTicks);

      $("#canvas_dahs").length && $.plot($("#canvas_dahs"), [
        data
      ], {
        series: {
          lines: {
            show: true,
            fill: true,
          },
          bars: {
            show: false,
            fill: true,
            barWidth: 2,
            align: "center"
          },
          points: {
            show:true,
            fill:true
            },
        },
        grid: {
          padding: 10,
          verticalLines: true,
          hoverable: true,
          clickable: true,
          tickColor: "#d5d5d5",
          borderWidth: 10,
          color: '#fff',
        },
        colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
        xaxis: {
          ticks: schoolTicks,
          tickColor: "rgba(51, 51, 51, 0.06)",
          tickSize: 5,
          axisLabel: "Date",
          axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 12,
          axisLabelFontFamily: 'Verda na, Arial'
        },
        yaxis: {
          axisLabelUseCanvas: true,
          tickColor: "rgba(51, 51, 51, 0.06)",
        },
        tooltip: false
      });
}

function gpaPerSchool() {
  $('#Graph-Title').text("GPA Per School");

  var gradeInfo = [];
  {{#each joins}}
    if (gradeInfo[{{this.school_id}}] == null) {
      gradeInfo[{{this.school_id}}] = {
        avg: {{this.semester_gpa}},
        gpas: [{{this.semester_gpa}}]
      };
    } else if (gradeInfo[{{this.school_id}}] != null) {
      var gradeInfoObj = gradeInfo[{{this.school_id}}];
      var newAvg = gradeInfoObj.avg * gradeInfoObj.gpas.length;
      newAvg += {{this.semester_gpa}};
      newAvg /= gradeInfoObj.gpas.length + 1;
      gradeInfo[{{this.school_id}}].gpas.push({{this.semester_gpa}});
      gradeInfo[{{this.school_id}}].avg = newAvg;
    }
  {{/each}}
  var data = []
  var pos = 2;
  for (x in gradeInfo) {
      data.push([pos, gradeInfo[x].avg]);
      pos = pos + 3;
  }
  var schoolTicks = [];
  pos = 2;
  {{#each schools}}
      schoolTicks.push([pos, "{{this.school_name}}"]);
      pos = pos + 3;
  {{/each}}
  $("#canvas_dahs").length && $.plot($("#canvas_dahs"), [
    data
  ], {
    series: {
      lines: {
        show: false,
        fill: false,
      },
      bars: {
        show: true,
        fill: true,
        barWidth: 2,
        align: "center"
      },
      points: {
        },
    },
    grid: {
      padding: 10,
      verticalLines: true,
      hoverable: true,
      clickable: true,
      tickColor: "#d5d5d5",
      borderWidth: 10,
      color: '#fff',
    },
    colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
    xaxis: {
      ticks: schoolTicks,
      tickColor: "rgba(51, 51, 51, 0.06)",
      tickSize: 5,
      axisLabel: "Date",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verda na, Arial'
    },
    yaxis: {
      axisLabelUseCanvas: true,
      tickColor: "rgba(51, 51, 51, 0.06)",
    },
    tooltip: false
  });
}

function gpaPerCohort() {
  $('#Graph-Title').text("GPA Per Cohort");

  var gradeInfo = [];
  {{#each joins}}
    if (gradeInfo[{{this.cohort_id}}] == null) {
      gradeInfo[{{this.cohort_id}}] = {
        avg: {{this.semester_gpa}},
        gpas: [{{this.semester_gpa}}]
      };
    } else if (gradeInfo[{{this.cohort_id}}] != null) {
      var gradeInfoObj = gradeInfo[{{this.cohort_id}}];
      var newAvg = gradeInfoObj.avg * gradeInfoObj.gpas.length;
      newAvg += {{this.semester_gpa}};
      newAvg /= gradeInfoObj.gpas.length + 1;
      gradeInfo[{{this.cohort_id}}].gpas.push({{this.semester_gpa}});
      gradeInfo[{{this.cohort_id}}].avg = newAvg;
    }
  {{/each}}
  var data = []
  var pos = 2;
  for (x in gradeInfo) {
      data.push([pos, gradeInfo[x].avg]);
      pos = pos + 3;
  }
  var schoolTicks = [];
  pos = 2;
  {{#each cohorts}}
      schoolTicks.push([pos, "{{this.cohort_year}}"]);
      pos = pos + 3;
  {{/each}}

  $("#canvas_dahs").length && $.plot($("#canvas_dahs"), [
    data
  ], {
    series: {
      lines: {
        show: false,
        fill: false,
      },
      bars: {
        show: true,
        fill: true,
        barWidth: 2,
        align: "center"
      },
      points: {
        },
    },
    grid: {
      padding: 10,
      verticalLines: true,
      hoverable: true,
      clickable: true,
      tickColor: "#d5d5d5",
      borderWidth: 10,
      color: '#fff',
    },
    colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
    xaxis: {
      ticks: schoolTicks,
      tickColor: "rgba(51, 51, 51, 0.06)",
      tickSize: 5,
      axisLabel: "Date",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verda na, Arial'
    },
    yaxis: {
      axisLabelUseCanvas: true,
      tickColor: "rgba(51, 51, 51, 0.06)",
    },
    tooltip: false
  });
}

function studentsPerSchool() {
  $('#Graph-Title').text("Students Per School");

  var counts = [];
  {{#each joins}}
  if (counts[{{this.school_id}}] == null) {
      counts[{{this.school_id}}] = 0;
  }
  counts[{{this.school_id}}]++;
  {{/each}}

  var data = []
  var pos = 2;
  for (x in counts) {
      data.push([pos, counts[x]]);
      pos = pos + 3;
  }
  var schoolTicks = [];
  pos = 2;
  {{#each schools}}
      schoolTicks.push([pos, "{{this.school_name}}"]);
      pos = pos + 3;
  {{/each}}

  $("#canvas_dahs").length && $.plot($("#canvas_dahs"), [
    data
  ], {
    series: {
      lines: {
        show: false,
        fill: false,
      },
      bars: {
        show: true,
        fill: true,
        barWidth: 2,
        align: "center"
      },
      points: {
        },
    },
    grid: {
      padding: 10,
      verticalLines: true,
      hoverable: true,
      clickable: true,
      tickColor: "#d5d5d5",
      borderWidth: 10,
      color: '#fff',
    },
    colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
    xaxis: {
      ticks: schoolTicks,
      tickColor: "rgba(51, 51, 51, 0.06)",
      tickSize: 5,
      axisLabel: "Date",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verda na, Arial'
    },
    yaxis: {
      axisLabelUseCanvas: true,
      tickColor: "rgba(51, 51, 51, 0.06)",
    },
    tooltip: false
  });
}

function emptyGraph() {
  $('#Graph-Title').text("Empty Graph");


  $("#canvas_dahs").length && $.plot($("#canvas_dahs"), [
    []
  ], {
    series: {
      lines: {
        show: false,
        fill: false,
      },
      bars: {
        show: true,
        fill: true,
        barWidth: 2,
        align: "center"
      },
      points: {
        },
    },
    grid: {
      padding: 10,
      verticalLines: true,
      hoverable: true,
      clickable: true,
      tickColor: "#d5d5d5",
      borderWidth: 10,
      color: '#fff',
    },
    colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
    xaxis: {
      ticks: 2,
      tickColor: "rgba(51, 51, 51, 0.06)",
      tickSize: 5,
      axisLabel: "Date",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verda na, Arial'
    },
    yaxis: {
      axisLabelUseCanvas: true,
      tickColor: "rgba(51, 51, 51, 0.06)",
    },
    tooltip: false
  });
}