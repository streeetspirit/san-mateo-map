import React, { Component } from 'react';


class FilterPanel extends Component {
  // state = {
  //   markerTypes: [
  //     { tag: 'groceries', fullName: 'Groceries', key: '4bf58dd8d48988d118951735' },
  //     { tag: 'groceries', fullName: '', key: '' },
  //     { tag: 'groceries', fullName: 'Groceries', key: '' },
  //     { tag: 'groceries', fullName: 'Groceries', key: '' },
  //     { tag: 'groceries', fullName: 'Groceries', key: '' },
  //     { tag: 'groceries', fullName: 'Groceries', key: '' }
  //   ]
  // }
  updateMarkers = () => {
  }

  // componentDidMount() {
  //   const select = document.getElementById('type-select');
    
  //     this.state.markerTypes.forEach(type => {
  //       const option = document.createElement('option');
  //       option.innerHTML = type;
  //       option.value = type;
  //       select.append(option);
  //     });
  // }
  
  render() {

    return (
      
      <select tabIndex="2" id="type-select" aria-label="Filter by type" name="types of places" onChange={ (event) => this.updateMarkers(event.target.value)}>
        <option value="all">Show All</option>
      </select>
    )
  }
}

export default FilterPanel