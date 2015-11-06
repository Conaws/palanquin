import React                  from 'react';
import Modal				  from 'react-modal'
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import {Link}                 from 'react-router';
import actionCreators         from 'actions';
import {divStyle, center, 
      flatButton, outline}             from 'styles';
import * as _                 from 'ramda';
import * as l                 from 'lodash-fp';
import {compose, curry, map, 
        get, trace}           from 'core';



const renderChoices = (choices, correctAnswer, inc) => {
            return(<div>

                <div style={{width: "80%", marginRight: 'auto', marginLeft: 'auto'}}>
                  <h1 style={center}>These are your Choices</h1>
                  {map(choice(correctAnswer, inc), l.shuffle(choices))}
                </div>
            </div>
           )};



const choice = curry((correctAnswer, inc, c) => {
  return <button key={c.index} style={{width: 250, height: 250, padding: '2%', margin: '2%'}}
  onClick={() => check(c.index, correctAnswer, inc)}>
    {l.trunc(300, c.text)}
    </button>
});

// onRequestClose={fn}


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Line extends React.Component {
		render(){
          return(
          	<Modal
			  isOpen={true}
			  style={customStyles}
			  closeTimeoutMS={50}
			  >

			  <h1>Modal Content</h1>
			  <div style={{float: 'right'}}>
			  <Link to={`/poems/${this.props.params.title}`}>Go Home</Link>
			  <p>Etc.</p>          	
			  <h1>{this.props.params.line}</h1>

			  </div>
			</Modal>
           )
      }
  };

export default Line;
