import React                  from 'react';
import Modal				  from 'react-modal'
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import {Link}                 from 'react-router';
import actionCreators         from 'actions';
import {divStyle, center, 
      flatButton, outline}             from 'styles';
import * as R                 from 'ramda';
import * as l                 from 'lodash-fp';
import {compose, curry, map, 
        get, trace}           from 'core';

import {pushState} from 'redux-router';







// const makeStanza = (lineArray) => {
//   return {
//     lines: R.range(0, lineArray.length),
//     visible: [],
//     choices: l.shuffle(lineArray),
//     correctAnswer: 0
//   }
// }




const mapStateToProps = (state) => ({
  counter : state.counter,
  poemlist : state.poemlist,
  poem : state.poem,
  routerState : state.router,
  stanza : state.poem.activateStanza
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width         : '50%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


//{{width: "80%", marginRight: 'auto', marginLeft: 'auto'}}


const renderChoices = (choices, correctAnswer, inc) => {
            return(<div>

                <div style={center}>
                  <h1 style={center}>Place These In the Right Order</h1>
                  {map(choice(correctAnswer, inc), l.shuffle(choices))}
                </div>
            </div>
           )};



const choice = curry((correctAnswer, inc, c) => {
  return <button 
      key={c.index} 
      style={{padding: '2%', margin: '2%'}}
      onClick={() => check(c.order, correctAnswer, inc)}>
        {c.text}
      </button>
    });


const check = (submission, answer, inc) => {
  if (submission == answer) {
    alert('you got it');
    inc(); 
  }
  else
    console.log('failure');
}


const  updateStanza = (stanzaState) => {
    newVal = R.add(1, state.correctAnswer);
    //todo --> if newVal = lines.length do something
    return R.merge(state, {
      correctAnswer: newVal,
      visibleStanzas: filter(compose(lt(newVal), prop('order')))(state.choices),
      choices: l.shuffle(filter(compose(gte(newVal), prop('order')))(state.choices))
      })

  }




const lines = l => {
          return <div order={l.order}>{l.text}</div>
        };



class Line extends React.Component {

  componentWillMount(){
    this.props.actions.activateStanza(this.props.params.line); 

  }

  componentWillUnmount(){
    this.props.actions.deactivateStanza()
  }




		render(){
      let stanza = this.props.poem.activeStanza;
			let inc = () => this.props.actions.updateStanza();
      //this.props.actions.log('failure');

			let stanzaLines = stanza.visible;
			let choices = stanza.choices;
			let correctAnswer = stanza.correctAnswer;


      return(<Modal
			  isOpen={true}
			  onRequestClose={() => document.getElementById('exit').click()}
			  style={customStyles}
			  closeTimeoutMS={50}
			  >
        <div style={{marginBottom: 25}}>
			  <div style={{float: 'right'}}>
			  	<Link id="exit" to={`/poems/${this.props.params.title}`}><button>Go Home</button></Link>
			  	
			  </div>
        </div>
        <div>

			  {map(lines, stanzaLines)}
			  {(choices.length > 0)? renderChoices(choices, correctAnswer, inc): ""}

        </div>
			</Modal>
      )}
  };

export default connect(mapStateToProps, mapDispatchToProps)(Line);
