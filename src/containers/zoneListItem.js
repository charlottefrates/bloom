import React from 'react';

import CreateZone from './createZone';
import ZoneList from './zonelist';
import Zones from './zone';

export default class ZoneListItem extends React.Component{
     constructor(props) {
         super(props);

         this.state = {
           editing: false,
         };
       }

       renderName() {
         const itemStyle = {
           'text-decoration': this.props.completed ? 'line-through' : 'none',
           cursor: 'pointer'
         };

         if(this.state.editing) {
           return (
               <form onSubmit={this.onSaveClick.bind(this)}>
                 <input type="text" ref="editInput" defaultValue={this.props.name} />
               </form>
           );
         }

         return (
           <span style={itemStyle} onClick={this.props.toggleComplete.bind(this, this.props.name)}>{this.props.name}</span>
         );
       }

       renderButtons() {
         if (this.state.editing) {
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
             <button onClick={this.props.deleteItem.bind(this, this.props.name)}>Delete</button>
           </span>
         );
       }

       onEditClick() {
         this.setState({ editing: true });
       }

       onCancelClick() {
         this.setState({ editing: false });
       }

       onSaveClick(e) {
         e.preventDefault();
         this.props.saveItem(this.props.name, this.refs.editInput.value);
         this.setState({ editing: false });
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
