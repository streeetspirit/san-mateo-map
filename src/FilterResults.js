import React, { Component } from 'react';


class FilterResults extends Component {
  render() {
    if (this.props.err) {
      return (
        <div>{this.props.err}</div>
      )
    } else {
      return (
        <div>Ola!</div>
      )
    }
    
  }
}

export default FilterResults