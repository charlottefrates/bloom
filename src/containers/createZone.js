import React from 'react';

import {connect} from 'react-redux';


import  '../styles/zone.css';


//import {connect} from 'react-redux';

 class CreateZone extends React.Component{

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
               <button> + Create</button>
             </form>
           </div>
         );
       }
}


const mapStateToProps = (state, props) => ({
     zones: state.zones
});


//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(CreateZone);
