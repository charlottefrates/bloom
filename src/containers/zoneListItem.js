import React from 'react';

import {connect} from 'react-redux';
import {
     create_zone,
     save_zone,
     edit_zone,
     delete_zone
} from '../actions/zone_actions';


class ZoneListItem extends React.Component{

       renderName() {
         if(this.props.editing) {
           return (
               <form onSubmit={this.onSaveClick.bind(this)}>
                 <input type="text" ref="editInput" defaultValue={this.props.name} />
               </form>
           );
         }

         return (
           <span>{this.props.name}</span>
         );
       }

       renderButtons() {
         if (this.props.editing) {
           return (
             <span>
               <button onClick={this.onSaveClick.bind(this)}>Save</button>
               <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
             </span>
           );
         }

         return (
           <span>
             <button onClick={this.onEditClick.bind(this)}>Edit</button>
             <button onClick={this.props.deleteZone.bind(this, this.props.name)}>Delete</button>
           </span>
         );
       }

       onEditClick() {
         this.props.dispatch(edit_zone())
       }

       onCancelClick() {
         return false;
       }

       onSaveClick(e) {
         e.preventDefault();
         this.props.saveZone(this.props.name, this.refs.editInput.value);
       }

       render() {
         return (
           <div className="to-do-item">
             <span className="name">
             {this.renderName()}
             </span>
             <span className="actions">
             {this.renderButtons()}
             </span>
           </div>
         );
       }

}

const mapStateToProps = (state, props) => ({
     zones: state.zones
});


export default connect(mapStateToProps)(ZoneListItem);
