import React from 'react';

import ToDoListItem from './zoneListItem';


//import {connect} from 'react-redux';

export default class ZoneList extends React.Component{


     renderItems() {
        return this.props.zones.map(
           (item, index) => <ToDoListItem key={index} {...item} {...this.props} />
        );
     }

 render() {
   return (
     <div className="items-list">
       {this.renderItems()}
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
