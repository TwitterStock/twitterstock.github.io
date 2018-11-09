//$.ajax({
//    url: "https://twitter-stock.appspot.com/query?kind=spy&start=2015-07-02-004&end=2015-07-02-008",
//    dataType: "json",
//    type: "GET",
//    success: function(data) {
//        console.log(data);
//        
//        
//        
//    },
//    error: function() {
//        console.log("ERROR!");
//    }
//});



var historySVG = d3.select("#history-chart");

d3.csv("./stock_data/2015.csv", function(error, dataset) {
    if(error) {
        console.error("Error while loading ./stock_data/2015.csv dataset.");
        console.error(error);
        return;
    }
    
    console.log(dataset);
    
    var nested = d3.nest()
        .key(function(d) {
            return d.month;
        })
        .key(function(d) {
            return d.day;
        })
        .entries(dataset);
    
    console.log(nested);
    
    var monthData = nested[0].values;
    
    console.log(monthData);
    
    var dayData = monthData[0].values;
    
    console.log(dayData);
    
    xExtent = d3.extent(dayData, function(d) {
        return parseFloat(d.num_minutes);
    })
    
    yExtent = d3.extent(dayData, function(d) {
        return parseFloat(d.close);
    });
    
    console.log(xExtent);
    console.log(yExtent);
    
    var xMin = d3.min(dayData, function(d) {
        return parseFloat(d.num_minutes);
    });
    
    var xMax = d3.max(dayData, function(d) {
        return parseFloat(d.num_minutes);
    });
    
    console.log(xMin);
    console.log(xMax);
    
    
    
    var zoom = d3.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);
    
    var xScale = d3.scaleLinear()
        .domain([xMin / 2, xMax / 2])
        .range([40, 1000]);
    
    var yScale = d3.scaleLinear()
        .domain(yExtent)
        .range([360, 40]);
    
    var yGrid = d3.axisLeft(yScale)
        .ticks(5)
        .tickSize(-960)
        .tickFormat("");
    
    var xAxis = d3.axisBottom(xScale)
        .ticks(5);
    
    var yAxis = d3.axisLeft(yScale)
        .ticks(6);
    
    var gx = historySVG.append("g")
        .attr("class", "axis x")
        .attr("transform", "translate(0, 360)")
        .call(xAxis);
    
    var gy = historySVG.append("g")
        .attr("class", "axis y")
        .attr("transform", "translate(40, 0)")
        .call(yAxis);
    
    historySVG.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(40, 0)")
        .call(yGrid);
    
    historySVG.append("text")
        .attr("class", "stock-name")
        .attr("transform", "translate(-5, 15)")
        .text("SPDR S&P 500 ETF TRUST");
    
    
    historySVG.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", "960")
        .attr("height", "320")
        .attr("transform", "translate(40, 40)");
    
    var lineInterpolate = d3.line()
        .x(function(d) {
            return xScale(parseFloat(d.num_minutes));
        })
        .y(function(d) {
            return yScale(parseFloat(d.close));
        });
    
    var lineG = historySVG.append("g")
        .attr("clip-path", "url(#clip)")
        .attr("class", "line");
    
    lineG.selectAll(".line-plot")
        .data([dayData])
        .enter()
        .append("path")
        .attr("class", "line-plot")
        .attr("d", lineInterpolate);
    
    
    
    historySVG.call(zoom);
    
    function zoomed() {
        d3.selectAll(".line-plot")
            .attr("transform", d3.event.transform);
        
        d3.selectAll(".line-plot").style("stroke-width", 2/d3.event.transform.k);
        
        gx.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
        
        gy.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
    }
        
    
});


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