import React, { Component } from 'react';


class FilterPanel extends Component {

  updateMarkers = () => {
  }
  
  render() {
    
    return (
      
      <select tabIndex="2" id="type-select" aria-label="Filter by type" name="types of places" onChange={ (event) => this.updateMarkers(event.target.value)}>
        <option value="tacos">Show All</option>
      </select>
    )
  }
}

export default FilterPanel