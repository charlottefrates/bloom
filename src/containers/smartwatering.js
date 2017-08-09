import React from 'react';


import '../styles/smartwatering.css';

export default class Smart extends React.Component{
     render(){

         return (
              <div className='maincont'>
                      <div className="header">
                    <h1> Smart Water Projection </h1>
                      </div>
                    <form id="day"action="" method="get">
                       <input type='checkbox' name = 'days' value = 'sunday' id='sunday' className = "one" />
                       <input type='checkbox' name = 'days' value = 'monday' id='monday' className = "two" />
                       <input type='checkbox' name = 'days' value = 'tuesday' id='tuesday'  className = "three" />
                       <input type='checkbox' name = 'days' value = 'wednesday 'id='wednesday'className = "four" />
                       <input type='checkbox' name = 'days' value = 'thursday' id='thursday' className = "five" />
                       <input type='checkbox' name = 'days' value = 'friday' id='friday' className = "six" />
                       <input type='checkbox' name = 'days' value = 'saturday' id='saturday' className = "seven" />

                       <label for="sunday" className = "one label">Sun</label>
                       <label for="monday" className = "two label">Mon</label>
                        <label for="tuesday" className = "three label">Tue</label>
                        <label for="wednesday" className = "four label">Wed</label>
                       <label for="thursday" className = "five label">Thu</label>
                      <label for="friday" className ="six label">Fri</label>
                     <label for="saturday" className= "seven label">Sat</label>
                     </form>

                      <div className="secondcont">
                        <div className="header2">
                          <h2> Zones </h2>
                        </div>
                         <br/>
                         <br/>
                         <br/>
                         <br/>

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
