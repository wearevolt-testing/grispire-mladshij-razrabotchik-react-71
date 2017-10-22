import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoiceCreatePage from './InvoiceCreatePage';
import { invoicesAllLoad, invoiceCreate } from '../actions/invoices';
import { productsAllLoad } from '../actions/products';
import { customersAllLoad } from '../actions/customers';

const mapStateToProps = state => ({
  customers: state.customers.allCustomers.map(customer => ({
    value: customer.id,
    label: customer.name,
  })),
  products: state.products.allProducts.map(product => ({ value: product.id, label: product.name })),
  productPrices: state.products.allProducts.reduce(
    (prev, product) => ({ ...prev, [product.id]: product.price }),
    {},
  ),
  queryInProgress: state.invoices.inProgress,
  lastCreated: state.invoices.lastCreated,
});

const mapDispatchToProps = dispatch => ({
  loadAllInvoices: () => {
    dispatch(invoicesAllLoad());
  },
  loadAllCustomers: () => {
    dispatch(customersAllLoad());
  },
  loadAllProducts: () => {
    dispatch(productsAllLoad());
  },
  createInvoice: (newInvoice) => {
    dispatch(invoiceCreate(newInvoice));
  },
  clearRedirect: () => {
    dispatch({ type: 'CLEAR_REDIRECT_IDS', lastEdited: null, lastCreated: null });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceCreatePage));
