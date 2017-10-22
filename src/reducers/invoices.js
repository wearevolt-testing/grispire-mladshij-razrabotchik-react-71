import {
  INVOICES_ALL_LOAD_STARTED,
  INVOICES_ALL_LOAD_FAILED,
  INVOICES_ALL_LOAD_SUCCESSFUL,
  INVOICE_LOAD_STARTED,
  INVOICE_LOAD_SUCCESSFUL,
  INVOICE_LOAD_FAILED,
  INVOICE_EDIT_STARTED,
  INVOICE_EDIT_FAILED,
  INVOICE_EDIT_SUCCESSFUL,
  INVOICE_CREATE_STARTED,
  INVOICE_CREATE_SUCCESSFUL,
  INVOICE_CREATE_FAILED,
  INVOICE_DELETE_STARTED,
  INVOICE_DELETE_SUCCESSFUL,
  INVOICE_DELETE_FAILED,
} from '../actions/invoices';

import {
  INVOICE_PRODUCTS_LOAD_STARTED,
  INVOICE_PRODUCTS_LOAD_SUCCESSFUL,
  INVOICE_PRODUCTS_LOAD_FAILED,
} from '../actions/invoiceProducts';

const initialState = {
  allInvoices: [],
  inProgress: false,
  invoiceProducts: [],
  lastEdited: null,
  lastCreated: null,
};

export const invoices = (state = initialState, payload) => {
  switch (payload.type) {
    case INVOICES_ALL_LOAD_STARTED:
    case INVOICES_ALL_LOAD_FAILED:
      return { ...state, inProgress: payload.inProgress };
    case INVOICES_ALL_LOAD_SUCCESSFUL:
      return { ...state, allInvoices: payload.allInvoices, inProgress: payload.inProgress };
    case INVOICE_LOAD_STARTED:
      return {
        ...state,
        pickedInvoice: null,
        inProgress: payload.inProgress,
        invoiceLoadingId: payload.invoiceLoadingId,
      };
    case INVOICE_LOAD_SUCCESSFUL:
      return {
        ...state,
        inProgress: payload.inProgress,
        invoiceLoadingId: payload.invoiceLoadingId,
        pickedInvoice: payload.pickedInvoice,
      };
    case INVOICE_LOAD_FAILED:
      return {
        ...state,
        pickedInvoie: null,
        inProgress: payload.inProgress,
        invoiceLoadingId: payload.invoiceLoadingId,
      };
    case INVOICE_EDIT_STARTED:
    case INVOICE_EDIT_FAILED:
      return {
        ...state,
        inProgress: payload.inProgress,
        editedInvoiceInfo: payload.editedInvoiceInfo,
      };
    case INVOICE_EDIT_SUCCESSFUL:
      return {
        ...state,
        inProgress: payload.inProgress,
        editedInvoiceInfo: payload.editedInvoiceInfo,
        lastEdited: payload.lastEdited,
      };
    case INVOICE_CREATE_STARTED:
      return { ...state, inProgress: payload.inProgress };
    case INVOICE_CREATE_SUCCESSFUL:
      return {
        ...state,
        inProgress: payload.inProgress,
        lastCreated: payload.lastCreated,
      };
    case INVOICE_CREATE_FAILED:
      return { ...state, inProgress: payload.inProgress };
    case INVOICE_DELETE_STARTED:
      return { ...state, inProgress: payload.inProgress };
    case INVOICE_DELETE_SUCCESSFUL:
      return { ...state, inProgress: payload.inProgress, lastDeleted: payload.lastDeleted };
    case INVOICE_DELETE_FAILED:
      return { ...state, inProgress: payload.inProgress };
    case INVOICE_PRODUCTS_LOAD_STARTED:
      return {
        ...state,
        inProgress: payload.inProgress,
        productsLoadingFor: payload.invoiceLoadingId,
      };
    case INVOICE_PRODUCTS_LOAD_SUCCESSFUL:
      return {
        ...state,
        inProgress: payload.inProgress,
        invoiceProducts: payload.invoiceProducts,
      };
    case INVOICE_PRODUCTS_LOAD_FAILED:
      return {
        ...state,
        inProgress: payload.inProgress,
      };
    case 'CLEAR_REDIRECT_IDS':
      return {
        ...state,
        lastEdited: payload.lastEdited,
        lastCreated: payload.lastCreated,
      };
    default:
      return state;
  }
};

export default invoices;
