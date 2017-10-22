import React from 'react';
import PropTypes from 'prop-types';

import { Table, Button } from 'react-bootstrap';

export const InvoiceProductsList = ({
  chosenProducts,
  preventChars,
  qtyHandler,
  unpickProduct,
  coefficient,
}) => (
  <Table hover responsive>
    <thead>
      <tr>
        <th width="40%">Name</th>
        <th width="25%">Price</th>
        <th width="25%">Qty</th>
        <th width="10%" />
      </tr>
    </thead>
    <tbody>
      {chosenProducts.map((product, i) => (
        <tr key={`_${product.id}_${i.toString()}`}>
          <td>{product.name ? product.name : 'Product not found'}</td>
          <td>{(product.price * product.qty * coefficient).toFixed(2)}</td>
          <td>
            <input
              value={product.qty}
              onKeyDown={e => preventChars(e)}
              onChange={e => qtyHandler(e, i)}
            />
          </td>
          <td>
            <Button
              bsStyle="danger"
              style={{ padding: '3px 6px' }}
              onClick={() => unpickProduct(i)}
            >
              &#10006;
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

InvoiceProductsList.propTypes = {
  chosenProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  coefficient: PropTypes.number.isRequired,
  preventChars: PropTypes.func.isRequired,
  qtyHandler: PropTypes.func.isRequired,
  unpickProduct: PropTypes.func.isRequired,
};

export default InvoiceProductsList;
