import {
  CUSTOMERS_ALL_LOAD_STARTED,
  CUSTOMERS_ALL_LOAD_FAILED,
  CUSTOMERS_ALL_LOAD_SUCCESSFUL,
  CUSTOMER_LOAD_STARTED,
  CUSTOMER_LOAD_SUCCESSFUL,
  CUSTOMER_LOAD_FAILED,
  CUSTOMER_EDIT_STARTED,
  CUSTOMER_EDIT_FAILED,
  CUSTOMER_EDIT_SUCCESSFUL,
  CUSTOMER_CREATE_STARTED,
  CUSTOMER_CREATE_SUCCESSFUL,
  CUSTOMER_CREATE_FAILED,
  CUSTOMER_DELETE_STARTED,
  CUSTOMER_DELETE_SUCCESSFUL,
  CUSTOMER_DELETE_FAILED,
} from '../actions/customers';

const initialState = {
  allCustomers: [],
};

export const customers = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMERS_ALL_LOAD_STARTED:
    case CUSTOMERS_ALL_LOAD_FAILED:
      return { ...state, fetching: action.fetching };
    case CUSTOMERS_ALL_LOAD_SUCCESSFUL:
      return { ...state, allCustomers: action.allCustomers, fetching: action.fetching };
    case CUSTOMER_LOAD_STARTED:
      return { ...state, fetching: action.fetching, customerLoadingId: action.customerLoadingId };
    case CUSTOMER_LOAD_SUCCESSFUL:
      return {
        ...state,
        fetching: action.fetching,
        customerLoadingId: action.customerLoadingId,
        pickedCustomer: action.pickedCustomer,
      };
    case CUSTOMER_LOAD_FAILED:
      return { ...state, fetching: action.fetching, customerLoadingId: action.customerLoadingId };
    case CUSTOMER_EDIT_STARTED:
    case CUSTOMER_EDIT_FAILED:
      return { ...state, fetching: action.fetching, editedCustomerInfo: action.editedCustomerInfo };
    case CUSTOMER_EDIT_SUCCESSFUL:
      return {
        ...state,
        fetching: action.fetching,
        editedCustomerInfo: action.editedCustomerInfo,
        lastEdited: action.lastEdited,
      };
    case CUSTOMER_CREATE_STARTED:
      return { ...state, fetching: action.fetching, newCustomerInfo: action.newCustomerInfo };
    case CUSTOMER_CREATE_SUCCESSFUL:
      return {
        ...state,
        fetching: action.fetching,
        lastCreatedCustomer: action.lastCreatedCustomer,
      };
    case CUSTOMER_CREATE_FAILED:
      return { ...state, fetching: action.fetching };
    case CUSTOMER_DELETE_STARTED:
      return { ...state, fetching: action.fetching };
    case CUSTOMER_DELETE_SUCCESSFUL:
      return { ...state, fetching: action.fetching, lastDeleted: action.lastDeleted };
    case CUSTOMER_DELETE_FAILED:
      return { ...state, fetching: action.fetching };

    default:
      return state;
  }
};

export default customers;
