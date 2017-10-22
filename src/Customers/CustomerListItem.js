import React from 'react';
import PropTypes from 'prop-types';

const CustomerListItem = ({
  number, name, address, phone, onCustomerClick,
}) => (
  <tr onClick={() => onCustomerClick(number)}>
    <td>{number + 1}</td>
    <td>{name}</td>
    <td>{address}</td>
    <td>{phone}</td>
  </tr>
);

export default CustomerListItem;

CustomerListItem.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onCustomerClick: PropTypes.func.isRequired,
};
