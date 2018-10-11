/* global google */
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
    currCategory: "all",
    categories: ["Coffee", "Ice-cream"],
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

  clickFilteredResult = (marker) => {
    this.clickMarker(marker);
    marker.animation = google.maps.Animation.BOUNCE;
    
    this.setState({ markers: Object.assign(this.state.markers, marker) });

    setTimeout(() => {
      marker.animation = "";
      this.setState({ markers: Object.assign(this.state.markers, marker) });
    }, 1500);
  }

  filterMarkers = (selectValue) => {
    this.setState({ category: selectValue });

  }

  //fetch venues from foursquare and make them into markers
  componentDidMount() {
    let markersArr = [], venuesArr = [];
    this.state.categories.forEach(category => {
      fsAPI.search({
        near: "San Mateo, CA",
        radius: 3000,
        query: category,
        limit: 2
      }).then(results => {  
        const { venues } = results.response;
        let markers = venues.map(venue => {
          return {
            id: venue.id,
            lat: venue.location.lat,
            lng: venue.location.lng,
            clicked: false,
            show: true,
            animation: "",
            category: category,
          };
        });
        markersArr.push.apply(markersArr, markers);

        //get details about venues in this category
        venues.forEach((venue) => {
          fsAPI.venueDetails(venue.id)
            .then(res => { 
              venuesArr.push(res.response.venue);
            })
            .catch(err => {
              this.setState({err: "Oops, something happened to our searching robots! Try again later."});
              console.log("err in venue info fetch", err);
            });
        })
        })
        .catch(err => {
          this.setState({ err: "Oops, something happened to our searching robots! Try again later." });
          console.log("err in markers fetch", err);
        });
    }) 
    console.log('venue added ', venuesArr);
    this.setState({venues: venuesArr,  markers: markersArr });
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
              <FilterPanel
                filterMarkers={this.filterMarkers}
                categories={this.state.categories}/>
              
            </div>
            
            {/* results section */}

            <FilterResults
              err={this.state.err}
              venues={this.state.venues}
              markers={this.state.markers}
              showOnMap={this.clickFilteredResult}
              
              />
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
