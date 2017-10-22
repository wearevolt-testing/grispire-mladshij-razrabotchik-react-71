import React from 'react';

import PropTypes from 'prop-types';
import { Grid, Row, Button } from 'react-bootstrap';

import ProductsList from './ProductsList';
import ModalProduct from './ModalProduct';
import ModalConfirm from '../Common/ModalConfirm';
import CreateProduct from './CreateProduct';

export default class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProduct: false,
      showCreate: false,
      showDelete: false,
    };
  }
  componentWillMount = () => {
    this.props.loadAllProducts();
  };
  componentDidMount = () => {
    document.title = 'Products';
  };
  onProductClick = (number) => {
    this.setState({ activeProduct: this.props.products[number], showProduct: true });
  };
  editProduct = (editedProductInfo) => {
    this.setState({ showProduct: false });
    this.props.editProduct(this.state.activeProduct.id, editedProductInfo);
  };
  deleteProduct = () => {
    this.props.deleteProduct(this.state.activeProduct.id);
    this.setState({ showDelete: false });
  };
  createProduct = (newProduct) => {
    this.props.createProduct(newProduct);
    this.setState({ showCreate: false });
  };
  toggleDeleteConfirm = () => {
    this.setState({ showProduct: !this.state.showProduct, showDelete: !this.state.showDelete });
  };
  render = () => (
    <div>
      <Grid>
        <Row>
          <h1>
            Products list{' '}
            <Button
              onClick={() => {
                this.setState({ showCreate: true });
              }}
              bsStyle="primary"
            >
              Create
            </Button>
          </h1>
        </Row>
        <Row>
          <ProductsList productsArr={this.props.products} onProductClick={this.onProductClick} />
          {this.state.showProduct ? (
            <ModalProduct
              show={this.state.showProduct}
              onHide={() => this.setState({ showProduct: false })}
              activeProduct={this.state.activeProduct}
              onEditProduct={this.editProduct}
              onDeleteClick={this.toggleDeleteConfirm}
            />
          ) : null}
          {this.state.showDelete ? (
            <ModalConfirm
              show={this.state.showDelete}
              header={`Delete product ${this.state.activeProduct.name}?`}
              text={`Are you sure you want to delete product "${this.state.activeProduct
                .name}? This action cannot be undone.`}
              onHide={this.toggleDeleteConfirm}
              onConfirm={this.deleteProduct}
            />
          ) : null}
          {this.state.showCreate ? (
            <CreateProduct
              show={this.state.showCreate}
              onHide={() => this.setState({ showCreate: false })}
              createProduct={this.createProduct}
            />
          ) : null}
        </Row>
      </Grid>
    </div>
  );
}

ProductsPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadAllProducts: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  createProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
