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
        let first_sample = names[0];

        // Log the value of this sample 
        console.log(first_sample);

        
        // Build plots for initial page
        addMdinfo(first_sample);
        barChart(first_sample);
        bubbleChart(first_sample);

    });
};

// Function to add  metadata info
function addMdinfo(sample) {
    // Use D3 to get all of the data
    d3.json(url).then((data) => {
      
      let metadata = data.metadata;
      // Filter based on the value of sample
      let value = metadata.filter(result => result.id == sample);
      // Log the array of metadata objects after filtering
      console.log(value)
      // Get first index from array
      let valueData = value[0];
      // Clear out metadata
      d3.select("#sample-metadata").html("");
      // Use Object.entries to add each key/value pair to panel
      Object.entries(valueData).forEach(([key,value]) => {

        // Log key/value pairs as they are being added to the panel
        console.log(key,value);

        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
});

};

// Building bar chart
function barChart(sample) {
    // Retrieve data
    d3.json(url).then((data) => {
       // Retrieve all sample data
       let sampleInfo = data.samples;
       // Filter based on the value of the sample
       let value = sampleInfo.filter(result => result.id == sample);

       // Get the first index from the array
       let valueData = value[0];
        // Get the ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;
        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);

        // Display top 10 ITUs found in individual in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        // Set up the trace for the bar chart
        let trace = {
          x: xticks,
          y: yticks,
          text: labels,
          type: "bar",
          orientation: "h"
      };

      // Set layout
      let layout = {
          title: "Top 10 OTUs Present"
      };

      // Use Plotly to plot bar chart
      Plotly.newPlot("bar", [trace], layout)
  });
};

// Building bubble chart
function bubbleChart(sample) {
  // Retrieve all of the data
  d3.json(url).then((data) => {
  // Retrieve sample data
  let sampleInfo = data.samples;
  // Filter based on the sample value 
  let value = sampleInfo.filter(result => result.id == sample);
  // Get first index from the array
  let valueData = value[0];
  // Get ids, lables, and sample values
  let otu_ids = valueData.otu_ids;
  let otu_labels = valueData.otu_labels;
  let sample_values = valueData.sample_values;

  // Log data to console
  console.log(otu_ids,otu_labels,sample_values);

  // Set up trace for bubble chart
  let trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
    }
};

  // Set up the layout
  let layout = {
    title: "Bacteria Per Sample",
    hovermode: "closest",
    xaxis: {title: "OTU ID"},
};

  // Use Plotly to plot bubble chart
  Plotly.newPlot("bubble", [trace1], layout)
});
};

// Function that updates the dashboard when sample is changed
function sampleChange(value) { 

  // Log new value
  console.log(value); 

  // Call all functions 
  addMdinfo(value);
  barChart(value);
  bubbleChart(value);
};

// Call the initialize function
init();