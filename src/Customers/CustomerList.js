import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import CustomerListItem from './CustomerListItem';

import generateId from '../helpers';

const CustomerList = ({ customersArr, onCustomerClick }) => (
  <Table hover responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Addres</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      {customersArr.map((customer, i) => (
        <CustomerListItem
          number={i}
          name={customer.name}
          address={customer.address}
          phone={customer.phone}
          key={generateId()}
          onCustomerClick={onCustomerClick}
        />
      ))}
    </tbody>
  </Table>
);

CustomerList.propTypes = {
  customersArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCustomerClick: PropTypes.func.isRequired,
};

export default CustomerList;
