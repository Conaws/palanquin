import React                  from 'react';
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








const mapStateToProps = (state) => ({
  counter : state.counter,
  poemlist : state.poemlist,
  poem : state.poem,
  routerState : state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});







const lines = curry((props, s) => {
          return(
            <div> 
              <div style={{float:'right', height: '100%'}}>
                <Link to={`/poems/${props.poem.title}/${s.index}`} onClick={() => props.actions.activateStanza(s.index)}>
                  <div style={Object.assign({}, {marginTop: 20, marginBottom: 0, paddingLeft: 10, paddingRight: 10, overflow: 'hidden'}, outline)}
                       >
                    Study Lines
                  </div>
                </Link>
              </div>
              <div style={Object.assign(divStyle)}
              key={s.index}>
                {s.text}
              </div>
            </div>

           )});



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
  constructor(props){
    super(props)
    if (this.props.poem.title != this.props.params.title){
      let matchThis = R.find(R.propEq('title', this.props.params.title));
      this.props.actions.poemLoad(matchThis(this.props.poemlist));
    }
  }

  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number,
    poem     : React.PropTypes.object
  }

  render (){
    let {choices, visibleStanzas, stanzas, title, correctAnswer} = this.props.poem;
    let inc = this.props.actions.nextValIncrease
    let props = this.props
    return (
      <div className='container text-center'>
        {props.children}
        <Link to="/"><div>Home</div></Link>
        <h1>{this.props.params.title}</h1>
        {(choices.length > 0)? "" :<div style={outline} onClick={this.props.actions.poemStart}>Practice Stanzas</div>}
        {(choices.length > 0)? map(lines(props), visibleStanzas): map(lines(props), stanzas)}
        {(choices.length > 0)? renderChoices(choices, correctAnswer, inc): ""}
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Poem);
