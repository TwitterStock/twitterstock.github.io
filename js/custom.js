$.ajax({
    url: "https://twitter-stock.appspot.com/query?kind=spy&start=2015-07-02-004&end=2015-07-02-008",
    dataType: "json",
    type: "GET",
    success: function(data) {
        console.log(data);
        
        
        
    },
    error: function() {
        console.log("ERROR!");
    }
});



var svg = d3.select("svg");

//d3.csv("./stock_data/2015.csv", function(error, dataset) {
//    if(error) {
//        console.error("Error while loading ./stock_data/2015.csv dataset.");
//        console.error(error);
//        return;
//    }
//    
//    console.log(dataset);
//    
//    var nested = d3.nest()
//        .key(function(d) {
//            return d.month;
//        })
//        .key(function(d) {
//            return d.day;
//        })
//        .entries(dataset);
//    
//    console.log(nested);
//    
//    var monthData = nested[0].values;
//    
//    console.log(monthData);
//    
//    var dayData = monthData[0].values;
//    
//    console.log(dayData);
//    
//    xExtent = d3.extent(dayData, function(d) {
//        return parseFloat(d.num_minutes);
//    })
//    
//    yExtent = d3.extent(dayData, function(d) {
//        return parseFloat(d.close);
//    });
//    
//    console.log(xExtent);
//    console.log(yExtent);
//    
//    var xScale = d3.scaleLinear()
//        .domain(xExtent)
//        .range([50, 1000]);
//    
//    yScale = d3.scaleLinear()
//        .domain(yExtent)
//        .range([360, 50]);
//    
//    var lineInterpolate = d3.line()
//        .x(function(d) {
//            return xScale(parseFloat(d.num_minutes));
//        })
//        .y(function(d) {
//            return yScale(parseFloat(d.close));
//        });
//    
//    var lineG = svg.append("g")
//        .attr("class", "line");
//    
//    lineG.selectAll(".line-plot")
//        .data([dayData])
//        .enter()
//        .append("path")
//        .attr("class", "line-plot")
//        .attr("d", lineInterpolate);
//    
//    var xAxis = d3.axisBottom(xScale)
//        .ticks(5);
//    
//    var yAxis = d3.axisLeft(yScale)
//        .ticks(5);
//    
//    svg.append("g")
//        .attr("class", "axis x")
//        .attr("transform", "translate(0, 360)")
//        .call(xAxis);
//    
//    svg.append("g")
//        .attr("class", "axis y")
//        .attr("transform", "translate(50, 0)")
//        .call(yAxis);
//    
//    svg.append("text")
//        .attr("class", "stock-name")
//        .attr("transform", "translate(0, 25)")
//        .text("SPDR S&P 500 ETF TRUST");
//        
//    
//});

$("#predictionPage").click(function() {
    $(this).css("color", "#5a64a1");
    $("#predictionLine").css("opacity", "1");
    $("#predictionSection").css("display", "block");
    
    $("#historyPage").css("color", "#62667a");
    $("#historyLine").css("opacity", "0");
    $("#historySection").css("display", "none");
    $("#analysisPage").css("color", "#62667a");
    $("#analysisLine").css("opacity", "0");
    $("#analysisSection").css("display", "none");
});

$("#historyPage").click(function() {
    $(this).css("color", "#5a64a1");
    $("#historyLine").css("opacity", "1");
    $("#historySection").css("display", "block");
    
    $("#predictionPage").css("color", "#62667a");
    $("#predictionLine").css("opacity", "0");
    $("#predictionSection").css("display", "none");
    $("#analysisPage").css("color", "#62667a");
    $("#analysisLine").css("opacity", "0");
    $("#analysisSection").css("display", "none");
});

$("#analysisPage").click(function() {
    $(this).css("color", "#5a64a1");
    $("#analysisLine").css("opacity", "1");
    $("#analysisSection").css("display", "block");
    
    $("#predictionPage").css("color", "#62667a");
    $("#predictionLine").css("opacity", "0");
    $("#predictionSection").css("display", "none");
    $("#historyPage").css("color", "#62667a");
    $("#historyLine").css("opacity", "0");
    $("#historySection").css("display", "none");
});