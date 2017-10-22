import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InvoiceEditPage from './InvoiceEditPage';
import { invoiceLoad, invoiceEdit } from '../actions/invoices';
import { productsAllLoad } from '../actions/products';
import { customersAllLoad } from '../actions/customers';
import { invoiceProductsLoad } from '../actions/invoiceProducts';

const mapStateToProps = state => ({
  pickedInvoice: state.invoices.pickedInvoice,
  customers: state.customers.allCustomers.map(customer => ({
    value: customer.id,
    label: customer.name,
  })),
  selectorProducts: state.products.allProducts.map(product => ({
    value: product.id,
    label: product.name,
  })),
  productPrices: state.products.allProducts.reduce(
    (prev, product) => ({ ...prev, [product.id]: product.price }),
    {},
  ),
  productNames: state.products.allProducts.reduce(
    (prev, product) => ({ ...prev, [product.id]: product.name }),
    {},
  ),
  invoiceProducts: state.invoices.invoiceProducts,
  lastEdited: state.invoices.lastEdited,
  queryInProgress: state.invoices.inProgress,
});

const mapDispatchToProps = dispatch => ({
  loadInvoice: (id) => {
    dispatch(invoiceLoad(id));
  },
  loadAllCustomers: () => {
    dispatch(customersAllLoad());
  },
  loadAllProducts: () => {
    dispatch(productsAllLoad());
  },
  loadProductsFor: (id) => {
    dispatch(invoiceProductsLoad(id));
  },
  editInvoice: (invoice) => {
    dispatch(invoiceEdit(invoice));
  },
  clearRedirect: () => {
    dispatch({ type: 'CLEAR_REDIRECT_IDS', lastEdited: null, lastCreated: null });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceEditPage));
