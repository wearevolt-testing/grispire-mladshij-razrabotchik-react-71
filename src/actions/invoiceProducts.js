export const INVOICE_PRODUCTS_LOAD_STARTED = 'INVOICE_PRODUCTS_LOAD_STARTED';
export const INVOICE_PRODUCTS_LOAD_SUCCESSFUL = 'INVOICE_PRODUCTS_LOAD_SUCCESSFUL';
export const INVOICE_PRODUCTS_LOAD_FAILED = 'INVOICE_PRODUCTS_LOAD_FAILED';

export const invoiceProductsLoadStarted = () => ({
  type: INVOICE_PRODUCTS_LOAD_STARTED,
  inProgress: true,
});

export const invoiceProductsLoadSuccessful = invoiceProducts => ({
  type: INVOICE_PRODUCTS_LOAD_SUCCESSFUL,
  invoiceProducts,
  inProgress: false,
});

export const invoiceProductsLoadFailed = () => ({
  type: INVOICE_PRODUCTS_LOAD_FAILED,
  inProgress: false,
});

export const invoiceProductsLoad = id => async (dispatch) => {
  dispatch(invoiceProductsLoadStarted());
  try {
    const response = await fetch(`/api/invoices/${id}/items`);
    const data = await response.json();
    dispatch(invoiceProductsLoadSuccessful(data));
  } catch (e) {
    dispatch(invoiceProductsLoadFailed());
  }
};

export const addProductPromise = (invoiceId, product) =>
  fetch(`/api/invoices/${invoiceId}/items`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      invoice_id: +invoiceId,
      product_id: product.id,
      quantity: product.qty,
    }),
  });

export const editProductPromise = (invoiceId, product) =>
  fetch(`/api/invoices/${invoiceId}/items/${+Object.keys(product)[0]}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      id: +Object.keys(product)[0],
      invoice_id: +invoiceId,
      quantity: +product[Object.keys(product)[0]],
    }),
  });

export const deleteProductPromise = (invoiceId, productId) =>
  fetch(`/api/invoices/${invoiceId}/items/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });
