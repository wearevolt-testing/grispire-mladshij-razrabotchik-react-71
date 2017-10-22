import {
  addProductPromise,
  editProductPromise,
  deleteProductPromise,
  invoiceProductsLoad,
} from './invoiceProducts';

export const INVOICES_ALL_LOAD_STARTED = 'INVOICES_ALL_LOAD_STARTED';
export const INVOICES_ALL_LOAD_SUCCESSFUL = 'INVOICES_ALL_LOAD_SUCCESSFUL';
export const INVOICES_ALL_LOAD_FAILED = 'INVOICES_ALL_LOAD_FAILED';

export const INVOICE_LOAD_STARTED = 'INVOICE_LOAD_STARTED';
export const INVOICE_LOAD_SUCCESSFUL = 'INVOICE_LOAD_SUCCESSFUL';
export const INVOICE_LOAD_FAILED = 'INVOICE_LOAD_FAILED';

export const INVOICE_DELETE_STARTED = 'INVOICE_DELETE_STARTED';
export const INVOICE_DELETE_SUCCESSFUL = 'INVOICE_DELETE_SUCCESSFU';
export const INVOICE_DELETE_FAILED = 'INVOICE_DELETE_FAILED';

export const INVOICE_EDIT_STARTED = 'INVOICE_EDIT_STARTED';
export const INVOICE_EDIT_SUCCESSFUL = 'INVOICE_EDIT_SUCCESSFUL';
export const INVOICE_EDIT_FAILED = 'INVOICE_EDIT_FAILED';

export const INVOICE_CREATE_STARTED = 'INVOICE_CREATE_STARTED';
export const INVOICE_CREATE_SUCCESSFUL = 'INVOICE_CREATE_SUCCESSFUL';
export const INVOICE_CREATE_FAILED = 'INVOICE_CREATE_FAILED ';

export const CLEAR_REDIRECT_IDS = 'CLEAR_REDIRECT_IDS';

// LOAD ALL
export const invoicesAllLoadStarted = () => ({
  type: INVOICES_ALL_LOAD_STARTED,
  inProgress: true,
});

export const invoicesAllLoadSuccessful = allInvoices => ({
  type: INVOICES_ALL_LOAD_SUCCESSFUL,
  allInvoices,
  inProgress: false,
});

export const invoicesAllLoadFailed = () => ({
  type: INVOICES_ALL_LOAD_FAILED,
  inProgress: false,
});

// LOAD BY ID
export const invoiceLoadStarted = invoiceLoadingId => ({
  type: INVOICE_LOAD_STARTED,
  invoiceLoadingId,
  inProgress: true,
});

export const invoiceLoadSuccessful = pickedInvoice => ({
  type: INVOICE_LOAD_SUCCESSFUL,
  invoiceLoadingId: null,
  pickedInvoice,
  inProgress: false,
});

export const invoiceLoadFailed = () => ({
  type: INVOICE_LOAD_FAILED,
  invoiceLoadingId: null,
  inProgress: false,
});

// EDIT
export const invoiceEditStarted = (id, editedInvoiceInfo) => ({
  type: INVOICE_EDIT_STARTED,
  editedInvoiceInfo,
  inProgress: true,
});

export const invoiceEditSuccessful = (id, editedInvoiceInfo) => ({
  type: INVOICE_EDIT_SUCCESSFUL,
  lastEdited: id,
  editedInvoiceInfo,
  inProgress: false,
});

export const invoiceEditFailed = editedInvoiceInfo => ({
  type: INVOICE_EDIT_FAILED,
  editedInvoiceInfo,
  inProgress: false,
});

// CREATE
export const invoiceCreateStarted = () => ({
  type: INVOICE_CREATE_STARTED,
  lastCreated: null,
  inProgress: true,
});

export const invoiceCreateSuccessful = lastCreated => ({
  type: INVOICE_CREATE_SUCCESSFUL,
  lastCreated,
  inProgress: false,
});

export const invoiceCreateFailed = () => ({
  type: INVOICE_CREATE_FAILED,
  lastCreated: null,
  inProgress: false,
});

export const invoiceDeleteStarted = () => ({
  type: INVOICE_DELETE_STARTED,
  inProgress: true,
});

export const invoiceDeleteSuccessful = lastDeleted => ({
  type: INVOICE_DELETE_SUCCESSFUL,
  lastDeleted,
  inProgress: false,
});

export const invoiceDeleteFailed = () => ({
  type: INVOICE_DELETE_FAILED,
  inProgress: false,
});

export const invoiceLoad = id => async (dispatch) => {
  dispatch(invoiceLoadStarted(id));
  try {
    const response = await fetch(`/api/invoices/${id}`);
    const data = await response.json();
    dispatch(invoiceLoadSuccessful(data));
  } catch (e) {
    dispatch(invoiceLoadFailed());
  }
};

export const invoicesAllLoad = () => async (dispatch) => {
  dispatch(invoicesAllLoadStarted());
  try {
    const response = await fetch('/api/invoices');
    const data = await response.json();
    dispatch(invoicesAllLoadSuccessful(data));
  } catch (e) {
    dispatch(invoicesAllLoadFailed());
  }
};

export const invoiceCreate = newInvoice => async (dispatch) => {
  dispatch(invoiceCreateStarted());
  try {
    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: newInvoice.customer_id,
        discount: newInvoice.discount,
        total: newInvoice.total,
      }),
    });
    const createdInvoice = await response.json();
    // после создания "тела" инвойса в него добавляются продукты
    newInvoice.chosenProducts.forEach(product => addProductPromise(createdInvoice.id, product));
    // после успешного создания инвойса происходит перезагрузка всех инвойсов
    dispatch(invoiceCreateSuccessful(createdInvoice));
    dispatch(invoicesAllLoad());
  } catch (e) {
    console.log(e);
    dispatch(invoiceCreateFailed());
  }
};

export const invoiceEdit = invoice => async (dispatch) => {
  dispatch(invoiceEditStarted(invoice));
  try {
    const response = await fetch(`/api/invoices/${invoice.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: invoice.customer_id,
        discount: invoice.discount,
        total: invoice.total,
      }),
    });
    const data = await response.json();
    await Promise.all(invoice.productsToAdd.map(product => addProductPromise(invoice.id, product)));
    await Promise.all(invoice.productsToChange.map(product => editProductPromise(invoice.id, product)));
    await Promise.all(invoice.productsToDelete.map(product => deleteProductPromise(invoice.id, product)));
    // после успешного редактирования инвойса происходит перезагрузка всех инвойсов
    dispatch(invoicesAllLoad());
    // выбранного инвойса
    dispatch(invoiceLoad(invoice.id));
    // списка продуктов для инвойса
    dispatch(invoiceProductsLoad(invoice.id));
    // сообщение об успешном редактировании инвойса
    dispatch(invoiceEditSuccessful(invoice.id, data));
  } catch (e) {
    console.log(e);
    dispatch(invoiceEditFailed(invoice.id, invoice));
  }
};

export const invoiceDelete = id => async (dispatch) => {
  dispatch(invoiceDeleteStarted(id));
  try {
    const response = await fetch(`/api/invoices/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = await response.json();
    dispatch(invoiceDeleteSuccessful(data));
    // после успешного удаления инвойса происходит перезагрузка всех инвойсов
    dispatch(invoicesAllLoad());
  } catch (e) {
    dispatch(invoiceDeleteFailed());
  }
};
