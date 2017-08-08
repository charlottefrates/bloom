/* global Plotly */
// Plot.js

import React from 'react';

import {connect} from 'react-redux';
import {
     pull_weather,
     set_data,
     set_current,
     set_array
} from '../actions';


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

    Plotly.newPlot('plot',
    [{
      x: this.props.xData,
      y: this.props.yData,
      type: this.props.type,
      mode: this.props.mode,
      line: {
        color: 'grey',
        width: 6
      }
    }],
    {
      showlegend: false,
      displayModeBar: false,
      title: '5-Day Temperature Forcast',
      font: {
        size: 16
    }
    });

    Plotly.newPlot('plot2',
    [{
      x: this.props.xData,
      y: this.props.yDataDes,
      type: this.props.type,
      mode: 'markers',
  marker: {
    color: 'rgba(156, 165, 196, 0.95)',
    line: {
      color: 'rgba(156, 165, 196, 1.0)',
      width: 1,
    },
    symbol: 'circle',
    size: 16
  }
    }],
    {
      showlegend: false,
      displayModeBar: false,
      title: '5-Day Description Forcast',
      font: {
        size: 16
    }
    });

    window.onresize = function() {
    Plotly.Plots.resize(gd);
  };


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


    Plotly.newPlot('plot',
    [{
      x: this.props.xData,
      y: this.props.yData,
      type: this.props.type,
      mode: this.props.mode,
      line: {
        color: 'grey',
        width: 6
      }
    }],
    {
      showlegend: false,
      displayModeBar: false,
      title: '5-Day Temperature Forcast',
      font: {
        size: 16
    }
    });

    Plotly.newPlot('plot2',
    [{
      x: this.props.xData,
      y: this.props.yDataDes,
      type: this.props.type,
      mode: 'markers',
  marker: {
    color: 'rgba(156, 165, 196, 0.95)',
    line: {
      color: 'rgba(156, 165, 196, 1.0)',
      width: 1,
    },
    symbol: 'circle',
    color:'grey',
    size: 16
  }
    }],
    {
      showlegend: false,
      displayModeBar: false,
      title: '5-Day Description Forcast',
      font: {
        size: 16
    }
    });

    window.onresize = function() {
    Plotly.Plots.resize(gd);
  };



  }

  render() {
    return (
      <div>
      <div id="plot" className='move' >
      </div>
      <div id="plot2" className='move' >
      </div>
      </div>
    );
  }
}

export default Plot;
