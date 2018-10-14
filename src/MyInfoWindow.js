import React from 'react';
import { InfoWindow } from "react-google-maps"

class MyInfoWindow extends React.Component {

  render() {
    const venueData = this.props.venues.find(venue => venue.id === this.props.markerId);
    console.log(venueData);
    return (
      <InfoWindow onCloseClick={this.props.unclick}>
        <div id = "infoWindow">
          <h2>
            {venueData.name}
          </h2>
          <span className="yellow"><img src={venueData.categories[0].icon.prefix + "45" + venueData.categories[0].icon.suffix} alt={venueData.categories[0].name}/></span>
          {venueData.hours && (
                  <p>{venueData.hours.status}</p>)}
          <p>
            {venueData.location.formattedAddress}
          </p>
          
        </div>
      </InfoWindow>
    )
  }
 }
    

   

export default MyInfoWindow