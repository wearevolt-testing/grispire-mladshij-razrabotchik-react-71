import { connect } from 'react-redux';

import ProductsPage from './ProductsPage';
import { productsAllLoad, productEdit, productCreate, productDelete } from '../actions/products';

const mapStateToProps = state => ({
  products: state.products.allProducts,
});

const mapDispatchToProps = dispatch => ({
  loadAllProducts: () => {
    dispatch(productsAllLoad());
  },
  editProduct: (id, editedProductInfo) => {
    dispatch(productEdit(id, editedProductInfo));
  },
  createProduct: (newProduct) => {
    dispatch(productCreate(newProduct));
  },
  deleteProduct: (id) => {
    dispatch(productDelete(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
