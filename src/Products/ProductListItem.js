import React from 'react';
import PropTypes from 'prop-types';

const CustomerListItem = ({
  number, name, price, onProductClick,
}) => (
  <tr onClick={() => onProductClick(number)}>
    <td>{number + 1}</td>
    <td>{name}</td>
    <td>{price}</td>
  </tr>
);

export default CustomerListItem;

CustomerListItem.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onProductClick: PropTypes.func.isRequired,
};
