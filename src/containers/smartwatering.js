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

import $ from 'jquery';

class Smart extends React.Component{

  //captures updates
  componentDidUpdate() {

      //highlights the selcted days
      $( '#day' ).on( 'click', 'input:checkbox', function () {
        $( this ).closest('label').toggleClass( 'checked', this.checked );
      });

      //recalculates based on form changes
      let projectedWaterUse = ()=>{
        let days = this.props.selectedDays.length;
        let zones = this.props.selectedOptions.length;
        let rate = this.props.rate;
        let time = this.props.time;
        let projectedUse = days * zones * rate * time;

        this.props.dispatch(set_projected(projectedUse));
        console.log('Based on your selections your are projected to use ' + this.props.projectedUse + " gallons of water");

      }



  }

  //Renders zone list names into checkboxes
  zoneList (){
    return this.props.zones.map(
      (item, i) =>
        <div className="zoneCheck">
          <label className='toclick'>
            <input type="checkbox" className="zone"  key={i} {...item} onChange={event=>this.handleOptionChange(event)}  value={item.name} />
            {item.name}
          </label>
        </div>

      )
  };

  //Renders  weather icons
  iconList (){
    return this.props.icons.map(
      (item, i) =>
        <div className = "labelIcon ">
        <span className={item} key={i}> </span>
        </div>
      )
  }

  //Renders days
  dayList(){
    return this.props.dates.map(
      (item,i) =>

        <label for={item} className = "label">
          <input type='checkbox' value={item} name = 'days' key={i} className="one days" onChange={event=>this.handleDayChange(event)}/>
          {item}
        </label>


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
        console.log(options);
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
              <div className="main-content">
              <div className='maincont'>


                        <div className="header">
                          <h1> Smart Water Projection </h1>
                        </div>
                        <br/>

                        <p> For {this.props.location} </p>

                        <div className="secondcont">
                        <div className="header2">
                          <h3> Day Selection </h3>
                        </div>
                        <br/>
                        <p> Select the days you would like to water. </p>
                        <form id="day">
                        {this.iconList()}
                        {this.dayList()}
                        </form>
                        <br/>
                        </div>

                      <div className="secondcont">
                        <div className="header2">
                          <h3> Zone Selection </h3>
                        </div>
                        <br/>
                        <p> Select each zone independently OR select all the zones you would like turned on <br/> for your selected days of watering. </p>
                        <form>
                        {this.zoneList()}
                        </form>
                        <br/>
                      </div>

                      <div className="secondcont">
                        <div className="header2">
                          <h3> Watering Time </h3>
                        </div>
                        <br/>
                        <p> How many gallons would you like to use and how long would you like to water each zone(s)? </p>
                        <form >
                          gallon/min: <input className="smartTime align"type="text" name="rate"  onChange={event=>this.changeRate(event)}/><br/>
                          min: <input type="text" className="smartTime"name="time"  onChange={event=>this.changeTime(event)}/><br/>
                        </form>
                         <br/>

                      </div>

                      <div className="secondcont">
                        <div className="header2">
                          <h3> Projected Water Use </h3>
                        </div>
                        <br/>
                        <h4> Based on your selections and settings you will be using </h4>
                          {this.projectedWaterUse()}
                         <h3 className="bluebold"> {this.props.projectedUse}</h3>
                         <h4> gallons of water </h4>
                         <br/>

                      </div>


                      </div>
                      </div>

         )
    }
}


const mapStateToProps = (state, props) => ({
    location:state.location,
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
