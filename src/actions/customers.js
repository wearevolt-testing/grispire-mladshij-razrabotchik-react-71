export const CUSTOMERS_ALL_LOAD_STARTED = 'CUSTOMERS_ALL_LOAD_STARTED';
export const CUSTOMERS_ALL_LOAD_SUCCESSFUL = 'CUSTOMERS_ALL_LOAD_SUCCESSFUL';
export const CUSTOMERS_ALL_LOAD_FAILED = 'CUSTOMERS_ALL_LOAD_FAILED';

export const CUSTOMER_LOAD_STARTED = 'CUSTOMER_LOAD_STARTED';
export const CUSTOMER_LOAD_SUCCESSFUL = 'CUSTOMER_LOAD_SUCCESSFUL';
export const CUSTOMER_LOAD_FAILED = 'CUSTOMER_LOAD_FAILED';

export const CUSTOMER_DELETE_STARTED = 'CUSTOMER_DELETE_STARTED';
export const CUSTOMER_DELETE_SUCCESSFUL = 'CUSTOMER_DELETE_SUCCESSFU';
export const CUSTOMER_DELETE_FAILED = 'CUSTOMER_DELETE_FAILED';

export const CUSTOMER_EDIT_STARTED = 'CUSTOMER_EDIT_STARTED';
export const CUSTOMER_EDIT_SUCCESSFUL = 'CUSTOMER_EDIT_SUCCESSFUL';
export const CUSTOMER_EDIT_FAILED = 'CUSTOMER_EDIT_FAILED';

export const CUSTOMER_CREATE_STARTED = 'CUSTOMER_CREATE_STARTED';
export const CUSTOMER_CREATE_SUCCESSFUL = 'CUSTOMER_CREATE_SUCCESSFUL';
export const CUSTOMER_CREATE_FAILED = 'CUSTOMER_CREATE_FAILED ';

// LOAD ALL
export const customersAllLoadStarted = () => ({
  type: CUSTOMERS_ALL_LOAD_STARTED,
  fetching: true,
});

export const customersAllLoadSuccessful = allCustomers => ({
  type: CUSTOMERS_ALL_LOAD_SUCCESSFUL,
  allCustomers,
  fetching: false,
});

export const customersAllLoadFailed = () => ({
  type: CUSTOMERS_ALL_LOAD_FAILED,
  fetching: false,
});

// LOAD BY ID
export const customerLoadStarted = customerLoadingId => ({
  type: CUSTOMER_LOAD_STARTED,
  customerLoadingId,
  fetching: true,
});

export const customerLoadSuccessful = pickedCustomer => ({
  type: CUSTOMER_LOAD_SUCCESSFUL,
  userLoadingId: null,
  pickedCustomer,
  fetching: false,
});

export const customerLoadFailed = () => ({
  type: CUSTOMER_LOAD_FAILED,
  userLoadingId: null,
  fetching: false,
});

// EDIT
export const customerEditStarted = (id, editedCustomerInfo) => ({
  type: CUSTOMER_EDIT_STARTED,
  editedCustomerInfo,
  fetching: true,
});

export const customerEditSuccessful = (id, editedCustomerInfo) => ({
  type: CUSTOMER_EDIT_SUCCESSFUL,
  lastEdited: id,
  editedCustomerInfo,
  fetching: false,
});

export const customerEditFailed = editedCustomerInfo => ({
  type: CUSTOMER_EDIT_FAILED,
  editedCustomerInfo,
  fetching: false,
});

// CREATE
export const customerCreateStarted = newCustomerInfo => ({
  type: CUSTOMER_CREATE_STARTED,
  newCustomerInfo,
  fetching: true,
});

export const customerCreateSuccessful = lastCreatedCustomer => ({
  type: CUSTOMER_CREATE_SUCCESSFUL,
  lastCreatedCustomer,
  fetching: false,
});

export const customerCreateFailed = () => ({
  type: CUSTOMER_CREATE_FAILED,
  fetching: false,
});

export const customerDeleteStarted = () => ({
  type: CUSTOMER_DELETE_STARTED,
  fetching: true,
});

export const customerDeleteSuccessful = lastDeleted => ({
  type: CUSTOMER_DELETE_SUCCESSFUL,
  lastDeleted,
  fetching: false,
});

export const customerDeleteFailed = () => ({
  type: CUSTOMER_DELETE_FAILED,
  fetching: false,
});

export const customersAllLoad = () => async (dispatch) => {
  dispatch(customersAllLoadStarted());
  try {
    const response = await fetch('/api/customers');
    const data = await response.json();
    dispatch(customersAllLoadSuccessful(data));
  } catch (e) {
    dispatch(customersAllLoadFailed());
  }
};

export const customerEdit = (id, editedCustomerInfo) => async (dispatch) => {
  dispatch(customerEditStarted(editedCustomerInfo));
  try {
    const response = await fetch(`/api/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: editedCustomerInfo.name,
        address: editedCustomerInfo.address,
        phone: editedCustomerInfo.phone,
      }),
    });
    const data = await response.json();
    dispatch(customerEditSuccessful(id, data));
    // после успешного редактирования юзера происходит перезагрузка всех пользователей
    dispatch(customersAllLoad());
  } catch (e) {
    dispatch(customerEditFailed(id, editedCustomerInfo));
  }
};

export const customerCreate = newCustomer => async (dispatch) => {
  dispatch(customerCreateStarted(newCustomer));
  try {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: newCustomer.name,
        address: newCustomer.address,
        phone: newCustomer.phone,
      }),
    });
    const data = await response.json();
    dispatch(customerCreateSuccessful(data));
    // после успешного создания юзера происходит перезагрузка всех пользователей
    dispatch(customersAllLoad());
  } catch (e) {
    dispatch(customerCreateFailed());
  }
};

export const customerDelete = id => async (dispatch) => {
  dispatch(customerDeleteStarted(id));
  try {
    const response = await fetch(`/api/customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = await response.json();
    dispatch(customerDeleteSuccessful(data));
    // после успешного удаления юзера происходит перезагрузка всех пользователей
    dispatch(customersAllLoad());
  } catch (e) {
    dispatch(customerDeleteFailed());
  }
};
