/* global Plotly */
// Plot.js

import React from 'react';

class Plot extends React.Component {

  //lifecycle method that only gets called once the component mounts
  //NOTE: doesnt handle new data updates!
  componentDidMount() {
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
      showlegend: true,
      barmode: 'group'
    };

    Plotly.newPlot('plot',weatherData,styling,display );

    //Event that captures temperature on click of specific date
    document.getElementById('plot').on('plotly_click', this.props.onPlotClick);
  }

  componentDidUpdate() {
    Plotly.newPlot('plot', [{
      x: this.props.xData,
      y: this.props.yData,
      type: this.props.type
    }], {
      margin: {
        t: 0, r: 0, l: 30
      },
      xaxis: {
        gridcolor: 'transparent'
      }
    }, {
      displayModeBar: false
    });
  }

  render() {
    return (
      <div id="plot" className="chartalign"></div>
    );
  }
}

export default Plot;
