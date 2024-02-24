// place url in constant variable 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });


//Initialize dashbord
  function init() {

    //select dropdown menu with D3 
    let dropdown = d3.select("#selDataset");
    
    d3.json(url).then((data) => {

      //set variable for the names in the data
      let names = data.names;
    
      //add names to dropdown
      names.forEach((id) => {

      console.log(id);

      dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let sample_1 = names[0];

        // Log the value of this sample 
        console.log(sample_1);

        
        // Build init plots
        buildMetadata(sample_1);
        buildBarChart(sample_1);
        buildBubbleChart(sample_1);
        buildGaugeChart(sample_1);

    });
};



