import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import ProductListItem from './ProductListItem';

import generateId from '../helpers';

const CustomerList = ({ productsArr, onProductClick }) => (
  <Table hover responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {productsArr.map((product, i) => (
        <ProductListItem
          number={i}
          name={product.name}
          price={product.price}
          key={generateId()}
          onProductClick={onProductClick}
        />
      ))}
    </tbody>
  </Table>
);

CustomerList.propTypes = {
  productsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  onProductClick: PropTypes.func.isRequired,
};

export default CustomerList;
