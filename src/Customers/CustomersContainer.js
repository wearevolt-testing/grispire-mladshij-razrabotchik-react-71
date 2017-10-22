import { connect } from 'react-redux';

import CustomersPage from './CustomersPage';
import {
  customersAllLoad,
  customerEdit,
  customerCreate,
  customerDelete,
} from '../actions/customers';

const mapStateToProps = state => ({
  customers: state.customers.allCustomers,
});

const mapDispatchToProps = dispatch => ({
  loadAllCustomers: () => {
    dispatch(customersAllLoad());
  },
  editCustomer: (id, editedCustomerInfo) => {
    dispatch(customerEdit(id, editedCustomerInfo));
  },
  createCustomer: (newCustomer) => {
    dispatch(customerCreate(newCustomer));
  },
  deleteCustomer: (id) => {
    dispatch(customerDelete(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPage);
