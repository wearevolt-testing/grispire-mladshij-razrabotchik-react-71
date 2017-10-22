import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import InvoiceListItem from './InvoiceListItem';

import generateId from '../helpers';

const InvoiceList = ({ invoicesArr, usersObj, startInvoiceDelete }) => (
  <Table hover responsive>
    <thead>
      <tr>
        <th width="5%">#</th>
        <th width="35%">Customer</th>
        <th width="25%">Discount</th>
        <th width="25%">Total</th>
        <th width="5%" />
        <th width="5%" />
      </tr>
    </thead>
    <tbody>
      {invoicesArr.map((invoice, i) => (
        <InvoiceListItem
          number={i}
          id={invoice.id}
          name={usersObj[invoice.customer_id] || 'User not found'}
          discount={invoice.discount}
          total={invoice.total}
          key={generateId()}
          startInvoiceDelete={startInvoiceDelete}
        />
      ))}
    </tbody>
  </Table>
);

InvoiceList.propTypes = {
  invoicesArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  startInvoiceDelete: PropTypes.func.isRequired,
  usersObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default InvoiceList;
