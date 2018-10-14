import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MyInfoWindow from './MyInfoWindow';

const style = require("./mapStyle.json")

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultOptions={{ styles: style }}
    defaultZoom={13}
    defaultCenter={{ lat: 37.556, lng: -122.325 }}
  >
    {props.markers && props.markers.map((marker, id) => (
      marker.show && <Marker
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => props.clickMarker(marker)}
        key={id}
        animation={marker.animation}
      >
        {marker.clicked &&
          <MyInfoWindow
            venues={props.venues}
            markerId={marker.id}
            unclick ={() => props.clickMarker(marker)}
          />}
      </Marker>
    ))}
    
  </GoogleMap>
))



class Map extends Component {

  render() {

    return (
      <div id="map">
      <MyMapComponent
        markers = {this.props.markers}
        venues={this.props.venues}
        clickMarker={this.props.clickMarker}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDjfTIGUrSCKI8E_at-yYFNFdOckqk7KxM"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      /></div>
    )
  }
}

export default Map