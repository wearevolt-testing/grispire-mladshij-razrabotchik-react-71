import { connect } from 'react-redux';

import InvoicesPage from './InvoicesPage';
import { invoicesAllLoad, invoiceEdit, invoiceCreate, invoiceDelete } from '../actions/invoices';
import { customersAllLoad } from '../actions/customers';

const mapStateToProps = state => ({
  invoices: state.invoices.allInvoices,
  customers: state.customers.allCustomers,
});

const mapDispatchToProps = dispatch => ({
  loadAllInvoices: () => {
    dispatch(invoicesAllLoad());
  },
  loadAllCustomers: () => {
    dispatch(customersAllLoad());
  },
  editInvoice: (id, editedInvoiceInfo) => {
    dispatch(invoiceEdit(id, editedInvoiceInfo));
  },
  createInvoice: (newInvoice) => {
    dispatch(invoiceCreate(newInvoice));
  },
  deleteInvoice: (id) => {
    dispatch(invoiceDelete(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesPage);
