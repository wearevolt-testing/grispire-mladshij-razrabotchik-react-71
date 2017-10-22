import {
  PRODUCTS_ALL_LOAD_STARTED,
  PRODUCTS_ALL_LOAD_FAILED,
  PRODUCTS_ALL_LOAD_SUCCESSFUL,
  PRODUCT_LOAD_STARTED,
  PRODUCT_LOAD_SUCCESSFUL,
  PRODUCT_LOAD_FAILED,
  PRODUCT_EDIT_STARTED,
  PRODUCT_EDIT_FAILED,
  PRODUCT_EDIT_SUCCESSFUL,
  PRODUCT_CREATE_STARTED,
  PRODUCT_CREATE_SUCCESSFUL,
  PRODUCT_CREATE_FAILED,
  PRODUCT_DELETE_STARTED,
  PRODUCT_DELETE_SUCCESSFUL,
  PRODUCT_DELETE_FAILED,
} from '../actions/products';

const initialState = {
  allProducts: [],
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_ALL_LOAD_STARTED:
    case PRODUCTS_ALL_LOAD_FAILED:
      return { ...state, fetching: action.fetching };
    case PRODUCTS_ALL_LOAD_SUCCESSFUL:
      return { ...state, allProducts: action.allProducts, fetching: action.fetching };
    case PRODUCT_LOAD_STARTED:
      return { ...state, fetching: action.fetching, productLoadingId: action.productLoadingId };
    case PRODUCT_LOAD_SUCCESSFUL:
      return {
        ...state,
        fetching: action.fetching,
        productLoadingId: action.productLoadingId,
        pickedProduct: action.pickedProduct,
      };
    case PRODUCT_LOAD_FAILED:
      return { ...state, fetching: action.fetching, productLoadingId: action.productLoadingId };
    case PRODUCT_EDIT_STARTED:
    case PRODUCT_EDIT_FAILED:
      return { ...state, fetching: action.fetching, editedProductInfo: action.editedProductInfo };
    case PRODUCT_EDIT_SUCCESSFUL:
      return {
        ...state,
        fetching: action.fetching,
        editedProductInfo: action.editedProductInfo,
        lastEdited: action.lastEdited,
      };
    case PRODUCT_CREATE_STARTED:
      return { ...state, fetching: action.fetching, newProductInfo: action.newProductInfo };
    case PRODUCT_CREATE_SUCCESSFUL:
      return {
        ...state,
        fetching: action.fetching,
        lastCreatedProduct: action.lastCreatedProduct,
      };
    case PRODUCT_CREATE_FAILED:
      return { ...state, fetching: action.fetching };
    case PRODUCT_DELETE_STARTED:
      return { ...state, fetching: action.fetching };
    case PRODUCT_DELETE_SUCCESSFUL:
      return { ...state, fetching: action.fetching, lastDeleted: action.lastDeleted };
    case PRODUCT_DELETE_FAILED:
      return { ...state, fetching: action.fetching };
    default:
      return state;
  }
};

export default products;
