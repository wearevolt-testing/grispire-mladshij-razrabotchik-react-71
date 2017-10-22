export const PRODUCTS_ALL_LOAD_STARTED = 'PRODUCTS_ALL_LOAD_STARTED';
export const PRODUCTS_ALL_LOAD_SUCCESSFUL = 'PRODUCTS_ALL_LOAD_SUCCESSFUL';
export const PRODUCTS_ALL_LOAD_FAILED = 'PRODUCTS_ALL_LOAD_FAILED';

export const PRODUCT_LOAD_STARTED = 'PRODUCT_LOAD_STARTED';
export const PRODUCT_LOAD_SUCCESSFUL = 'PRODUCT_LOAD_SUCCESSFUL';
export const PRODUCT_LOAD_FAILED = 'PRODUCT_LOAD_FAILED';

export const PRODUCT_DELETE_STARTED = 'PRODUCT_DELETE_STARTED';
export const PRODUCT_DELETE_SUCCESSFUL = 'PRODUCT_DELETE_SUCCESSFU';
export const PRODUCT_DELETE_FAILED = 'PRODUCT_DELETE_FAILED';

export const PRODUCT_EDIT_STARTED = 'PRODUCT_EDIT_STARTED';
export const PRODUCT_EDIT_SUCCESSFUL = 'PRODUCT_EDIT_SUCCESSFUL';
export const PRODUCT_EDIT_FAILED = 'PRODUCT_EDIT_FAILED';

export const PRODUCT_CREATE_STARTED = 'PRODUCT_CREATE_STARTED';
export const PRODUCT_CREATE_SUCCESSFUL = 'PRODUCT_CREATE_SUCCESSFUL';
export const PRODUCT_CREATE_FAILED = 'PRODUCT_CREATE_FAILED ';

// LOAD ALL
export const productsAllLoadStarted = () => ({
  type: PRODUCTS_ALL_LOAD_STARTED,
  fetching: true,
});

export const productsAllLoadSuccessful = allProducts => ({
  type: PRODUCTS_ALL_LOAD_SUCCESSFUL,
  allProducts,
  fetching: false,
});

export const productsAllLoadFailed = () => ({
  type: PRODUCTS_ALL_LOAD_FAILED,
  fetching: false,
});

// LOAD BY ID
export const productLoadStarted = productLoadingId => ({
  type: PRODUCT_LOAD_STARTED,
  productLoadingId,
  fetching: true,
});

export const productLoadSuccessful = pickedProduct => ({
  type: PRODUCT_LOAD_SUCCESSFUL,
  userLoadingId: null,
  pickedProduct,
  fetching: false,
});

export const productLoadFailed = () => ({
  type: PRODUCT_LOAD_FAILED,
  userLoadingId: null,
  fetching: false,
});

// EDIT
export const productEditStarted = (id, editedProductInfo) => ({
  type: PRODUCT_EDIT_STARTED,
  editedProductInfo,
  fetching: true,
});

export const productEditSuccessful = (id, editedProductInfo) => ({
  type: PRODUCT_EDIT_SUCCESSFUL,
  lastEdited: id,
  editedProductInfo,
  fetching: false,
});

export const productEditFailed = editedProductInfo => ({
  type: PRODUCT_EDIT_FAILED,
  editedProductInfo,
  fetching: false,
});

// CREATE
export const productCreateStarted = newProductInfo => ({
  type: PRODUCT_CREATE_STARTED,
  newProductInfo,
  fetching: true,
});

export const productCreateSuccessful = lastCreatedProduct => ({
  type: PRODUCT_CREATE_SUCCESSFUL,
  lastCreatedProduct,
  fetching: false,
});

export const productCreateFailed = () => ({
  type: PRODUCT_CREATE_FAILED,
  fetching: false,
});

export const productDeleteStarted = () => ({
  type: PRODUCT_DELETE_STARTED,
  fetching: true,
});

export const productDeleteSuccessful = lastDeleted => ({
  type: PRODUCT_DELETE_SUCCESSFUL,
  lastDeleted,
  fetching: false,
});

export const productDeleteFailed = () => ({
  type: PRODUCT_DELETE_FAILED,
  fetching: false,
});

export const productsAllLoad = () => async (dispatch) => {
  dispatch(productsAllLoadStarted());
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    dispatch(productsAllLoadSuccessful(data));
  } catch (e) {
    dispatch(productsAllLoadFailed());
  }
};

export const productEdit = (id, editedProductInfo) => async (dispatch) => {
  dispatch(productEditStarted(editedProductInfo));
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: editedProductInfo.name,
        price: editedProductInfo.price,
      }),
    });
    const data = await response.json();
    dispatch(productEditSuccessful(id, data));
    // после успешного редактирования товара происходит перезагрузка всех товаров
    dispatch(productsAllLoad());
  } catch (e) {
    dispatch(productEditFailed(id, editedProductInfo));
  }
};

export const productCreate = newProduct => async (dispatch) => {
  dispatch(productCreateStarted(newProduct));
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: newProduct.name,
        price: newProduct.price,
      }),
    });
    const data = await response.json();
    dispatch(productCreateSuccessful(data));
    // после успешного создания товара происходит перезагрузка всех товаров
    dispatch(productsAllLoad());
  } catch (e) {
    dispatch(productCreateFailed());
  }
};

export const productDelete = id => async (dispatch) => {
  dispatch(productDeleteStarted(id));
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = await response.json();
    dispatch(productDeleteSuccessful(data));
    // после успешного удаления товара происходит перезагрузка всех товаров
    dispatch(productsAllLoad());
  } catch (e) {
    dispatch(productDeleteFailed());
  }
};
