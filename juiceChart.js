var data = [];
var juiceCounts = {};

d3.json("./juice_orders.json", function(error, data) {
  var data = data;
  data = data.filter(function(data){return !(data.drinkName=='CTL'||data.drinkName=='Register User'||data.drinkName=='ctl'||data.drinkName=='Fruits'||data.isFruit)})
  data.forEach(function(juice){juiceCounts[juice.drinkName] = juiceCounts[juice.drinkName]+1 || 0; });
  visualizeIt(juiceCounts);
});

var visualizeIt = function(data){
  var width = 960,
    height = 500;

  var x = d3.scale.ordinal()
    .range([0,width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
       .scale(x)
       .orient("bottom");

   var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

  var chart  = d3.select('popularity_chart')
               .data(Object.keys(data))
               .enter()
               .append('svg')
               .attr("width",40)
               .attr("height",1000);


          chart.append("text")
               .attr("x",0)
               .attr("y",700)
               .text(function(d) { return d; })
               .attr("transform","rotate(90 35 680)")

          chart.append("rect")
               .attr("x",10)
               .attr("y",10)
               .attr("class","rect")
               .attr("width",20)
               .attr("height",function(d){return data[d]/8})
               .attr("transform","rotate(180 20 300)")
               .style("fill","lightseagreen");

         chart.append("g")
              .attr("class", "xaxis")
              .attr("transform", "translate(0,600)")
              .call(xAxis);

        chart.append("g")
             .attr("class", "yaxis")
             .attr("transform", "translate(600,0)")
             .call(yAxis);
}
