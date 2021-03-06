//fill ins
d3.csv("https://raw.githubusercontent.com/christinelangston/BigData11.154/master/compiled_trends_miami.csv", d3.autoType).then(function(dataTerm){
    var margin = {top: 60, right: 20, bottom: 30, left: 50},
        width =  1100 - margin.left - margin.right,
        height = 665 - margin.top - margin.bottom;
    let value = null;

    var chartcontainer = d3.select("#chart");
    var svg = chartcontainer//d3.select("body")
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
    
      var totalLength = path.node().getTotalLength()
      path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
         //   .transition()
           //   .duration(4000)
            //  .ease(d3.easeLinear)
              .attr("stroke-dashoffset", 0)
    
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
    
  
  
    
  //console.log(dataTerm.columns[0])
    
    
selected = {data1: "Spanish", data2: "French"}
 // selected = {
function getSelected(value) {
  var selected = "";
    switch (value){

      case dataTerm.columns[1]:
       selected =  {data1: dataTerm.columns[7], data2: dataTerm.columns[8], data3: dataTerm.columns[9], data4: "", data5:"" }//
        
      case dataTerm.columns[2]:
       selected =  {data1: dataTerm.columns[12], data2: dataTerm.columns[13], data3: dataTerm.columns[14], data4: dataTerm.columns[15], data5: dataTerm.columns[16]};
       
      case dataTerm.columns[3]:
       selected = {data1: dataTerm.columns[17], data2: dataTerm.columns[18], data3: dataTerm.columns[19], data4: dataTerm.columns[20], data5: dataTerm.columns[21]};
        
      case dataTerm.columns[4]:
       selected = {data1: dataTerm.columns[22], data2: dataTerm.columns[23], data3: dataTerm.columns[24], data4: dataTerm.columns[25], data5: dataTerm.columns[26]};
        
      case dataTerm.columns[5]:
       selected = {data1: dataTerm.columns[27], data2: dataTerm.columns[28], data3: dataTerm.columns[29], data4: dataTerm.columns[30], data5: ""};
        
        case dataTerm.columns[6]: 
        selected =  {data1: dataTerm.columns[32], data2: dataTerm.columns[33], data3: dataTerm.columns[34], data4: dataTerm.columns[35], data5: ""};
        
      default: //case null
       selected = {data1:"", data2: "", data3: "", data4: "", data5: ""};

    };
    return selected
  }
      
  // }
    
//  console.log(getSelected(value))


//selected = getSelected(value)

console.log(value)
console.log(selected)




            var chart2container = d3.select("#chart2");
            var svg2 = chart2container//d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);


          svg2.append("g")
            .call(xAxis);
            
          svg2.append("g")
            .call(yAxis);
            
          
               
                var area12 = d3.area()
                  .x(function(d) { return x(d.Month); })
                    .y0(height - margin.bottom)
                 // .y0(function(d) { return y(d["puerto rico: (Miami-Ft. Lauderdale FL)"] - 10); } )
                  .y1(function(d) { return y(d[selected.data1]); });
                
                var area22 = d3.area()
                  .x(function(d) { return x(d.Month); })
                    .y0(height - margin.bottom)
                 // .y0(function(d) { return y(d["puerto rico: (Miami-Ft. Lauderdale FL)"] - 10); } )
                  .y1(function(d) { return y(d[selected.data2]); });
                
                var area32 = d3.area()
                  .x(function(d) { return x(d.Month); })
                    .y0(height - margin.bottom)
                 // .y0(function(d) { return y(d["puerto rico: (Miami-Ft. Lauderdale FL)"] - 10); } )
                  .y1(function(d) { return y(d[selected.data3]); });
                
                var area42 = d3.area()
                  .x(function(d) { return x(d.Month); })
                    .y0(height - margin.bottom)
                 // .y0(function(d) { return y(d["puerto rico: (Miami-Ft. Lauderdale FL)"] - 10); } )
                  .y1(function(d) { return y(d[selected.data4]); });
                
                var area52 = d3.area()
                  .x(function(d) { return x(d.Month); })
                    .y0(height - margin.bottom)
                 // .y0(function(d) { return y(d["puerto rico: (Miami-Ft. Lauderdale FL)"] - 10); } )
                  .y1(function(d) { return y(d[selected.data5]); });
                
              
              
                var line12 = d3.line()
                //  .defined(d => !isNaN(d[selectedData]))
                  .x(function(d) { return x(d.Month); })
                  .y(function(d) { return y(d[selected.data1]); });
                
                var line22 = d3.line()
                //  .defined(d => !isNaN(d[selectedData]))
                  .x(function(d) { return x(d.Month); })
                  .y(function(d) { return y(d[selected.data2]); });
                // define the area
              
                  var line32 = d3.line()
                //  .defined(d => !isNaN(d[selectedData]))
                  .x(function(d) { return x(d.Month); })
                  .y(function(d) { return y(d[selected.data3]); });
                // define the area
                
                
                    var line42 = d3.line()
                //  .defined(d => !isNaN(d[selectedData]))
                  .x(function(d) { return x(d.Month); })
                  .y(function(d) { return y(d[selected.data4]); });
                // define the area
                
                    var line52 = d3.line()
                //  .defined(d => !isNaN(d[selectedData]))
                  .x(function(d) { return x(d.Month); })
                  .y(function(d) { return y(d[selected.data5]); });
                // define the area
                
                
                  var tooltip2 = d3.select("#tooltip");
              var tooltipWithContent2 = d3.select("body")
                    .append("div")
                    .style("position", "absolute")
                    .style("font-family", "'Open Sans', sans-serif")
                    .style("font-size", "14px")
                    .style("z-index", "10")
                    .style("visibility", "hidden")
                    .style("opacity", 0.6)
                    .style("background", "white")
                    .style("padding", "6px"); 
                //d3.selectAll("#tooltip, #tooltip *");
                
                
              
              function equalToEventTarget() {
                  return this == d3.event.target;
              }
              
              d3.select("body").on("click",function(){
                  var outside = tooltipWithContent2.filter(equalToEventTarget).empty();
                  if (outside) {
                      tooltip2.classed("hidden", true);
                     value = null;
                  }
              });
                
                tooltipWithContent2
                
                  
              tooltip2 
                

              
                
                
                    var AREA12 =  svg2.append("path")
                     .data([dataTerm])
                     .attr("class", "area")
                     .attr("d", area12)
                      .attr("opacity", 0.1)
                    .attr("fill", "none")//color1)
                  .on("mouseover", d => tooltipWithContent2.style("visibility", "visible").text(selected.data1))
                  .on("mousemove", d => tooltipWithContent2.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(selected.data1))
                 .on("mouseout", d => tooltipWithContent2.style("visibility", "hidden"));
                
                  var AREA22 =  svg2.append("path")
                     .data([dataTerm])
                     .attr("class", "area")
                     .attr("d", area22)
                      .attr("opacity", 0.1)
                    .attr("fill", "none")//color1)
                  .on("mouseover", d => tooltipWithContent2.style("visibility", "visible").text(selected.data2))
                  .on("mousemove", d => tooltipWithContent2.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(selected.data2))
                 .on("mouseout", d => tooltipWithContent2.style("visibility", "hidden"));
                
                
                  var AREA32 =  svg2.append("path")
                     .data([dataTerm])
                     .attr("class", "area")
                     .attr("d", area32)
                      .attr("opacity", 0.1)
                    .attr("fill", "none")//color1)
                  .on("mouseover", d => tooltipWithContent.style("visibility", "visible").text(selected.data3))
                  .on("mousemove", d => tooltipWithContent.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(selected.data3))
                 .on("mouseout", d => tooltipWithContent.style("visibility", "hidden"));
                
                
                  var AREA42 =  svg2.append("path")
                     .data([dataTerm])
                     .attr("class", "area")
                     .attr("d", area42)
                      .attr("opacity", 0.1)
                    .attr("fill", "none")//color1)
                  .on("mouseover", d => tooltipWithContent2.style("visibility", "visible").text(selected.data4))
                  .on("mousemove", d => tooltipWithContent2.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(selected.data4))
                 .on("mouseout", d => tooltipWithContent2.style("visibility", "hidden"));
                
                
                  var AREA52 =  svg2.append("path")
                     .data([dataTerm])
                     .attr("class", "area")
                     .attr("d", area52)
                      .attr("opacity", 0.1)
                    .attr("fill", "none")//color1)
                  .on("mouseover", d => tooltipWithContent2.style("visibility", "visible").text(selected.data5))
                  .on("mousemove", d => tooltipWithContent2.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(selected.data5))
                 .on("mouseout", d => tooltipWithContent2.style("visibility", "hidden"));
                
              
                  var path12 = svg2.append("path")
                  .attr("d", line12(dataTerm))
                    .attr("class", "line")
                  .attr("stroke", color1) //puerto rico 
                  .attr("stroke-width", "1")
                  .attr("fill", "none")
                   // .on("click", d => area1.attr("fill", "red"))
                  .on("mouseover", d => tooltipWithContent2.style("visibility", "visible").text(selected.data1))//line1.style("stroke", "black"))//area.attr("style", color1))
                 .on("mousemove", d => tooltipWithContent2.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(selected.data1) 
                 //    && path1.style("stroke", "black") 
                     && AREA12.attr("fill", color1) 
                     // && path2.style("stroke", "none") 
                     // && path3.style("stroke", "none") 
                     // && path4.style("stroke", "none") 
                     // && path5.style("stroke", "none")
                     && AREA12.attr("z-index", "5")
                     && path12.attr("stroke-width", "2"))
                  
                     .on("mouseout", d => tooltipWithContent2.style("visibility", "hidden") 
                         && path12.attr("stroke-width", "1") 
                         && AREA12.attr("fill", "none")
                         && path22.style("stroke", color2) 
                         && path32.style("stroke", color3) 
                         && path42.style("stroke", color4) 
                         && path52.style("stroke", color5))
                  
                  .on("click", d => path2.style("stroke", "none") 
                      && path32.style("stroke", "none") 
                      && path42.style("stroke", "none") 
                     && path52.style("stroke", "none"));
                
                 
               var path22 =   svg2.append("path")
                     .data([dataTerm])
                     .attr("class", "line")
                       .style("stroke", color2) // spanish 
                     .attr("d", line22)
                  //    .attr("opacity", 0.5)
                      .attr("fill", "none")
                   .on("mouseover", d => tooltipWithContent2.style("visibility", "visible").text(selected.data2))
                .on("mousemove", d => tooltipWithContent2.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(selected.data2)
                     && path22.attr("stroke-width", "2") 
                     && AREA22.attr("fill", color2) 
                  
                   &&  path22.attr("stroke-width", "2"))
                  
                     .on("mouseout", d => tooltipWithContent2.style("visibility", "hidden") 
                         && path12.style("stroke", color1) 
                         && AREA22.attr("fill", "none")
                         && path22.attr("stroke-width", "1") 
                         && path32.style("stroke", color3) 
                         && path42.style("stroke", color4) 
                         && path52.style("stroke", color5))
               
               .on("click", d =>    path12.style("stroke", "none") 
                     && path32.style("stroke", "none") 
                     && path42.style("stroke", "none") 
                     && path52.style("stroke", "none"))
              ;
                
              var  path32 = svg2.append("path")
                     .data([dataTerm])
                     .attr("class", "line")
                       .style("stroke", color3) // spanish 
                     .attr("d", line32)
                  //    .attr("opacity", 0.5)
                      .attr("fill", "none")
                .on("mouseover", d => tooltipWithContent2.style("visibility", "visible").text(selected.data3))
                .on("mousemove", d => tooltipWithContent2.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(selected.data3) && path3.attr("stroke-width", "2")
                     && AREA32.attr("fill", color3) )
                     // && path1.style("stroke", "none") 
                     // && path2.style("stroke", "none") 
                     // && path4.style("stroke", "none") 
                     // && path5.style("stroke", "none"))
                  
                     .on("mouseout", d => tooltipWithContent2.style("visibility", "hidden") 
                         && path12.style("stroke", color1) 
                         && AREA32.attr("fill", "none")
                         && path22.style("stroke", color2) 
                         && path32.attr("stroke-width", "1")
                         && path42.style("stroke", color4) 
                         && path52.style("stroke", color5))
              
               .on("click", d =>    path12.style("stroke", "none") 
                     && path22.style("stroke", "none") 
                     && path42.style("stroke", "none") 
                     && path52.style("stroke", "none"))
                    ;
                
                
               var   path42 = svg2.append("path")
                     .data([dataTerm])
                     .attr("class", "line")
                       .style("stroke", color4) // spanish 
                     .attr("d", line42)
                  //    .attr("opacity", 0.5)
                      .attr("fill", "none")
                .on("mouseover", d => tooltipWithContent2.style("visibility", "visible").text(selected.data4))
                .on("mousemove", d => tooltipWithContent2.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(selected.data4) && path4.attr("stroke-width", "2")
                     && AREA42.attr("fill", color4) )
                     // && path1.style("stroke", "none") 
                     // && path2.style("stroke", "none") 
                     // && path3.style("stroke", "none") 
                     // && path5.style("stroke", "none"))
                  
                     .on("mouseout", d => tooltipWithContent2.style("visibility", "hidden") 
                         && path12.style("stroke", color1) 
                         && AREA42.attr("fill", "none")
                         && path22.style("stroke", color2) 
                         && path32.style("stroke", color3) 
                         && path42.attr("stroke-width", "1") 
                         && path52.style("stroke", color5))
                .on("click", d =>    path12.style("stroke", "none") 
                     && path22.style("stroke", "none") 
                     && path32.style("stroke", "none") 
                     && path52.style("stroke", "none"));
                
                
               var   path52 = svg2.append("path")
                     .data([dataTerm])
                     .attr("class", "line")
                       .style("stroke", color5) // spanish 
                     .attr("d", line52)
                  //    .attr("opacity", 0.5)
                      .attr("fill", "none")
                .on("mouseover", d => tooltipWithContent2.style("visibility", "visible").text(selected.data5))
                .on("mousemove", d => tooltipWithContent2.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(selected.data5) && path5.attr("stroke-width", "2")
                     && AREA52.attr("fill", color5) )

                  
                     .on("mouseout", d => tooltipWithContent2.style("visibility", "hidden") 
                         && path12.style("stroke", color1) 
                         && AREA52.attr("fill", "none")
                         && path22.style("stroke", color2) 
                         && path32.style("stroke", color3) 
                         && path42.style("stroke", color4) 
                         && path52.attr("stroke-width", "1"))
                .on("click", d =>    path1.style("stroke", "none") 
                     && path22.style("stroke", "none") 
                     && path32.style("stroke", "none") 
                     && path42.style("stroke", "none"))
               ;
              
                
                var totalLength = path12.node().getTotalLength()
                path12
                      .attr("stroke-dasharray", totalLength + " " + totalLength)
                      .attr("stroke-dashoffset", totalLength)
                   //   .transition()
                     //   .duration(4000)
                      //  .ease(d3.easeLinear)
                        .attr("stroke-dashoffset", 0)

            return Object.assign(svg.node(), {value: value});
          })