import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import FilterPanel from './FilterPanel';
import FilterResults from './FilterResults';
import * as fsAPI from './Foursquare';


class App extends Component {

  state = {
    center: { lat: 37.556, lng: -122.325 },
    markers: [],
    venues: [],
    err: ""
  }

  //when a marker is clicked - close all others
  allMarkersOff = () => {
    this.setState({ markers: this.state.markers.map((marker) => {
      marker.clicked = false;
      return marker;
      })
    })
  }

  //toggle marker click 
  clickMarker = (marker) => {
    if (marker.clicked) {
      this.allMarkersOff();
    }
    else {
      this.allMarkersOff();
      marker.clicked = true;
      this.setState({ markers: Object.assign(this.state.markers, marker) });
    }
    
  }
  /*
  updateCenter = (newCenter) => {
    console.log(this.state.center);
    console.log('-> set center called');
    this.setState({ center: newCenter });
    console.log(this.state.center);
  }
   */ 


  //fetch venues from foursquare and make them into markers
  componentDidMount() {
    fsAPI.search({
      near: "San Mateo, CA",
      radius: 3000,
      query: "tacos",
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const markers = venues.map(venue => {
        return {
          id: venue.id,
          lat: venue.location.lat,
          lng: venue.location.lng,
          clicked: false,
          show: true
        };
      });

      venues.forEach((venue) => {
        console.log('fetching details for ', venue.id);
        fsAPI.venueDetails(venue.id)
          .then(res => { 
            venue = res.response.venue;
          });
      })
      this.setState({ venues, markers });
    })
      .catch(err => {
        this.setState({err: "Oops, something happened to our searching robots! Try again later."})
      });
  }

  render() {
    return (
      <div className="App">
        <header id="home">
          <h1>San Mateo Essentials Map</h1>
        </header>
        
        <main id="maincontent">
          {/* map rendering */}
          <section id="map-container" aria-label="Interactive Map display" role='application'>
            <Map
              venues={this.state.venues}
              markers={this.state.markers}
              center={this.state.center}
              clickMarker={this.clickMarker}/>
          </section>


          <section>
            {/* filtering panel */}
            <div className="filter-options">
              <h2>Filter Results</h2>
              <FilterPanel />
              
            </div>
            
            {/* results section */}

            <FilterResults err={this.state.err}/>
          </section>
        </main>

        <footer id="footer">
          Copyright (c) 2018 <strong>San Mateo Essentials Map</strong> All Rights Reserved.
        </footer>
      </div>
    );
  }
}

export default App;
