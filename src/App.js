/* global google */
import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import FilterPanel from './FilterPanel';
import FilterResults from './FilterResults';
import * as fsAPI from './Foursquare';


class App extends Component {
 state = {
        markers: [],
        venues: [],
        currCategory: "all",
        categories: [
          { id: '4bf58dd8d48988d1e0931735', name:  "Coffee Shops"},
          { id: '4bf58dd8d48988d1c9941735', name: "Ice-cream" },
          { id: '4bf58dd8d48988d16a941735', name: "Bakery" },
          { id: '4bf58dd8d48988d175941735', name: "Gyms" },
          { id: '4bf58dd8d48988d163941735', name: "Parks"}
    
        ],
        err: ""
  }
  

  //when a marker is clicked - close all others
  allMarkersOff = () => {
    this.setState({ markers: this.state.markers.map((marker) => {
      marker.show = false;
      marker.clicked = false;
      return marker;
      })
    })
  }

  //toggle marker click 
  clickMarker = (marker) => {
    if (marker.clicked) {
      marker.clicked = false;
      marker.show = false;
      this.setState({ markers: Object.assign(this.state.markers, marker) }); 
      this.filterMarkers(this.state.currCategory);
    } else {
      this.allMarkersOff();
      marker.clicked = true;
      marker.show = true;
      this.setState({ markers: Object.assign(this.state.markers, marker) });  
    }

    
  }

  // add animation to marker when venue is clicked in the filtered list
  clickFilteredResult = (marker) => {
    this.clickMarker(marker);
    marker.animation = google.maps.Animation.BOUNCE;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    setTimeout(() => {
      marker.animation = "";
      this.setState({ markers: Object.assign(this.state.markers, marker) });
    }, 1500);
  }

  // when dropdown is used to narrow result we filter markers and list items
  filterMarkers = (selectValue) => {
    this.setState({ currCategory: selectValue });
    //const currCategory = this.state.currCategory;
    if (selectValue === "all") {
      this.setState({ markers: this.state.markers.map((marker) => {
        marker.show = true;
       // marker.clicked = false;
        return marker;
        })
      })
    } else {
      this.setState({ markers: this.state.markers.map((marker) => {
        (marker.category === selectValue) ? marker.show = true : marker.show = false;
        return marker;
        })
      })
    }

  }


  //fetch marker from foursquare for each category
  fetchAllMarkers(onSuccess, onFail) {
    return new Promise((resolve, reject) => {
      let markersArr = [];
      let venuesArr = [];
      let promises = [];
      this.state.categories.forEach(category => {
        //store all my promises in an array
        promises.push(fsAPI.search({
          near: "San Mateo, CA",
          radius: 3000,
          categoryId: category.id,
          limit: 5
        }).then(results => {
          if (typeof (results) === 'undefined') {
            results = [];
          }
          let { venues } = results.response;
          if (typeof (venues) === 'undefined') {
            venues = [];
          }
          let markers = venues.map(venue => {
            return {
              id: venue.id,
              lat: venue.location.lat,
              lng: venue.location.lng,
              clicked: false,
              show: true,
              animation: "",
              category: category.name,
            };
          });
          markersArr.push.apply(markersArr, markers);
          venuesArr.push.apply(venuesArr, venues);
        })
          .catch(err => {
            this.setState({ err: "Oops, something happened to our searching robots! Try again later." });
            reject(err);
          }));
      }); 
      //get results back only when everything is fetched
      Promise.all(promises).then(() => {
        resolve([markersArr, venuesArr])
      });
    })
  }

  //fetch venue details from foursquare for each marker id
  fetchAllVenueDetails(onSuccess, onFail) {
    return new Promise((resolve, reject) => {
      let venuesArr = [];
      let promises = [];

      for (let i = 0, len = this.state.venues.length; i < len;i++) {
        promises.push(fsAPI.venueDetails(this.state.venues[i].id)
          .then(res => {
            venuesArr.push(res.response.venue);
          })
          .catch(err => {
            this.setState({ err: "Oops, something happened to our searching robots! Try again later." });
            console.log("err in venue info fetch ", err);
            reject(err);
          }));
      };
      //get results back only when everything is fetched
      Promise.all(promises).then(() => resolve(venuesArr));
    })
  } 

  //fill the state with fetched data
  //chain promisses so data don't compete with each other
  componentDidMount() {
    if (navigator.onLine) {
      this.fetchAllMarkers()
        .then(results => {
          this.setState({ markers: results[0], venues: results[1], err: (results[0].length === 0) && "Oops, something happened to our searching robots! Try again later." });
          this.fetchAllVenueDetails()
            .then(res => {
              if (!res.every(item => item === 'undefined')) {
                this.setState({ venues: res });
              }
            })
        });
    

      window.gm_authFailure = () => {
        document.getElementById('map-container').style.display = "none";
        document.getElementById('map-err').style.display = "block";
      };
    } else {
      this.setState({ err: "Sorry, you're offline" });
      document.getElementById('map-err').style.display = "block";
    }
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
            {navigator.onLine && <Map
              venues={this.state.venues}
              markers={this.state.markers}
              clickMarker={this.clickMarker}
            />}
          </section>
          {/* in case maps didn't load - show error */}
          <section id="map-err">
            <div className='err'>Sorry, we couldn't load Google Maps. Please, try again later.</div>
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
              category={this.state.currCategory}
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
