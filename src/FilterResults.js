import React, { Component } from 'react';


class FilterResults extends Component {
  render() {
    const markersToShow = this.props.markers.filter(marker => marker.show === true);


    if (this.props.err) {
      return (
        <div>{this.props.err}</div>
      )
    } else {
      return (
        <div>
          <ul id="venues-list">
            {markersToShow.map((marker, id) => {
              const venueData = this.props.venues.find(venue => venue.id === marker.id);
              
              return (
                <li key={id}>
                  <h2>
                    {venueData.name}
                  </h2>
                  {venueData.bestPhoto && (
                    <img src={`${venueData.bestPhoto.prefix}250x250${venueData.bestPhoto.suffix}`} alt={venueData.name} className = 'venue-img'/>)
                  }
                  <p>
                    {venueData.location.formattedAddress}
                  </p>
                  {venueData.url && (
                    <p><a href={venueData.url}>Website</a></p>)
                  }
                  {/* {venueData.contact.formattedPhone && (
                    <p>{venueData.contact.formattedPhone}</p>)
                  } */}
                  {venueData.description && (
                    <p>{venueData.description}</p>)
                  }
                  {venueData.hours && (
                    <p>{venueData.hours.status}</p>)
                  }
                  
                    <a href="#maincontent" tabIndex="3" onClick={() => this.props.showOnMap(marker)}>Show on Map</a>
                    <div className="yellow"><img src={venueData.categories[0].icon.prefix + "45" + venueData.categories[0].icon.suffix} alt={venueData.categories[0].name}/>
                  </div>
                </li>
                
              )
            })}
          </ul>
        </div>
      )
    }
    
  }
}

export default FilterResults