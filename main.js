var margin = {top: 30, right: 20, bottom: 30, left: 40},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
var opt_x = "displacement"
var opt_y = "mpg"
window.column_headings = [];

// set x value
var xValue = function(d) { 
    var sel=document.getElementById("sel-x");
    var opt=sel.options[sel.selectedIndex].text;
    if(opt=="displacement")
      return d.displacement;
    else if(opt=="cylinders")
      return d.cylinders;
    else if(opt=="horsepower")
      return d.horsepower;
    else if(opt=="weight")
      return d.weight;
    else if(opt=="acceleration")
      return d.acceleration;
    else if(opt=="model year")
      return d.model_year;
    else
      return d.mpg
      }, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
	
// set y value
var yValue = function(d) {
    var sel=document.getElementById("sel-y");
    var opt=sel.options[sel.selectedIndex].text;
    if(opt=="displacement")
      return d.displacement;
    else if(opt=="cylinders")
      return d.cylinders;
    else if(opt=="horsepower")
      return d.horsepower;
    else if(opt=="weight")
      return d.weight;
    else if(opt=="acceleration")
      return d.acceleration;
    else if(opt=="model year")
      return d.model_year;
    else
      return d.mpg}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");
	
// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var text = svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .text(opt_x.concat(" vs. ").concat(opt_y))
	
// load data from given csv
d3.csv("car.csv", function(error, data) {
	
//dynamically add list options
if(column_headings.length==0){
	column_headings = d3.keys(data[0]);
	for(i=1;i<column_headings.length-1;i+=1){
		d3.select("#sel-x").append("option").attr("value",column_headings[i]).text(column_headings[i]);
		d3.select("#sel-y").append("option").attr("value",column_headings[i]).text(column_headings[i]);
	}
}
  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.mpg = +d.mpg;
    d.cylinders = +d.cylinders;
    d.displacement = +d.displacement;
    d.horsepower = +d.horsepower;
    d.weight = +d.weight;
    d.acceleration = +d.acceleration;
    d.model_year = +d["model.year"]
});
  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-10, d3.max(data, xValue)+10]);
  yScale.domain([d3.min(data, yValue)-10, d3.max(data, yValue)+10]);
  
  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text(opt_x);
  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(opt_y);
  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", "black") 
      .on("mouseover", function(d) {
          d3.select('text').text (d["name"] );
          
      })
      .on("mouseout", function(d) {
          d3.select('text').text(opt_x.concat(" vs. ").concat(opt_y));
      });
});
function plot() {
  d3.select("svg").remove();
  var mpgmin=parseInt(document.getElementById("mpg-min").value,10);
  var mpgmax=parseInt(document.getElementById("mpg-max").value,10);
  var margin = {top: 30, right: 20, bottom: 30, left: 40},
      width = 300 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;
  var sel=document.getElementById("sel-x");
  var opt_x=sel.options[sel.selectedIndex].text;
  var sel=document.getElementById("sel-y");
  var opt_y=sel.options[sel.selectedIndex].text;
  // setup x 
  var xValue = function(d) { 
      var sel=document.getElementById("sel-x");
      var opt=sel.options[sel.selectedIndex].text;
      if(opt=="displacement")
        return d.displacement;
      else if(opt=="cylinders")
        return d.cylinders;
      else if(opt=="horsepower")
        return d.horsepower;
      else if(opt=="weight")
        return d.weight;
      else if(opt=="acceleration")
        return d.acceleration;
      else if(opt=="model year")
        return d.model_year;
      else
        return d.mpg}, // data -> value
      xScale = d3.scale.linear().range([0, width]), // value -> display
      xMap = function(d) {
          return xScale(xValue(d));}, // data -> display
      xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  // setup y
  var yValue = function(d) {
      var sel=document.getElementById("sel-y");
      var opt=sel.options[sel.selectedIndex].text;
      if(opt=="displacement")
        return d.displacement;
      else if(opt=="cylinders")
        return d.cylinders;
      else if(opt=="horsepower")
        return d.horsepower;
      else if(opt=="weight")
        return d.weight;
      else if(opt=="acceleration")
        return d.acceleration;
      else if(opt=="model year")
        return d.model_year;
      else
        return d.mpg}, // data -> value
      yScale = d3.scale.linear().range([height, 0]), // value -> display
      yMap = function(d) { 
          return yScale(yValue(d));},
       // data -> display
      yAxis = d3.svg.axis().scale(yScale).orient("left");
  // add the graph canvas to the body of the webpage
  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var text = svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .text(opt_x.concat(" vs. ").concat(opt_y))
  // load data
  d3.csv("car.csv", function(error, data) {
    // change string (from CSV) into number format
    data.forEach(function(d) {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d.model_year = +d["model.year"]
  //    console.log(d);
  });
    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(data, xValue)-10, d3.max(data, xValue)+10]);
    yScale.domain([d3.min(data, yValue)-10, d3.max(data, yValue)+10]);
 
    // x-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text(opt_x);
    // y-axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(opt_y);
    // draw dots
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle").filter(function(d) {return d.mpg>=mpgmin && d.mpg<=mpgmax;})
      .attr("class", "dot")
      .attr("r", 3)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", "black") 
      .on("mouseover", function(d) {
          d3.select('text').text (d["name"] );
          
      })
      .on("mouseout", function(d) {
          d3.select('text').text(opt_x.concat(" vs. ").concat(opt_y));
      });
  });
}