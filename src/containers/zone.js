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
                 {
                   name: 'Zone 1',
                   completed: false
                 },
                 {
                   name: 'Zone 2',
                   completetd: false
                 },
                 {
                   name: 'Zone 3',
                   completed: false
                 },
                 {
                   name: "Zone 4",
                   completed: false
                 }
               ]
         };
       }

       createItem(item) {
         this.state.zones.unshift({
           name: item,
           completed: false
         });
         this.setState({
           zones: this.state.zones
         });
         console.log(this.state);
       }

       findItem(item) {
         return this.state.zones.filter((element) => element.name === item)[0];
       }

       toggleComplete(item) {
         let selectedItem = this.findItem(item);
         selectedItem.completed = !selectedItem.completed;
         this.setState({ zones: this.state.zones });
       }

       saveItem(oldItem, newItem) {
         let selectedItem = this.findItem(oldItem);
         selectedItem.name = newItem;
         this.setState({ zones: this.state.zones });
       }

       deleteItem(item) {
         let index = this.state.zones.map(element => element.name).indexOf(item);
         this.state.zones.splice(index, 1);
         this.setState({ zones: this.state.zones });
       }

       render() {
         return (
           <div className="to-do-app">
             <div className="header">
               <h1>Watering Zones</h1>
             </div>
             <CreateZone zones={this.state.zones} createItem={this.createItem.bind(this)}/>
             <ZoneList zones={this.state.zones} deleteItem={this.deleteItem.bind(this)} saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)}/>
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
