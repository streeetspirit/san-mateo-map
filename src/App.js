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
    venues: []
  }

  updateCenter = (newCenter) => {
    console.log('set center called');
    this.setState({ center: newCenter });
    console.log(this.state.center);
  }
    


  //fetch venues from foursquare and make them into markers
  componentDidMount() {
    fsAPI.search({
      near: "San Mateo, CA",
      query: "tacos",
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          clicked: false,
          show: true
        };
      });

      this.setState({ venues, markers });
    });
  }

  render() {
    return (
      <div className="App">
        <header id="home">
          <h1>Neighborhood Essentials Map</h1>
        </header>
        
        <main id="maincontent">
          {/* map rendering */}
          <section id="map-container" aria-label="Interactive Map display" role='application'>
            <Map
              venues={this.state.venues}
              markers={this.state.markers}
              center={this.state.center}
              updateCenter={this.updateCenter}/>
          </section>


          <section>
            {/* filtering panel */}
            <div className="filter-options">
              <h2>Filter Results</h2>
              <FilterPanel />
              
            </div>
            
            {/* results section */}
            <FilterResults />
          </section>
        </main>

        <footer id="footer">
          Copyright (c) 2018 <strong>Neighborhood Essentials Map</strong> All Rights Reserved.
        </footer>
      </div>
    );
  }
}

export default App;
