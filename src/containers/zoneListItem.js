import React from 'react';

import {connect} from 'react-redux';
import {
     edit_zone
} from '../actions/zone_actions';


class ZoneListItem extends React.Component{

       renderName() {
            const isEditing = this.props.editing;

            if(isEditing) {
                 return (
                     <form onSubmit={this.onSaveClick.bind(this)}>
                       <input type="text" ref="editInput" defaultValue={this.props.name} />
                     </form>
                 );
            }

           return (
                <span id= {this.props.id}>{this.props.name}</span>
           );
       }

       renderButtons() {
           const isEditing = this.props.editing;

           if (isEditing) {
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
                  <button onClick={this.props.deleteZone.bind(this)}>Delete</button>
                </span>
          );
       }

       onEditClick() {
           this.props.dispatch(edit_zone(this.props.id))
       }

       onCancelClick() {
         this.props.dispatch(edit_zone(this.props.id))
       }

       onSaveClick(e) {
         e.preventDefault();
         this.props.saveZone(this.refs.editInput.value,this.props.id);
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
