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


const ginnyphone = "16059544669"

const geolocation = (
  navigator.geolocation || {
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



const getPosition = () => geolocation.getCurrentPosition((position) => {
      return ({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        content: "Your loyal subjects will meet you here"
      });
}, (error) => {
  return{
        center: {
          lat: 38.496417,  
          lng: -123.007113
        },
        content: `Lost without you, your subjects head to your last known whereabouts`
     }
});







export class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = props.position
  }

  componentDidMount = () => {
    this.props.actions.getPosition(getPosition());
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
        if (this.state.radius > 200) {
          raf(tick);
        }
      };
      raf(tick);
    }, (reason) => {
      this.setState({
        center: {
          lat: 38.496417,  
          lng: -123.007113
        },
        content: `Lost without you, your subjects head to your last known whereabouts`
      });
    });
  }

  render () {
    const {center, content, radius, pitch} = this.state;
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
              {box(<div id="protective" style={{height:250, width:250, marginBottom: 20, borderRadius: 5}}>        
                    <GoogleMap 
                      containerProps={{
                          ...this.props,
                          style: {
                            backgroundColor: 'purple', height: 250, width: 250, marginBottom: 20, borderRadius: 5
                            }
                          }}
                        defaultZoom={12}
                        center={center}>
                          {contents}
                      </GoogleMap>
                    </div>, pitch)}
              </div>);
    }
}

const box = (inner, pitch) => {   
        return <Motion 
          defaultStyle={{x: 0, z: 0, y: 0, p:0 }} 
          style={{x: spring(720, [20, 9]), z: spring(450), y: spring(350), p: spring(5000000, [5, 2])}}>
            {value => {
              let viz = {
                backgroundColor: 'purple',
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid blue',
                borderRadius: 15, 
                justifyContent: 'center',
                alignItems: 'center',
                width: value.y,
                height: value.z,
                opacity: (value.z / 500),
                transform: `rotate(${value.x}deg)`,
                data: value.p / 95
              }
              return(<div style={viz}>
                      <div style={{alignSelf: 'flex-end'}}>
                      <Link to={"/"}><div style={{padding: 15, marginTop: 25, marginBottom: -30, backgroundColor: 'white', height: 25}}>X</div></Link>
                      </div>
                      <div style={{flexGrow: 1, display: 'flex', alignItems:'center', flexDirection: 'column', color: 'white'}}>
                        <div style={{display: 'flex', flexGrow: 1, alignItems:'center', justifyContent:'center', flexDirection: 'column', fontSize: 20, marginTop:20, alignSelf: 'center'}}>
                          <p>Estimated Trip Cost</p>
                          <p>${parseInt(viz.data)}.00</p>
                        </div>
                        <a href="tel:+12015747265" style={R.merge(flatButton, {fontSize: 15})}>{pitch}</a>
                      </div>
                      {inner}
                    </div>)}}
        </Motion>  
}

const mapStateToProps = (state) => ({
  position : state.position,
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);


