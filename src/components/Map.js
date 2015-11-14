import React    from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import actionCreators         from 'actions';
import {Link}                 from 'react-router';
import {divStyle, center, PalanquinImage}           from 'styles';
import * as R from 'ramda';
import * as l from 'lodash-fp';
import {Motion, spring} from 'react-motion';
import {
  default as canUseDOM,
} from "can-use-dom";

import {default as raf} from "raf";


import {GoogleMap, Marker, DirectionsRenderer, Circle, InfoWindow} from "react-google-maps";


const geolocation = (
  canUseDOM && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure("Your browser doesn't support geolocation.");
    },
  }
);

/*
 * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
 class Geolocation extends React.Component {

  state = {
    center: null,
    content: null,
    radius: 6000,
  }

  componentDidMount () {
    geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        content: "Location found using HTML5.",
      });

      const tick = () => {
        this.setState({ radius: Math.max(this.state.radius - 20, 0) });

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
            fillColor: "red",
            fillOpacity: 0.20,
            strokeColor: "red",
            strokeOpacity: 1,
            strokeWeight: 1,
          }} />),
      ]);
    }

    return (
      <GoogleMap containerProps={{
          ...this.props,
          style: {
            height: "100%",
          },
        }}
        defaultZoom={12}
        center={center}>
        {contents}
      </GoogleMap>
    );
  }
}



class GettingStarted extends React.Component {
 state = {
    markers: [{
      position: {
        lat: 25.0112183,
        lng: 121.52067570000001,
      },
      key: "Taiwan",
      defaultAnimation: 2
    }],
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  _handle_map_click (event) {
    var {markers} = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(),// Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });

    if (3 === markers.length) {
      this.props.toast(
        "Right click on the marker to remove it",
        "Also check the code!"
      );
    }
  }

  _handle_marker_rightclick (index, event) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    var {markers} = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1]
      ],
    });
    this.setState({ markers });
  }

  render () {
    return (
      <GoogleMap containerProps={{
          ...this.props,
          style: {
            height: "100%",
          },
        }}
        ref="map"
        defaultZoom={3}
        defaultCenter={{lat: -25.363882, lng: 131.044922}}
        onClick={::this._handle_map_click}>
        {this.state.markers.map((marker, index) => {
          return (
            <Marker
              {...marker}
              onRightclick={this._handle_marker_rightclick.bind(this, index)} />
          );
        })}
      </GoogleMap>
    );
  }
}

export default class Directions extends React.Component {

  state = {
    origin: new google.maps.LatLng(41.8507300, -87.6512600),
    destination: new google.maps.LatLng(41.8525800, -87.6514100),
    directions: null,
  }

  componentDidMount () {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if(status == google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        })
      }
      else {
        console.error(`error fetching directions ${ result }`);
      }
    });
  }

  render () {
    const {origin, directions} = this.state;

    return (
      <GoogleMap containerProps={{
          ...this.props,
          style: {
            height: "100%",
          },
        }}
        defaultZoom={7}
        defaultCenter={origin}>
        {directions ? <DirectionsRenderer directions={directions} /> : null}
      </GoogleMap>
    );
  }
}



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



const getPosition = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.longitude;
    let long = position.coords.latitude;
    console.log(lat, long)
    return [lat, long];
  }, (error) => alert("You Can't Use This Site without Location"))
}


export default class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {visible: false, position: getPosition()}
    console.log(this.state)
  }


  closeMe(){
    this.setState({visible: false}); 
  }

  render () {
    return (
        <div style={{backgroundColor: 'grey', height: 250, width: 250}}>
          <Directions />
          
          <h1>There Should be something here</h1>
          <GettingStarted />
          
        </div>
      
    );
  }
}


        // {(this.state.visible)? bluebox(
        //         <div>
        //         <h1>Hello</h1>
        //         <div onClick={() => {
        //           this.setState({visible: false}); 
        //           console.log(this.state)}}
        //           style={flatButton}>
        //             Nevermind
        //           </div>
        //         </div>) : ""}
        //   <div>
        //     {bluebox(
        //       <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems:'center', color: 'white'}}>          
        //       <img style={{height: 75}} src={PalanquinImage}/>
        //       {box(<div style={{fontSize: 40, display: 'flex', flexDirection: 'column', justifyContent:'center', padding: 5}}>Palanquin</div>)}
        //       <div style={{flexGrow:1}}>   
        //         <Link to={"/"}>
        //           <div style={flatButton}>
        //             Your Chariot Awaits
        //           </div>
        //         </Link>
        //       </div>
        //         <img style={{height:75}}src={PalanquinImage} />
        //       </div>
        //     )}
        //   </div>