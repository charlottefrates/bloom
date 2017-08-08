import React from 'react';

import  '../styles/zone.css';


//import {connect} from 'react-redux';

export default class CreateZone extends React.Component{

     handleCreate(e) {
         e.preventDefault();

         if (!this.refs.newZoneInput.value) {
           alert('Please enter a task name.');
           return;
      } else if (this.props.zones.map(element => element.name).indexOf(this.refs.newZoneInput.value) !== -1) {
           alert('This task already exists.');
           this.refs.newZoneInput.value = '';
           return;
         }

         this.props.createZone(this.refs.newZoneInput.value);
         this.refs.newZoneInput.value = '';
       }

       render() {
         return (
           <div className="create-new">
             <form id="zoneform" onSubmit={this.handleCreate.bind(this)}>
               <input type="text" placeholder="New Zone" ref="newZoneInput" />
               <button>Create</button>
             </form>
           </div>
         );
       }
}
