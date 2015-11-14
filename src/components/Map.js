import React    from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import actionCreators         from 'actions';
import {Link}                 from 'react-router';
import {divStyle, center, PalanquinImage} from 'styles';
import * as R from 'ramda';
import * as l from 'lodash-fp';
import {Motion, spring} from 'react-motion';
import canUseDOM from "can-use-dom";
import raf from "raf";


import {GoogleMap, Marker, Circle, InfoWindow} from "react-google-maps";


// import Directions from './demos/react-map/directions';
// import SimpleClick from './demos/react-map/ZoomMarker';
// import MultipleMarkers from './demos/react-map/MultipleMarkers';



const geolocation = (
  canUseDOM && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure("Your browser doesn't support geolocation.");
    },
  }
);



const blue = '#337ab7';

const flatButton  =  { cursor: 'pointer', padding: 12, margin:20, minWidth: 100, maxWidth: 200, color: blue, minHeight: 50, border: "1px solid black", borderRadius: 5};


const parent = {
        minHeight: '100vh',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-end',
        overflow: 'scroll'
        };


const child1 = {alignSelf: 'flex-end', backgroundColor: 'red', display: 'flex', alignItems: 'flex-end'}


const child2= {alignSelf: 'center', flexWrap: 'wrap', display: 'flex', justifyContent: 'center', flex: 1}
const innerchild = {alignSelf: 'center', backgroundColor: 'purple', fontSize: 40}

const child3 = {alignSelf: 'flex-start', backgroundColor: 'orange', display: 'flex', alignItems: 'flex-end'}






// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html


//Purer Function for getting and returning latlong

// const getPosition = () => {
//   navigator.geolocation.getCurrentPosition((position) => {
//     let lat = position.coords.longitude;
//     let long = position.coords.latitude;
//     console.log(lat, long)
//     return [lat, long];
//   }, (error) => alert("You Can't Use This Site without Location"))
// }




export default class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      center: {lat: null, lng: null},
      content: null,
      radius: 1200,
    }
    console.log(this.state);
  }

  componentDidMount = () => {
    geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        content: "Your loyal subjects will meet you here",
      });
  
    const tick = () => {
        this.setState({ radius: Math.max(this.state.radius - 10, 0) });
        console.log(this.state);
        if (this.state.radius > 200) {
          raf(tick);
        }
      };
      raf(tick);
    }, (reason) => {
      this.setState({
        center: {
          lat: 60,
          lng: 105
        },
        content: `Error: The Geolocation service failed (${ reason }).`
      });
    });
  }

  render () {
    const {center, content, radius} = this.state;
    let contents = [];
    if (center) {
      contents = contents.concat([
        (<InfoWindow key="info" position={center} content={content} />),
        (<Circle key="circle" center={center} radius={radius} options={{
            fillColor: "purple",
            fillOpacity: 0.20,
            strokeColor: "blue",
            strokeOpacity: 1,
            strokeWeight: 2,
          }} />),
      ]);
    }

    return (<div style={parent}>
      {box(<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid white'}}>
        <div style={{flexGrow: 1}}>
          This should take all the space
        </div>
        <h1>More Stuff</h1>
        <div id="protective" style={{height:250, width:250}}>
          <GoogleMap containerProps={{
                ...this.props,
                style: {
                backgroundColor: 'purple', height: 250, width: 250
                },
              }}
              defaultZoom={12}
              center={center}>
              {contents}
            </GoogleMap>
          </div> 
          </div>)}
      </div>);
    }
}

const box = (inner) => { return <Motion 
          defaultStyle={{x: 0, z: 0, y: 0}} 
          style={{x: spring(720, [20, 9]), z: spring(400), y: spring(300)}}>
            {value => {
              let viz = {
                backgroundColor: 'purple',
                display: 'flex',
                border: '2px solid blue',
                borderRadius: 15, 
                justifyContent: 'center',
                width: value.y,
                height: value.z,
                opacity: (value.z / 400),
                transform: `rotate(${value.x}deg)`
              }
              return(<div style={viz}>{inner}</div>)}}
        </Motion>  
}



