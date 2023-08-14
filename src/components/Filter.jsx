import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { filter, onChange } = this.props;

    return (
      <label>
        Filter by name:
        <input type="text" value={filter} onChange={onChange} />
      </label>
    );
  }
}
export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
