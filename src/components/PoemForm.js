import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import {Link}                 from 'react-router';
import actionCreators         from 'actions';
import * as _                 from 'ramda';
import * as l                 from 'lodash-fp';
import {compose, curry, map, 
        get, trace}           from 'core';
import {divStyle, formText, 
       formTitle, flatButton} from 'styles';


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

  handleClick (e, action) {
    if (this.refs.contentbody.value == ''){
       alert('Poem Must Have Text');
       return
    }
    if (this.refs.contenttitle.value == ''){
       alert('Poem Must Have Title');
       return
    }
    action(this.refs.contenttitle.value, this.refs.contentbody.value);
    this.refs.contenttitle.value = '';
    this.refs.contentbody.value = '';
    this.refs.contenttitle.placeholder = 'Success';
    this.refs.contentbody.placeholder = 'Poem Submitted \n Add another if you wish';
  }

  render () {
    let {addPoem} = this.props.actions;
    return (
      <div className='container text-center'>
          <div style={divStyle}>
            <Link to='/'>Go Home</Link>
            <h1 ref='title'>Add A New Poem</h1>
            <input ref='contenttitle' style={formTitle} type="text" placeholder="Title"></input>
            <textArea ref='contentbody' style={formText} placeholder="Stuff to Memorize"></textArea>
            <div style={flatButton} onClick={(e) => this.handleClick(e, addPoem)}>Add Poem</div>
          </div>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PoemForm);
