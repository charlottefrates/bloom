import React from 'react';

import {connect} from 'react-redux';
import {
     create_zone,
     save_zone,
     delete_zone
} from '../actions/zone_actions';



import CreateZone from './createZone';
import ZoneList from './zonelist';


import  '../styles/zone.css';


class Zones extends React.Component{

       //Creates new zones
       createZone(name) {
            this.props.dispatch(create_zone(name));
       }


       //allows for zone name edit and save
       saveZone(newZone,id) {
            this.props.dispatch(save_zone(newZone,id));
       };

       //
       deleteZone(id) {
            this.props.dispatch(delete_zone(this.props.id));
       };

       render() {
         return (
              <div className="main-content">
           <div className="to-do-app">
             <div className="header">
               <h1>Watering Zones</h1>
             </div>
             <CreateZone  createZone={this.createZone.bind(this)}/>
             <ZoneList  deleteZone={this.deleteZone} saveZone={this.saveZone.bind(this)} />
           </div>
           </div>
         );
       }

}

const mapStateToProps = (state, props) => ({
     zones: state.zones,
     authenticated: state.authenticated
});


//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(Zones);
