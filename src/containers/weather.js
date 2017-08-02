import React from 'react';

import axios from 'axios';

/*Functional Component using ES6 class to define component*/

export default class Weather extends React.Component{

    constructor(props) {
    super(props);
    this.state = {location: '', data:{}};

    //handler binds so that mutable state is kept within the property
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.changeLocation.bind(this);
  }

    handleChange = (e) =>{
        e.preventDefault();
        e.currentTarget.reset();

        const location = encodeURIComponent(this.state.location);

        let key = '3229556f6b40c6492802319447e8181d';
        let metric = 'metric';
        let imperial = 'imperial'

        const urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        let urlSuffix = `&APPID=${key}&units=${imperial}`;
        const url = urlPrefix + location + urlSuffix;


        //Axios - Promised based data fetching
        // automatically converts data in JSON
        axios.get(url)
          .then(response => {
            this.setState({
              data: response.data
            })
          })
          .catch(error => {
              console.log('Error fetching and parsing data', error);
            });

            console.log('fetch data', this.state.data);


          }


    //utility method to capture controlled text input
    //and sets the location state
    changeLocation = (e) =>{
        this.setState({location: e.target.value});
    }


    render(){
        let currentTemp = 'no location';
        if (this.state.data.list) {
          currentTemp = this.state.data.list[0].main.temp;
        }
        return (
            <div>
                {/*
                Weather Component
                Form captures location entry upon submit
                */}
                <form onSubmit={this.handleChange}>
                  <label>I want to know the weather for
                    {/* controlled input for now */}
                    <input
                    placeholder={"State, Country"}
                    type="text"
                    value={this.state.location}
                    onChange={this.changeLocation}
                    />
                    <input className="butt"type="submit" value="Submit" />
                  </label>
                </form>

                <p className="temp-wrapper">
                  <span className="temp">{currentTemp}</span>
                    <span className="temp-symbol">°C</span>
                </p>

            </div>
        );
    }

}
