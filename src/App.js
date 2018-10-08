import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import FilterPanel from './FilterPanel';
import FilterResults from './FilterResults';
import * as fsAPI from './Foursquare';


class App extends Component {
  componentDidMount() {
    fsAPI.search({
      near: "Austin, TX",
      query: "tacos",
      limit: 10
    }).then(results => console.log(results));
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
            <Map />
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
