import React from 'react';

/*Functional Component using ES6 class to define component*/

export default class Weather extends React.Component{

    state = {
        location: ''
    };

    fetchData = (e) =>{
        e.preventDefault();
        console.log('fetch data', this.state.location);
        e.currentTarget.reset();

    };

    //utility method to capture controlled text input
    //and sets the location state
    changeLocation = (e) =>{
        this.setState({location: e.target.value});
    };


    render(){
        return (
            <div>
                {/*
                Weather Component
                Form captures location entry upon submit
                */}
                <form onSubmit={this.fetchData}>
                  <label>I want to know the weather for
                    {/* controlled input for now */}
                    <input
                    placeholder={"City, State"}
                    type="text"
                    value={this.state.location}
                    onChange={this.changeLocation}
                    />
                  </label>
                </form>
            </div>
        );
    }

}
