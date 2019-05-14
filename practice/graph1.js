
    d3.csv("https://raw.githubusercontent.com/christinelangston/BigData11.154/master/languages_ftlaut_miami.csv", d3.autoType).then(function(data){

var margin = {top: 60, right: 20, bottom: 30, left: 50},
      width = 1000 - margin.left - margin.right,
      height = 565 - margin.top - margin.bottom;
    let value = null;

  
        // Initialize SVG object (using our pre-defined width and height)
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
  


    let x = d3.scaleTime()
      .domain(d3.extent(data, d => d.Month))
      .range([margin.left, width - margin.right])
  
    let y = d3.scaleLinear()
      .domain([0, 100]).nice() // d3.max(data, d => d["puerto rico: (Miami-Ft. Lauderdale FL)"])
      .range([height - margin.bottom, margin.top])
  
    let xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
  
    let yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(data.y))


          var color4 = d3.rgb(66, 231, 255);   
   


    var area_SP = d3.area()
    .x(function(d) { return x(d.Month); })
   // .y0(height - margin.bottom)
      .y0(function(d) { return y(d["French"]); } )
 // .y0(function(d) { return y(d["puerto rico: (Miami-Ft. Lauderdale FL)"]); } )
    .y1(function(d) { return y(d["Spanish"]) ; });

    let path =  svg.append("path")
      .data([data])
      .attr("class", "area")
    //  .style("stroke", "purple") // spanish 
        .attr("d", area_SP) //valueline
        .attr("opacity", 0.5)
        .attr("fill", color4)
        .on("mouseover", d => tooltipWithContent.style("visibility", "visible").text("Spanish") && SPline.attr("stroke", color4))
        .on("mousemove", d => tooltipWithContent.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text("Spanish"))
        .on("mouseout", d => tooltipWithContent.style("visibility", "hidden") && SPline.attr("stroke", "white"))
        .on("click", d => {
        const node = svg.node();
        node.value = "Spanish"; //value = value === d.properties.OBJECTID ? null : "Spanish";//d.properties.Name;
        node.dispatchEvent(new CustomEvent("input"));
 //       outline.attr("d", value ? path(d) : null);
          });


        svg.append("g")
          .call(xAxis);
      
      svg.append("g")
          .call(yAxis);

          var totalLength = path.node().getTotalLength()
          path
                .attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
             //   .transition()
               //   .duration(4000)
                //  .ease(d3.easeLinear)
                  .attr("stroke-dashoffset", 0)

          return Object.assign(svg.node(), {value: value});

})
