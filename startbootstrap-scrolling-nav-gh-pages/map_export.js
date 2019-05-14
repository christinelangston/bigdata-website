

d3.csv("https://raw.githubusercontent.com/christinelangston/BigData11.154/master/ACS_15_5YR_B16001_with_ann_cleaned_percentage.csv", d3.autoType).then(function(langData){
    $(document).ready(function(){
        const rateByName = {}
    
        var changeD3Data = function(selectedData) { 
            d3.select("svg").remove();
         //  chartcontainer.remove();
            console.log(langData);
            console.log(selectedData);
            for (row in langData){
            
                rateByName[langData[row].Id] =  + langData[row][selectedData];
                }
            console.log( rateByName)
            let width = 960;
            let height = 600;


    //roads = d3.json("https://raw.githubusercontent.com/christinelangston/BigData11.154/master/major_road_miami.json")
    d3.json("https://raw.githubusercontent.com/christinelangston/BigData11.154/master/cb_2017_12_tract_500k.json", d3.autoType).then(function(miamiNeighborhoods){
      d3.json("https://raw.githubusercontent.com/christinelangston/BigData11.154/master/major_road_miami.json", d3.autoType).then(function(roads){
  
     
    
//    d3.json("https://raw.githubusercontent.com/christinelangston/BigData11.154/master/major_road_miami.json", d3.autoType).then(function(roads){
      console.log(langData)
    
    selectedData = $("#dropdown-select").val();//"Estimate; Total: - Spanish or Spanish Creole:"
    
    let width = 960;
    let height = 600;
    let value = null;
    
    // Create SVG
    var chartcontainer = d3.select("#map");
        var svg = chartcontainer//d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    
        svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("opacity", "0.15")
        .attr("fill", "white")
        .style("z-index", 0);
    
    //var totalColor = function() {
                    //   if (selectedData == "Estimate; Total:"){
                    //   return d3.scaleQuantize()
                    //     .domain([0, 10000])
                    //     .range(d3.schemeBuGn[9]);
                        
                    //   }
                    //   else {
                    //      return d3.scaleQuantize()
                    //     .domain([0, 1000])
                    //     .range(d3.schemeOranges[9]);
                        
                    //   }
    //return 
    var totalColor = d3.scaleQuantize()
     //   .domain([-10, 10000])
        .domain([0, 100])
        .range(d3.schemeOranges[9]);
    
    let g = svg.append("g")
    
    legend = function(g) {
        const x = d3.scaleLinear()
          .domain(d3.extent(totalColor.domain()))
          .rangeRound([0, 260])
       // .attr("x", 500);
    
      g.selectAll("path")
        .data(totalColor.range().map(d => totalColor.invertExtent(d)))
        .join("rect")
          .attr("height", 8)
          .attr("x", d => x(d[0]) + 500)
          .attr("y", height - 35)
          .attr("width", d => x(d[1]) - x(d[0]))
          .attr("fill", d => totalColor(d[0]))
          .attr("opacity", "0.5");
    
      g.append("text")
          .attr("x", x.range()[0] + 500)
          .attr("y", + height - 45) //-6x //+40
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .style("font-size", "12px")
          .text("Percentage of people who speak " + selectedData.toLocaleString());
    
      //create labels for legend marks
     let xAxis = g => g
          .call(d3.axisBottom(x)
          .tickSize(13)
          //    .attr("x", d => x(d[0]) + 500)
          // .attr("y", height -40)
          .tickFormat(d => d3.format(".3n")(d))//.tickFormat(d => d) //rateByName[d.properties.Name]
          .tickValues(totalColor.range().slice(1).map(d => totalColor.invertExtent(d)[0])))
          .attr("transform", `translate(500 ,${height - 35})`)
          .select(".domain")
          .remove();
       
       g.append("g")
                .call(xAxis);
    } ;
    
       g.call(legend);
    
    
    var bosProjection = d3.geoAlbers() // specific for boston
        .scale( 100000 )
        .rotate( [80.2,0] )
        .center( [0, 25.77] )
        .translate( [width/2,height/2] );  
    
    var quantizeScale = d3.scaleQuantize()
    //    .domain([-10, 5000])
        .domain([0, 100])
        .range(d3.schemeBuGn[9])
      //.range(['lightblue', 'orange', 'lightgreen', 'pink']);
    
    
    //var color = totalColor
    var path = d3.geoPath(bosProjection);  
    var road = d3.geoPath(bosProjection);  
    
    var tooltip = d3.select("#tooltip");
      //call tooltip
    tooltip 
    
    
    function checkRateByName(id){
    //console.log(id.properties.AFFGEOID)
      if (id.properties.AFFGEOID in rateByName){
     //   console.log(rateByName[id.properties.AFFGEOID])
        if (rateByName[id.properties.AFFGEOID] == 0){
            return "#fee6ce"
        }else {
        c = totalColor(rateByName[id.properties.AFFGEOID])  // quantizeScale
      //  console.log(c)
       return c //"blue"
        }
      }
      else{
       return "none" 
      }
    }
      
    g.selectAll("path")
        .data(topojson.feature(miamiNeighborhoods, miamiNeighborhoods.objects.cb_2017_12_tract_500k).features) // Bind TopoJSON data elements
        .enter().append("path")
        .attr("d", path) 
     // .updateColor("d")
       //      .style("fill", t1.url()) //d => checkRateByName(d).url() )
      .attr("opacity", "0.5")
    //     .style("fill", d =>  t1.fill(checkRateByName(d)))
        .style("fill", d => checkRateByName(d))
      //.style("fill", "red")
      .style("stroke", "none")
      .style("border-width", "0.5px")
      .on("mouseover", d => tooltip.style("visibility", "visible").text("here"))
      .style("z-index", 2)
          //.on("mouseover", d => tooltipWithContent.style("visibility", "visible").text("Spanish")
      ;
     
    
    // Bind TopoJSON data
    g.selectAll("path")
        .data(topojson.feature(roads, roads.objects.miami_major_roads).features) // Bind TopoJSON data elements
        .enter().append("path")
        .attr("d", path)  
     //   .style("fill", d => checkRateByName(d))
      //color(rateByName[d.properties.AFFGEOID])) // get rate value for property matching data ID
            // pass rate value to color function, return color based on domain and range
      .style("stroke", "black")
      .style("border-width", "1px")
      .attr("opacity", "0.25")
     
    
      const outline = svg.append("path")
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-linejoin", "round")
          .attr("pointer-events", "none");
      
  
        })
      })
  }

        $(document).ready(function(){
         // chartcontainer.remove();

            changeD3Data($("#dropdown-select").val());
                  $("#dropdown-select").change(function(e) { 
                    changeD3Data(this.value);
                  });
    
        });
    
    console.log($("#dropdown-select").val());
   
      

      
    }
    )});