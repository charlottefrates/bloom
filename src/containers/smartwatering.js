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
      $( '#day' ).on( 'click', 'input:checkbox', function () {
        $( this ).parent().toggleClass( 'checked', this.checked );
      });

      //makes an array of seleted day options
      function handleDayChange(e,i) {
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
      function handleOptionChange(e) {
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
      function changeRate (e){
            this.props.dispatch(set_watering(e.target.value));
      }

      //changes time
      function changeTime(e){
            this.props.dispatch(set_time(e.target.value));
      }

      function projectedWaterUse (){
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
          <input className = "days" type='checkbox' value={item} name = 'days' key={i} className="one" onChange={event=>this.handleDayChange(event,0)}/>
          {item}
        </label>


    )
  };

  //makes an array of seleted day options
  handleDayChange(e,i) {
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
              <div className='maincont'>
                        <div className="header">
                          <h1> Smart Water Projection </h1>
                        </div>
                        <br/>
                        <form id="day">
                        {this.iconList()}
                        {this.dayList()}
                        </form>
                        <br/>

                      <div className="secondcont">
                        <div className="header2">
                          <h2> Zones </h2>
                        </div>
                        <br/>
                        <form>
                        {this.zoneList()}
                        </form>
                        <br/>


                      </div>

                      <div className="secondcont">
                        <div className="header2">
                          <h2> Watering Time </h2>
                        </div>
                        <br/>
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
                        <br/>
                        <h4> Based on your selections and settings you will be using </h4>
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
