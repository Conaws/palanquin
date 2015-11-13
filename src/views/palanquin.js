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
import {TransitionMotion} from 'react-motion';




const getStyles = function(blocks) {

    let configs = {};
    //or blocks.keys.map
    blocks.map(key => {
      configs[key] = {
        opacity: spring(1, [50, 10]),
        height: spring(20),
        text: key // not interpolated

      };
    });
    return configs;
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


export const speakers = (speakers) => { 
      return <TransitionMotion
        styles={getStyles(speakers)}
        willEnter={willEnter}
        willLeave={willLeave}>
        {interpolatedStyles =>
          <div>
            {Object.keys(interpolatedStyles).map(key => {
              const {text, ...style} = interpolatedStyles[key];
              return (
                <div style={style} onClick={()=> console.log('hellow')}>
                  {text}
                </div>
              );
            })}
          </div>
        }
      </TransitionMotion>
}



const mapStateToProps = (state) => ({
  poem : state.poem,
  routerState : state.router,
  poemlist : state.poemlist
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});



export class HomeView2 extends React.Component {
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
        <div style={{
        	minHeight: '100vh',
        	flexDirection: 'column',
        	display: 'flex',
  			alignItems: 'center',
  			justifyContent: 'center',
  			alignContent: 'flex-end'
  			
        }}>
	      	<div style={{alignSelf: 'flex-end', backgroundColor: 'red', display: 'flex', alignItems: 'flex-end'}}>
	            <div style={{fontSize: 40}}>
	    			<strong>{speakers(['hello'])}</strong>
	      		</div>
	        </div>
	       <div style={{alignSelf: 'center', flexWrap: 'wrap', display: 'flex', justifyContent: 'center', flex: 1}}>
	        	<div style={{alignSelf: 'center', backgroundColor: 'red', fontSize: 40}}>
	        	<strong>Center</strong>
	        	</div>
	        </div>
	        <div style={{alignSelf: 'flex-start', backgroundColor: 'red', display: 'flex', alignItems: 'flex-end'}}>
	            <div style={{fontSize: 40}}>
        			<strong>Bottom</strong>
          		</div>
	        </div>
	        <div style={{alignSelf: 'flex-end', backgroundColor: 'red', display: 'flex', alignItems: 'flex-end'}}>
	            <div style={{fontSize: 40}}>
        			<strong>Bottom</strong>
          		</div>
	        </div>
	      	<div style={{alignSelf: 'flex-end', backgroundColor: 'red', display: 'flex', alignItems: 'flex-end'}}>
	            <div style={{fontSize: 40}}>
        			<strong>Bottom</strong>
          		</div>
	        </div>

        </div>
      
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeView2);