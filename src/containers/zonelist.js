import React from 'react';

import {connect} from 'react-redux';

class Zones extends React.Component{


    render(){
         return (
              <div>
              <h1> I like cheese. </h1>
              </div>
         )

    }
}

const mapStateToProps = (state, props) => ({

});


//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(Zones);
