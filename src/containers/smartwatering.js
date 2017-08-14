import React from 'react';

import {connect} from 'react-redux';


import '../styles/smartwatering.css';

class Smart extends React.Component{


    zoneList (){
        return this.props.zones.map(
            (item, i) =>
                                <div className="radio">
                                <label>
                                <input type="radio" checked={false} key={i} {...item}  />
                                </label>
                                </div>


        )
    }



     render(){

         return (
              <div className='maincont'>
                      <div className="header">
                    <h1> Smart Water Projection </h1>
                      </div>
                    <form id="day"action="" method="get">
                       <input type='checkbox' name = 'days' value = 'sunday' id='sunday' className="one" />
                       <input type='checkbox' name = 'days' value = 'monday' id='monday' className="two" />
                       <input type='checkbox' name = 'days' value = 'tuesday' id='tuesday'  className="three" />
                       <input type='checkbox' name = 'days' value = 'wednesday 'id='wednesday'className="four" />
                       <input type='checkbox' name = 'days' value = 'thursday' id='thursday' className="five" />
                       <input type='checkbox' name = 'days' value = 'friday' id='friday' className="six" />
                       <input type='checkbox' name = 'days' value = 'saturday' id='saturday' className="seven" />

                       <label for="sunday" className = "one label">{this.props.dates[0]}</label>
                       <label for="monday" className = "two label">{this.props.dates[1]}</label>
                        <label for="tuesday" className = "three label">{this.props.dates[2]}</label>
                        <label for="wednesday" className = "four label">{this.props.dates[3]}</label>
                       <label for="thursday" className = "five label">{this.props.dates[4]}</label>
                      <label for="friday" className ="six label">{this.props.dates[5]}</label>
                     <label for="saturday" className= "seven label">{this.props.dates[6]}</label>
                     </form>

                      <div className="secondcont">
                        <div className="header2">
                          <h2> Zones </h2>
                        </div>
                        <form>
                        {this.zoneList()}
                        </form>
                      </div>

                      <div className="secondcont">
                        <div className="header2">
                          <h2> Watering Time </h2>
                        </div>
                         <br/>
                         <br/>
                         <br/>
                         <br/>

                      </div>

                      <div className="secondcont">
                        <div className="header2">
                          <h2> Projected Water use </h2>
                        </div>
                         <br/>
                         <br/>
                         <br/>
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
    icons:state.icons
});


//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(Smart);
