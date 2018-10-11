import React from 'react';
import { InfoWindow } from "react-google-maps"

class MyInfoWindow extends React.Component {

  render() {
    const venueData = this.props.venues.find(venue => venue.id === this.props.markerId);
    console.log(venueData);
    return (
      <InfoWindow>
        <div id = "infoWindow">
          <h2>
            {venueData.name}
          </h2>
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