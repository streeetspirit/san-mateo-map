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
          {venueData.bestPhoto && (
            <img src={`${venueData.bestPhoto.prefix}250x250${venueData.bestPhoto.suffix}`} alt={venueData.name} className = 'venue-img'/>)
          }
          <p>
            {venueData.location.formattedAddress}
          </p>
        </div>
      </InfoWindow>
    )
  }
 }
    

   

export default MyInfoWindow