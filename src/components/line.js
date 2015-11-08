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




const findbyTitle = (val) => R.where({title: val})


const textLength = R.compose(R.prop('length'), R.prop('text'));
const textDescending = R.reverse(R.sortBy(textLength))
const longestText = R.compose(trace('beforeHead'), textDescending)
const groupByTextLength = R.partition((o) => textLength(o) > 500);



const addC = R.mapObj((val) => val + "C")
const addCtoTitleText = compose(map(addC), get('poemlist'))




const getStanzas = R.compose(R.prop('stanzas'), R.prop('poem'));
const addActive = R.assoc('active', true)
const ActivateStanzas = compose(R.map(addActive), getStanzas);


//problem with this right now -- removing activation when switch
const activateStanza = (val) => R.assocPath(['poem', 'stanzas', val, 'active'], true)

//state, go poem, to stanza, to lines

//const targetStanza = (match) => compose(R.prop(match), getStanzas)

const targetStanza = (val) => R.path(['poem', 'stanzas', val]);


const ramda = (x, y) => trace("Where my ramda work goes", compose(R.prop('lines'), targetStanza(x))(y));





const mapStateToProps = (state) => ({
  counter : state.counter,
  poemlist : state.poemlist,
  poem : state.poem,
  routerState : state.router
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
    alert('failure');

}







const withOrder = (text, order) => ({order, text});

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

			let stanza = targetStanza(this.props.params.line)(this.props)
			let inc = () => console.log('closer');
			let stanzaLines = map(withOrder, stanza.lines);
			let choices = [R.head(stanzaLines)];
			let correctAnswer = 0;


      return(<Modal
			  isOpen={true}
			  onRequestClose={() => document.getElementById('exit').click()}
			  style={customStyles}
			  closeTimeoutMS={50}
			  >
        <div style={{marginBottom: 25}}>
			  <div style={{float: 'right'}}>
			  	<Link id="exit" to={`/poems/${this.props.params.title}`}>Go Home</Link>
			  	<button onClick={() => ramda(this.props.params.line, this.props)}>ramda</button>
			  </div>
        </div>
        <div>

			  {(choices.length > 0)? map(lines, stanzaLines) : map(lines, stanzaLines)}
			  {(choices.length > 0)? renderChoices(choices, correctAnswer, inc): ""}

        </div>
			</Modal>
      )}
  };

export default connect(mapStateToProps, mapDispatchToProps)(Line);
