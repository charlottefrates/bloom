/* global Plotly */
// Plot.js

import React from 'react';

class Plot extends React.Component {


  //lifecycle method that only gets called once the component mounts
  //NOTE: doesnt handle new data updates!
  componentDidMount() {
    var d3 = Plotly.d3;

    var WIDTH_IN_PERCENT_OF_PARENT = 60,
        HEIGHT_IN_PERCENT_OF_PARENT = 80;

    var gd3 = d3.select('#myDiv')
      .style({
        width: WIDTH_IN_PERCENT_OF_PARENT + '%',
        'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

        height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
        'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
      });

    var gd = gd3.node();

    let weatherData = [{
      x: this.props.xData,
      y: this.props.yData,
      type: this.props.type
    }];

    let styling = {
      margin: {
        t: 0, r: 0, l: 30
      },
      xaxis: {
        gridcolor: 'transparent'
      }
    };

    let display = {
      displayModeBar: false,
      title: '5-Day Forcast',
      font: {
        size: 16
    }
    };

    Plotly.newPlot('plot',weatherData,display );

    window.onresize = function() {
    Plotly.Plots.resize(gd);
  };

    //Event that captures temperature on click of specific date
    document.getElementById('plot').on('plotly_click', this.props.onPlotClick);

  }

  componentDidUpdate() {

    var d3 = Plotly.d3;

    var WIDTH_IN_PERCENT_OF_PARENT = 60,
        HEIGHT_IN_PERCENT_OF_PARENT = 80;

    var gd3 = d3.select('#myDiv')
      .style({
        width: WIDTH_IN_PERCENT_OF_PARENT + '%',
        'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

        height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
        'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
      });

    var gd = gd3.node();


    Plotly.newPlot('plot', [{
      x: this.props.xData,
      y: this.props.yData,
      type: this.props.type
    }],{
      showlegend: false,
      displayModeBar: false,
      title: '5-Day Forcast',
      font: {
        size: 16
    }
    });

    window.onresize = function() {
    Plotly.Plots.resize(gd);
  };

    //Event that captures temperature on click of specific date
    document.getElementById('plot').on('plotly_click', this.props.onPlotClick);


  }

  render() {
    return (
      <div id="plot" >
      </div>
    );
  }
}

export default Plot;
