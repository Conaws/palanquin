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

