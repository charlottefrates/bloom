import React from 'react';

export default class ToDoListItem extends React.Component{
     constructor(props) {
         super(props);

         this.state = {
           editing: false,
         };
       }

       renderName() {
         if(this.state.editing) {
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
             <button onClick={this.props.deleteZone.bind(this, this.props.name)}>Delete</button>
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
         this.props.saveZone(this.props.name, this.refs.editInput.value);
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
