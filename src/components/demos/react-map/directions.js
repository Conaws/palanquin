import React from 'react';
import {GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";



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