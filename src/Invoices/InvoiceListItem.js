import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const InvoiceListItem = ({
  id, number, name, discount, total, startInvoiceDelete,
}) => (
  <tr>
    <td>{number + 1}</td>
    <td>{name}</td>
    <td>{discount}</td>
    <td>{total}</td>
    <td>
      <Link to={`/invoices/${id}/edit`}>
        <Button bsStyle="info">edit</Button>
      </Link>
    </td>
    <td>
      <Button bsStyle="danger" onClick={() => startInvoiceDelete(id)}>
        &#10006;
      </Button>
    </td>
  </tr>
);

export default InvoiceListItem;

InvoiceListItem.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  startInvoiceDelete: PropTypes.func.isRequired,
};
