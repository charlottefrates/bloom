import React from 'react';

import {connect} from 'react-redux';


import {
  saveProjection,
  fetchProjections,
  deleteProjection
} from '../actions/history_actions';


import $ from 'jquery';

class History extends React.Component{
  componentDidMount() {
    this.props.dispatch(fetchProjections());
  }

  onDeleteClick = (id) => {
    this.props.dispatch(deleteProjection(id));
  }

  renderProjections() {
    return this.props.map((entry, index) => {
      return (
        <div className="entry" key={index}>
          <div className="zones">
          {entry.zones}
          </div>
          <div className="days">
            {entry.days}
          </div>
          <div className="gal_min">
            {entry.gal_min}
          </div>
          <div className="min">
            {entry.min}
          </div>
          <div className="projected">
            {entry.projected}
          </div>
          <div className="created">
            {entry.created}
          </div>
          <button onClick={() => this.onDeleteClick(entry.id)} className="deleteButton">delete</button>
          <i className="fa fa-ellipsis-h fa-lg" aria-hidden="true"></i>
        </div>
      );
    });
  }



  render(){
         return (
              <div className="main-content">
              <div className="row">
              <div className="col-12">
              <h1 className="postsHeader">Bloom Projections</h1>
                <div className="postContainer">
                {this.renderProjections()}
                </div>
                </div>
              </div>
              </div>

         )
    }
}


const mapStateToProps = (state, props) => ({
    entries: state.entries,
    authenticated: state.authenticated
});


//this tells connect to inject the location field we have in our reducer into this component
//passing in a function as the first argument that takes the entire state,
//and then we return what we want to inject as props into our component
//this automatically injects dispatch to run our actions,
//which is why we can use this.props.dispatch
export default connect(mapStateToProps)(History);
