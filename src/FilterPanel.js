import React from 'react';

// export const categories = ["Ice-cream", "Libraries", "Bakery", "Coffee Shop", "Gym", "Parks"];


const FilterPanel = (props) => (
  
    <select tabIndex="2" id="type-select" aria-label="Filter by type" name="types of places" onChange={(event) => props.filterMarkers(event.target.value)}>
      <option value="all">Show All</option>
      {props.categories.map((category, id) => (
        <option value={category} key={id}>{category}</option>
      ))
      }
    </select>

)

export default FilterPanel