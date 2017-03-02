
function addMoreData(rawData){
    for (var i = 0; i < k; i++) {
        var datum = {};
        //use id to differentiate different data piece with the same value
        datum.id = rawData.length;
        // the actual value
        datum.value = Math.ceil(Math.random()*100);
        rawData.push(datum);
    }
}

//-----------geterate initial k color-------------
// map a number to color
var colorMap = d3.scale.linear().domain([0,100]).range(["#FACD50","#507DFA"]);
var k = 40;
var rawData = [];
addMoreData(rawData);

//-------------- ENTER-UPDATE-EXIT body ----------
function updateDataAndVis(data, vis) {

    //set data
    var circles = vis.selectAll("circle").data(data, function(d){
        //also set the data value as the key so that when being sorted, everything can be sorted by that key
        return d.id;
    });


    // ========> ENTER!
    //append circle elements for new data
    circles.enter()
        .append("circle")
        //set center x value
        .attr("cx", function(d, index){
            //put 10 circles per row
            return index % k * 40 + 20;
        })
        //set center y value
        .attr("cy", function(d, index){
            //switch to next row every 10 circles
            return Math.ceil((index+1)/k)*40 + 10;
        })
        //set initial radius to r
        .attr("r", 0)
        // set initial stroke to none
        .attr("stroke", "none")
        .attr("fill", function(d){
            //return fill color based on data
            return colorMap(d.value);
        })
        .attr("value", function(d){return d})
        .transition()
        .delay(function(d, index){
            //wait 200 more millisecond so that the previous animation can finish
            //the index is the index of the element in the whole array, rather than in the newly added part
            return (index-(Math.ceil((index+1)/k)-1)*k)*200;
        })
        .duration(200)
        .attr("r", 20);

    // ========> UPDATE!
    // sort all circles based on color
    circles
        // sort with customized comparator
        // If negative, then a should be before b;
        .sort(function(a, b){
            return a.value - b.value;
        })
        .transition()
        .delay(200*k)
        .duration(1000)
        // .attr("cx", function(d, index) {return index * 40 + 20})
        // .attr("cy", 20);
        .attr("cx", function(d, index){
            //put 10 circles per row
            return index % k * 40 + 20;
        })
        //set center y value
        .attr("cy", function(d, index){
            //switch to next row every 10 circles
            return Math.ceil((index+1)/k)*40 + 10;
        });

    // ========> EXIT!
    circles.exit().remove();
}

//------------MAIN----------------
var button = d3.select("body")
    .append("button")
    .attr("type", "button")
    .text("click me to add more data")
    .on("click", function() {
        addMoreData(rawData);
        updateDataAndVis(rawData, vis);
    });

d3.select("body").append("br");

var vis = d3.select("body")
    .append("svg")
    .attr("width", 1500)
    .attr("height", 500);

// console.log(vis);
updateDataAndVis(rawData, vis);
