import React from 'react';

import CreateZone from './createZone';
import ZoneList from './zonelist';

import  '../styles/zone.css';


//import {connect} from 'react-redux';

export default class Zones extends React.Component{
     constructor(props) {
         super(props);

         this.state = {
           zones:[
                 {name: 'Zone 1'},
                 {name: 'Zone 2'},
                 {name: 'Zone 3'},
                 {name: "Zone 4"},
                 {name: "Zone 5"}
               ]
         };
       }

       //Creates new zones
       createZone(name) {
         this.state.zones.push({
           name: name,
         });
         this.setState({
           zones: this.state.zones
         });
         console.log(name + ' was included in zones array');
       }

       //tracks index of zone
       findZone(name) {
         return this.state.zones.filter((element) => element.name === name)[0];
       }

       //allows for zone name edit and save
       saveZone(oldZone, newZone) {
         let selectedZone = this.findZone(oldZone);
         selectedZone.name = newZone;
         this.setState({ zones: this.state.zones });
         console.log(oldZone + ' has been changed to ' + newZone);
         console.log(this.state);
       }

       //
       deleteZone(name) {
         let index = this.state.zones.map(element => element.name).indexOf(name);
         this.state.zones.splice(index, 1);
         this.setState({ zones: this.state.zones });
         console.log(name + ' has been deleted');
         console.log(this.state);
       }

       render() {
         return (
           <div className="to-do-app">
             <div className="header">
               <h1>Watering Zones</h1>
             </div>
             <CreateZone zones={this.state.zones} createZone={this.createZone.bind(this)}/>
             <ZoneList zones={this.state.zones} deleteZone={this.deleteZone.bind(this)} saveZone={this.saveZone.bind(this)} />
           </div>
         );
       }

}

//const mapStateToProps = (state, props) => ({

//});


//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
//export default connect(mapStateToProps)(Zones);
