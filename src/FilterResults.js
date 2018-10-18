import React, { Component } from 'react';
import PropTypes from 'prop-types';


class FilterResults extends Component {
  
  render() {
    if (this.props.err || (typeof (this.props.venues) === 'undefined') || (typeof (this.props.markers) === 'undefined')) {
      return (
        <div class='err'>{this.props.err}</div>
      )
    } else {
      let markersToShow = this.props.markers || [];
      
      if (this.props.category !== 'all') {
        markersToShow = this.props.markers.filter(marker => marker.category === this.props.category);
      }

      return (
        <div>
          <ul id="venues-list">
            
            {this.props.venues && this.props.markers &&
              markersToShow.map((marker, id) => {
              const venueData = this.props.venues.find(venue => venue.id === marker.id );

              return(
             
                <li key={id} arialabelled-by="venueName">
                  <h2 id="venueName">
                    {venueData.name}
                  </h2>
                  {venueData.bestPhoto && (
                    <img src={`${venueData.bestPhoto.prefix}300x300${venueData.bestPhoto.suffix}`} alt={venueData.name} className = 'venue-img'/>)
                  }
                  <p>
                    {venueData.location.formattedAddress}
                  </p>
                  {venueData.url && (
                    <p><a href={venueData.url} id="website">Website</a></p>)
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
                    <span className="yellow"><img src={venueData.categories[0].icon.prefix + "45" + venueData.categories[0].icon.suffix} alt={venueData.categories[0].name}/>
                  </span>
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

FilterResults.propTypes = {
  showOnMap: PropTypes.func.isRequired,
  markers: PropTypes.array.isRequired,
  venues: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  
}