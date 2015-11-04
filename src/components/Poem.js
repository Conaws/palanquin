import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import {Link}                 from 'react-router';
import actionCreators         from 'actions';
import {divStyle, center}             from 'styles';
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





const lines = (s) => {
          return(
            <div style={divStyle}
            key={s.index}>{s.text}</div>
           )};



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


const check = (submission, answer, inc) => {
  if (submission == answer) {
    alert('you got it');
    inc();
  }
  else
    alert('failure');

}


export class Poem extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number,
    poem     : React.PropTypes.object
  }

  render (){
    let {choices, visibleStanzas, stanzas, title, correctAnswer} = this.props.poem;
    let inc = this.props.actions.nextValIncrease
    return (
      <div className='container text-center'>
        <h1>{this.props.params.title}</h1>
        {(choices.length > 0)? "" :<button onClick={this.props.actions.poemStart}>Start</button>}
        {(choices.length > 0)? map(lines, visibleStanzas): map(lines, stanzas)}
        {(choices.length > 0)? renderChoices(choices, correctAnswer, inc): ""}
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Poem);
