import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import {Link}                 from 'react-router';
import actionCreators         from 'actions';
import * as _ from 'ramda';
import * as l from 'lodash-fp';



// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

const mapStateToProps = (state) => ({
  counter : state.counter,
  poem : state.poem,
  routerState : state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});




/////////////////////


const compose = _.compose;
const curry = _.curry;
const map = curry((cb, iterable) => iterable.map(cb));

const get = curry((val, obj) => {
  if (Map.isMap(obj)) {
    return obj.get(val);
  }
  else
    return obj[val];
})

const trace = curry((tag, x) => {console.log(tag, x); return x});


const withIndex = map((text, index) => ({index, text}));


/////to be removed ^


const divStyle = {width: 300, marginLeft: 'auto', marginRight: 'auto', paddingTop: 15, paddingBottom: 10, borderBottom: '1px solid black'}



const lines = (s) => {
          return(
            <div style={divStyle}
            key={s.index}>{s.text}</div>
           )};


// const lines = (stanzas) => {
//           return(
//             <div style={divStyle}> 
//               {stanzas.map((s) => {return <div key={s.index}>{s.text}</div>})}
//             </div>
//            )
//         };



const renderChoices = (choices, correctAnswer, inc) => {
            return(<div>
                
                <div style={{width: "80%", marginRight: 'auto', marginLeft: 'auto'}}>
                  <h1 style={{textAlign: 'center', marginRight: 'auto', marginLeft: 'auto'}}>These are your Choices</h1>
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
    //hide this
    alert('failure');
  
}


class Poem extends React.Component {
  render (){
    let {choices, visibleStanzas, stanzas, title, correctAnswer} = this.props.poem;
    let inc = this.props.actions.nextValIncrease
    return (
      <div style={divStyle}>
        <h1>{title}</h1>
        {(choices.length > 0)? "" :<button onClick={this.props.actions.poemStart}>Start</button>}
        {(choices.length > 0)? map(lines, visibleStanzas): map(lines, stanzas)}
        {(choices.length > 0)? renderChoices(choices, correctAnswer, inc): ""}
      </div>
    )
  }
}


//////////////////////




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
            <h1>This is where the newness goes</h1>
            <input ref='contenttitle' style={{fontSize:20, margin: 10, textAlign: 'center'}} type="text" placeholder="Title"></input>
            <textArea ref='contentbody' style={{height: 400,textAlign: 'center', width: "100%"}} placeholder="Stuff to Memorize"></textArea>
            <button onClick={() => {
              console.log('hey')
              this.props.actions.addPoem(this.refs.contenttitle.value, this.refs.contentbody.value)
            }}>Log</button>
          </div>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PoemForm);