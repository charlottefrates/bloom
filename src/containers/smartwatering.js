import React from 'react';

import {connect} from 'react-redux';

import {
    select_days,
     select_zone,
     set_time,
     set_watering,
     set_projected
} from '../actions/zone_actions';



import '../styles/smartwatering.css';

class Smart extends React.Component{

  //Renders zone list names into checkboxes
  zoneList (){
      return this.props.zones.map(
          (item, i) =>
                              <div className="zoneCheck">
                              <label >
                              <input type="checkbox" className = "checkbox" key={i} {...item} onChange={event=>this.handleOptionChange(event)}  value={item.name} />
                              {item.name}
                              </label>
                              </div>


      )
  };

  //makes an array of seleted day options
  handleDayChange(e) {
        // current array of options
        const options = this.props.selectedDays;
        let index
        // check if the check box is checked or unchecked
        if (e.target.checked) {
          // add the value of the checkbox to options array
          options.push(e.target.value)
        } else {
          // or remove the value from the unchecked checkbox from the array
          index = options.indexOf(e.target.value)
          options.splice(index, 1)
        }

        // update the state with the new array of options
        this.props.dispatch(select_days(options));
        console.log(this.props.selectedDays);

        console.log('There are ' + this.props.selectedDays.length + ' days selected');

  };


  //makes an array of seleted zone options
  handleOptionChange(e) {
        // current array of options
        const options = this.props.selectedOptions;
        let index
        // check if the check box is checked or unchecked
        if (e.target.checked) {
          // add the value of the checkbox to options array
          options.push(e.target.value)
        } else {
          // or remove the value from the unchecked checkbox from the array
          index = options.indexOf(e.target.value)
          options.splice(index, 1)
        }

        // update the state with the new array of options
        this.props.dispatch(select_zone(options));
        console.log(this.props.selectedOptions);

        console.log('There are ' + this.props.selectedOptions.length + ' zones selected');

  };

  //changes watering rate
  changeRate = (e) =>{
        this.props.dispatch(set_watering(e.target.value));
  }

  //changes time
  changeTime = (e) =>{
        this.props.dispatch(set_time(e.target.value));
  }

  projectedWaterUse (){
    let days = this.props.selectedDays.length;
    let zones = this.props.selectedOptions.length;
    let rate = this.props.rate;
    let time = this.props.time;
    let projectedUse = days * zones * rate * time;

    this.props.dispatch(set_projected(projectedUse));
    console.log('Based on your selections your are projected to use ' + this.props.projectedUse + " gallons of water");

  }

  //TODO: submit to server for water tracking entry
  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
  };


  render(){
         return (
              <div className='maincont'>
                      <div className="header">
                    <h1> Smart Water Projection </h1>
                      </div>
                    <form id="day">
                      <label for={this.props.dates[0]} className = "one label">
                        <input type='checkbox' name = 'days' value ={this.props.dates[0]} id='sunday' className="one" onChange={event=>this.handleDayChange(event)}/>
                        <span className={this.props.icons[0]}> {this.props.dates[0]} </span>
                      </label>

                      <label for={this.props.dates[1]} className = "two label">
                        <input type='checkbox' name = 'days' value ={this.props.dates[1]} id='monday' className="two" onChange={event=>this.handleDayChange(event)}/>
                        <span className={this.props.icons[1]}>  {this.props.dates[1]} </span>
                      </label>

                      <label for={this.props.dates[2]} className = "three label" >
                        <input type='checkbox' name = 'days' value ={this.props.dates[2]} id='tuesday'  className="three" onChange={event=>this.handleDayChange(event)}/>
                        <span className={this.props.icons[2]}> {this.props.dates[2]} </span>
                      </label>

                      <label for={this.props.dates[3]} className = "four label" >
                        <input type='checkbox' name = 'days' value ={this.props.dates[3]}id='wednesday'className="four" onChange={event=>this.handleDayChange(event)}/>
                        <span className={this.props.icons[3]}> {this.props.dates[3]} </span>
                      </label>

                      <label for={this.props.dates[4]} className = "five label" >
                        <input type='checkbox' name = 'days' value ={this.props.dates[4]} id='thursday' className="five" onChange={event=>this.handleDayChange(event)}/>
                         <span className={this.props.icons[4]}> {this.props.dates[4]} </span>
                      </label>

                      <label for="friday" className ="six label" >
                        <input type='checkbox' name = 'days' value ={this.props.dates[5]} id='friday' className="six" onChange={event=>this.handleDayChange(event)}/>
                        <span className={this.props.icons[5]}> {this.props.dates[5]} </span>
                      </label>

                      <label for={this.props.dates[6]} className= "seven label">
                        <input type='checkbox' name = 'days' value ={this.props.dates[6]} id='saturday' className="seven" onChange={event=>this.handleDayChange(event)}/>
                        <span className={this.props.icons[6]}> {this.props.dates[6]} </span>
                      </label>

                     </form>

                      <div className="secondcont">
                        <div className="header2">
                          <h2> Zones </h2>
                        </div>
                        <form>
                        {this.zoneList()}
                        </form>
                        <br/>


                      </div>

                      <div className="secondcont">
                        <div className="header2">
                          <h2> Watering Time </h2>
                        </div>
                        <form >
                          gallon/min: <input className="smartTime"type="text" name="rate"  onChange={event=>this.changeRate(event)}/><br/>
                          min: <input type="text" className="smartTime"name="time"  onChange={event=>this.changeTime(event)}/><br/>
                        </form>
                         <br/>

                      </div>

                      <div className="secondcont">
                        <div className="header2">
                          <h2> Projected Water use </h2>
                        </div>
                        <h4> Based on your selections you will be using </h4>
                          {this.projectedWaterUse()}
                         <h3> {this.props.projectedUse}</h3>
                         <h4> gallons of water </h4>
                         <br/>

                      </div>


                      </div>

         )
    }
}


const mapStateToProps = (state, props) => ({
    zones: state.zones,
    dates: state.dates,
    descriptions:state.descriptions,
    icons:state.icons,
    selectedDays: state.selectedDays,
    selectedOptions: state.selectedOptions,
    rate: state.rate,
    time: state.time,
    projectedUse: state.projectedUse
});


//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(Smart);
