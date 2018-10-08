import React, { Component } from 'react';


class FilterPanel extends Component {
  render() {

    return (
      
      <select tabindex="2" id="type-select" aria-label="Filter by type" name="types of places" onchange="updateMarkers()">
        <option value="all">Show All</option>
      </select>
    )
  }
}

export default FilterPanel