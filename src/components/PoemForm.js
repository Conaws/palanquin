import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import {Link}                 from 'react-router';
import actionCreators         from 'actions';
import {divStyle}             from 'styles';
import * as _                 from 'ramda';
import * as l                 from 'lodash-fp';
import {compose, curry, map, 
        get, trace}           from 'core';




const mapStateToProps = (state) => ({
  counter : state.counter,
  poem : state.poem,
  routerState : state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});



export class PoemForm extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number,
    poem     : React.PropTypes.object
  }

  render () {
    return (
      <div className='container text-center'>
          <div style={divStyle}>
            <Link to='/'>Go Home</Link>
            <h1>Add A New Poem</h1>
            <input ref='contenttitle' style={{fontSize:20, margin: 10, textAlign: 'center'}} type="text" placeholder="Title"></input>
            <textArea ref='contentbody' style={{height: 400,textAlign: 'center', width: "100%"}} placeholder="Stuff to Memorize"></textArea>
            <button onClick={() => {
              this.props.actions.addPoem(this.refs.contenttitle.value, this.refs.contentbody.value)
            }}>Log</button>
          </div>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PoemForm);
