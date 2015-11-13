import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import actionCreators         from 'actions';
import {Link}                 from 'react-router';
import {flatButton, divStyle, center, PalanquinImage}           from 'styles';
import Modal from 'react-modal';
import * as R from 'ramda';
import * as l from 'lodash-fp';
import {Motion, spring} from 'react-motion';
// import {MapGL} from 'react-map-gl'



import {TransitionMotion} from 'react-motion';



const getStyles = function(blocks) {

    let configs = {};
    //or blocks.keys.map
    Object.keys(blocks).forEach(key => {
      configs[key] = {
        opacity: spring(1, [50, 10]),
        height: spring(20),
        text: blocks[key] // not interpolated

      };
    });
    return logger(configs);
}

const willEnter = function(inputText) {
    return {
      opacity: 0,
      width: 0,
      height: 0, // start at 0, gradually expand
      text: inputText // this is really just carried around so
      // that interpolated values can still access the text when the key is gone
      // from actual `styles`
    };
  }



const willLeave = function(key, style) {
  return {
    opacity: spring(0, [100, 10]), // make opacity reach 0, after which we can kill the key
    text: style.text,
    height: spring(0, [100, 15])
  };
}


export const speakers = (speakers, that) => { 
      logger(speakers);
      logger(that);
      return <TransitionMotion
        styles={getStyles(speakers)}
        willEnter={willEnter}
        willLeave={willLeave}>
        {interpolatedStyles =>
          <div>
            {Object.keys(interpolatedStyles).map(key => {
              const {text, ...style} = interpolatedStyles[key];
              return (
                <div style={style} onClick={that.addSpeaker.bind(event, text, text)}>
                  {text}
                </div>
              );
            })}
          </div>
        }
      </TransitionMotion>
}




const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    minHeight             :  250,
    bottom                : 'auto',
    maxHeight             : '80%',
    width                 : '80%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflow              : 'scroll'
  }
};


const bluebox = (inner) => { return <Motion 
          defaultStyle={{x: 0, z: 0, y: 0}} 
          style={{x: spring(720, [20, 9]), z: spring(400), y: spring(300)}}>
            {value => {
              let viz = {
                backgroundColor: 'purple',
                border: '2px solid blue',
                margin: '0 auto',
                width: value.y,
                height: value.z,
                opacity: (value.z / 400),
                transform: `rotate(${value.x}deg)`
              }
              return(<div style={viz}>{inner}</div>)}}
        </Motion>  
}

const pinkbox = (inner) => { return <Motion 
          defaultStyle={{x: 0, z: 0}} 
          style={{x: spring(720, [20, 12]), z: spring(400)}}>
            {value => {
              let viz = {
                backgroundColor: 'purple',
                whiteSpace: 'nowrap',
                margin: '0 auto',
                top: '50%',
                position: 'relative',
                transform: 'translateY(-50%)',
                border: '2px solid red',
                width: value.x/4,
                height: value.z / 4,
                opacity: (value.z / 400),
                transform: `rotate(${value.x}deg)`
              }
              return(<div style={viz}>{inner}</div>)}}
        </Motion>  
}

const box = (inner) => { return <Motion 
          defaultStyle={{x: 0, z: 0}} 
          style={{x: spring(720, [20, 12]), z: spring(400, [20, 12])}}>
            {value => {
              let viz = {
                backgroundColor: 'purple',
                whiteSpace: 'nowrap',
                margin: '0 auto',
                paddingBottom: 5,
                paddingTop: 5,
                border: '2px solid red',
                height: value.z / 4,
                opacity: (value.z / 400),
                transform: `rotate(${value.x}deg)`
              }
              return(<div style={viz}>{inner}</div>)}}
        </Motion>  
}




// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

const mapStateToProps = (state) => ({
  poem : state.poem,
  routerState : state.router,
  poemlist : state.poemlist
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});


export class HomeView extends React.Component {
  constructor(props){
    super(props)
    this.state = {visible: false}
    console.log(this.state)
  }
  static propTypes = {
    actions  : React.PropTypes.object,
    poem     : React.PropTypes.object,
    poemlist : React.PropTypes.array
  }

  closeMe(){
    this.setState({visible: false}); 
  }


  render () {

    let {poemLoad} = this.props.actions;
    return (
        <div className="flex">
        <div className='container text-center' >

        {(this.state.visible)? bluebox(
                <div>
                <h1>Hello</h1>
                <div onClick={() => {
                  this.setState({visible: false}); 
                  console.log(this.state)}}
                  style={flatButton}>
                    Nevermind
                  </div>
                </div>) : "NO"}
          <div style={{}}>
            {bluebox(

              <div style={{color: 'white'}}>
                <img style={{height: 75}}src={PalanquinImage} />
                {pinkbox(<h1>Palanquin</h1>)}
                <strong>Better Than A Camel</strong>
                <div onClick={() => {
                  this.setState({visible: true}); 
                  console.log(this.state)}}
                  style={flatButton}>
                  Your Chariot Awaits</div>
                  <img style={{height: 75}}src={PalanquinImage} />
                </div>

            )}
          </div>
          </div>
        </div>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
