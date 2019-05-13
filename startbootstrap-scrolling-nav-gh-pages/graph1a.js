//fill ins
d3.csv("https://raw.githubusercontent.com/christinelangston/BigData11.154/master/compiled_trends_miami.csv", d3.autoType).then(function(dataTerm){
    var margin = {top: 60, right: 20, bottom: 30, left: 50},
        width =  1000 - margin.left - margin.right,
        height = 665 - margin.top - margin.bottom;
    let value = null;
    var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    let x = d3.scaleTime()
        .domain(d3.extent(dataTerm, d => d.Month))
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
            .text(dataTerm.y))
    
    //define areas for each language
    
    var area_SP = d3.area()
      .x(function(d) { return x(d.Month); })
        .y0(function(d) { return y(d["French"]); } )
       // .y0(height - margin.bottom) // .y0(function(d) { return y(d["puerto rico: (Miami-Ft. Lauderdale FL)"]); } )
      .y1(function(d) { return y(d[dataTerm.columns[1]]) ; });
    
    var area_FR = d3.area()
      .x(function(d) { return x(d.Month); })
     //   .y0(height - margin.bottom-3)
          .y0(function(d) { return y(d["Russian"]); } )
  
     // .y0(function(d) { return y(d["puerto rico: (Miami-Ft. Lauderdale FL)"] - 10); } )
      .y1(function(d) { return y(d["French"]); });
    
    
    var area_CH = d3.area()
      .x(function(d) { return x(d.Month); }) //.y0(height - margin.bottom)
        .y0(function(d) { return y(d["Russian"]); } )
      .y1(function(d) { return y(d["Chinese"]); });
    
      var area_RU = d3.area()
      .x(function(d) { return x(d.Month); })
     // .y0(height - margin.bottom - 3)
            .y0(function(d) { return y(d["Portuguese"]); } )
  
    //    .y0(function(d) { return y(d["russian: (Miami-Ft. Lauderdale FL)"] - 10); }) 
      .y1(function(d) { return y(d["Russian"]); });
    
        var area_PO = d3.area()
      .x(function(d) { return x(d.Month); })
      .y0(height - margin.bottom -3)
    //    .y0(function(d) { return y(d["russian: (Miami-Ft. Lauderdale FL)"] - 10); }) 
      .y1(function(d) { return y(d["Portuguese"]); });
    
      var area_FCR = d3.area()
      .x(function(d) { return x(d.Month); })
      .y0(height - margin.bottom)
    //    .y0(function(d) { return y(d["russian: (Miami-Ft. Lauderdale FL)"] - 10); }) 
      .y1(function(d) { return y(d["French Criole"]) - 3 ; });         
    
    
      var line_SP = d3.line()
      .defined(d => !isNaN(d["Spanish"]))
      .x(function(d) { return x(d.Month); })
      .y(function(d) { return y(d["Spanish"]); });
     
    let line_FR = d3.line()
      .defined(d => !isNaN(d["French"]))
      .x(d => x(d.Month))  
      .y(d => y(d["French"]))
    
     let line_CH = d3.line()
      .defined(d => !isNaN(d["Chinese"]))
      .x(d => x(d.Month))
      .y(d => y(d["Chinese"]))
  
     let line_RU = d3.line()
      .defined(d => !isNaN(d["Russian"]))
      .x(d => x(d.Month))
      .y(d => y(d["Russian"]))
    
   var line_PO = d3.line()
   .defined(d => !isNaN(d["Portuguese"]))
    .x(d => x(d.Month))
      .y(function(d) { return y(d["Portuguese"]); });
    
      var line_FCR = d3.line()
      .defined(d => !isNaN(d["French Criole"]))
       .x(d => x(d.Month))
      .y(function(d) { return y(d["French Criole"] + 0.5); });     
     
  
      
    var tooltip = d3.select("#tooltip");
  var tooltipWithContent = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "14px")
        .style("z-index", "10")
        .style("visibility", "hidden")
       // .style("opacity", 0.6)
       // .style("background", "white")
        .style("padding", "3px"); 
    //d3.selectAll("#tooltip, #tooltip *");
    
    
  
  function equalToEventTarget() {
      return this == d3.event.target;
  }
  
  d3.select("body").on("click",function(){
      var outside = tooltipWithContent.filter(equalToEventTarget).empty();
      if (outside) {
          tooltip.classed("hidden", true);
         value = null;
      }
  });
    
    tooltipWithContent   
    tooltip 
   
      var color1 = d3.rgb(195, 56, 255);
     var color2 = d3.rgb(112, 60, 232);
     var color3 = d3.rgb(79, 97, 255);
     var color4 = d3.rgb(66, 231, 255);
    var color5 = "steelblue"
    var color6 = "red"
  
  
     var t1 = textures.circles()
    .size(5)
    .radius(2)
    .fill(color1)
    
     var t2 = textures.circles()
    .size(5)
    .radius(4)
    .fill(color2)
     
      var t3 = textures.circles()
    .size(5)
    .radius(1.5)
    .fill(color3)
    
       var t4 = textures.circles()
    .size(5)
    .radius(1)
    .fill(color4)
      // .fill("white")
      // .background(color4)
    
  
    //   var t4 =  textures.lines()
    // .size(4)
    // .strokeWidth(1)
    //   .stroke(color4);
       
        var t5 = textures.circles()
    .size(5)
    .radius(1)
    .fill(color5)
        
        
         var t6 = textures.circles()
    .size(5)
    .radius(1)
    .fill(color6)
       
       
       svg.call(t1);
    svg.call(t2);
    svg.call(t3);
    svg.call(t4);
      svg.call(t5);
      svg.call(t6);
  
  //     var rectangle = svg.append("rect")
  //             .attr("x", margin.left+ 10)
  //              .attr("y", margin.right)
  //               .attr("width", 45)
  //               .attr("height", 20)
  //              .style("fill", "black" )
  //              .style("opacity", 0.1)
  //              .on("click", d => {
  //            const node = svg.node();
  //         node.value = null; //value = value === d.properties.OBJECTID ? null : "Spanish";//d.properties.Name;
  //         node.dispatchEvent(new CustomEvent("input"));
  //     });
  
    
  //      svg.append("text")
  //           .attr("x", margin.left+ 20)
  //            .attr("y", margin.right+13)
  //           .text("reset")
  //           .attr("font-family", "sans-serif")
  //           .attr("font-size", "10px");
    
    
    var FRline = svg.append("path")
      .attr("d", line_FR(dataTerm))
        .attr("class", "line")
      .attr("stroke", "none") //puerto rico 
      .attr("stroke-width", "1.5")
      .attr("fill", "none")
    .attr("opacity", "0.5");
    
      var CHline = svg.append("path")
      .attr("d", line_CH(dataTerm))
        .attr("class", "line")
      .attr("stroke", "none") //puerto rico 
      .attr("stroke-width", "1.5")
      .attr("fill", "none")
        .attr("opacity", "0.5");
  
    
    
     var SPline = svg.append("path")
      .attr("d", line_SP(dataTerm))
        .attr("class", "line")
      .attr("stroke", "none") //puerto rico 
      .attr("stroke-width", "1.5")
      .attr("fill", "none")  .attr("opacity", "0.5");
  
    
      var POline = svg.append("path")
      .attr("d", line_PO(dataTerm))
        .attr("class", "line")
      .attr("stroke", "white") //puerto rico 
      .attr("stroke-width", "1.5")
      .attr("fill", "none")  .attr("opacity", "0.5");
  
    
      var FCRline = svg.append("path")
      .attr("d", line_FCR(dataTerm))
        .attr("class", "line")
      .attr("stroke", "white") //puerto rico 
      .attr("stroke-width", "1.5")
      .attr("fill", "none")  .attr("opacity", "0.5");
  
    
      var RUline = svg.append("path")
      .attr("d", line_RU(dataTerm))
        .attr("class", "line")
      .attr("stroke", "white") //puerto rico 
      .attr("stroke-width", "1.5")
      .attr("fill", "none")  .attr("opacity", "0.5");
  
    
    
    //intiate spanish area 
     let path =  svg.append("path")
        .data([dataTerm])
        .attr("class", "area")
        .attr("d", area_SP) //valueline
         .attr("opacity", 0.5)
        .attr("fill", color4)
       .style("fill", t4.url())
         .on("mouseover", d => tooltipWithContent.style("visibility", "visible").text("Spanish") && SPline.attr("stroke", color4))
      .on("mousemove", d => tooltipWithContent.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text("Spanish"))
      .on("mouseout", d => tooltipWithContent.style("visibility", "hidden") && SPline.attr("stroke", "white"))
    .on("click", d => {
          const node = svg.node();
          node.value = "Spanish"; //value = value === d.properties.OBJECTID ? null : "Spanish";//d.properties.Name;
          node.dispatchEvent(new CustomEvent("input"));
   //       outline.attr("d", value ? path(d) : null);
            });
         
  
         
         svg.append("path") // French
         .data([dataTerm])
         .attr("class", "area")
         .attr("d", area_FR)
          .attr("opacity", 0.5)
          .attr("fill", color1)
         .style("fill", t1.url())
          .on("mouseover", d => tooltipWithContent.style("visibility", "visible").text("French") && FRline.attr("stroke", color1))
       //  .on("mouseover", d => PRline.attr("stroke", color1))
          .on("mousemove", d => tooltipWithContent.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text("French"))
          .on("mouseout", d => tooltipWithContent.style("visibility", "hidden") && FRline.attr("stroke", "white"))
          .on("click", d => {   value = "French";
          const node = svg.node();
          node.value = "French"; //value = value === d.properties.OBJECTID ? null : "Spanish";//d.properties.Name;
          node.dispatchEvent(new CustomEvent("input"));;
      });
    
    
      //return area chinese
    svg.append("path")
         .data([dataTerm])
         .attr("class", "area")
         .attr("d", area_CH)
          .attr("opacity", 0.5)
      //    .attr("fill", color2)
         .style("fill", t3.url())
      .on("mouseover", d => tooltipWithContent.style("visibility", "visible").text("Chinese") && CHline.attr("stroke", color2))
   //     .on("mouseover", d => rectangle.style("fill", "red"))
      .on("mousemove", d => tooltipWithContent.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text("Chinese"))
      .on("mouseout", d => tooltipWithContent.style("visibility", "hidden") && CHline.attr("stroke", "white"))
          .on("click", d => {
            value = "Chinese";
          const node = svg.node();
          node.value = "Chinese"; //value = value === d.properties.OBJECTID ? null : "Spanish";//d.properties.Name;
          node.dispatchEvent(new CustomEvent("input"));;
      });
  
    
        
        
    
         svg.append("path") // Russian
         .data([dataTerm])
         .attr("class", "area")
         .attr("d", area_RU)
          .attr("opacity", 0.5)
          .attr("fill", color3)
           .style("fill", t3.url())
          .on("mouseover", d => tooltipWithContent.style("visibility", "visible").text("Russian") && RUline.attr("stroke", color3))
          .on("mousemove", d => tooltipWithContent.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text("Russian"))
          .on("mouseout", d => tooltipWithContent.style("visibility", "hidden") && RUline.attr("stroke", "white"))
          .on("click", d => {   value = "Russian";
          const node = svg.node();
          node.value = "Russian"; //value = value === d.properties.OBJECTID ? null : "Spanish";//d.properties.Name;
          node.dispatchEvent(new CustomEvent("input"));;
      });
    
    
             
         svg.append("path") // French Criole
         .data([dataTerm])
         .attr("class", "area")
         .attr("d", area_FCR)
          .attr("opacity", 0.5)
          .attr("fill", color6)
          .on("mouseover", d => tooltipWithContent.style("visibility", "visible").text("French Criole") && FCRline.attr("stroke", color6))
          .on("mousemove", d => tooltipWithContent.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text("French Criole"))
          .on("mouseout", d => tooltipWithContent.style("visibility", "hidden") && FCRline.attr("stroke", "white"))
          .on("click", d => {   value = "French Criole";
          const node = svg.node();
          node.value = "French Criole"; //value = value === d.properties.OBJECTID ? null : "Spanish";//d.properties.Name;
          node.dispatchEvent(new CustomEvent("input"));;
      });
    
  
           svg.append("path") // Portuguese
         .data([dataTerm])
         .attr("class", "area")
         .attr("d", area_PO)
          .attr("opacity", 0.5)
          .attr("fill", color5)
           .style("fill", t5.url())
  
          .on("mouseover", d => tooltipWithContent.style("visibility", "visible").text("Portuguese") && POline.attr("stroke", color5))
          .on("mousemove", d => tooltipWithContent.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text("Portuguese"))
          .on("mouseout", d => tooltipWithContent.style("visibility", "hidden") && POline.attr("stroke", "white"))
          .on("click", d => {   value = "Portuguese";
          const node = svg.node();
          node.value = "Portuguese"; //value = value === d.properties.OBJECTID ? null : "Spanish";//d.properties.Name;
          node.dispatchEvent(new CustomEvent("input"));;
      });
    
   
    
        // svg.append("path")
        //  .data([data])
        //  .attr("class", "area")
        //  .attr("d", area_SP)
        //   .attr("opacity", 0.5)
        // .attr("fill", color3);
    
  //    svg.append("path")
  //        .data([data])
  //        .attr("class", "area")
  //        .attr("d", area_RU)
  //         .attr("opacity", 0.5)
  //       .attr("fill", color4);
    
     
    
     // let path1 = svg.append("path1")
     //  .attr("d", line(data))
     //  .attr("stroke", "steelblue")
     //  .attr("stroke-width", "1.5")
     //  .attr("fill", "none");
    
  //     const tooltip = svg.append("g");
  
  //    svg.on("touchmove mousemove", function() {
  //     const {date, value} = bisect(d3.mouse(this)[0]);
  
  //     tooltip
  //         .attr("transform", `translate(${x(Month)},${y(value)})`)
  //         .call(callout, `${value.toLocaleString(undefined, {style: "currency", currency: "USD"})}
  // ${date.toLocaleString(undefined, {month: "short", day: "numeric", year: "numeric"})}`);
  //   });
  
  //   svg.on("touchend mouseleave", () => tooltip.call(callout, null));
    
  
  
    
  
    
    
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