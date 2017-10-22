/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Button, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import Select from 'react-select';

import InvoiceProductsList from './InvoiceProductsList';

export default class InvoiceCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: null,
      discount: 0,
      coefficient: 1,
      chosenProducts: [],
    };
  }
  componentWillMount() {
    this.props.loadAllInvoices();
    this.props.loadAllProducts();
    this.props.loadAllCustomers();
  }
  componentDidMount = () => {
    document.title = 'New invoice';
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.lastCreated) this.props.history.push('/invoices');
  };
  componentDidUpdate = () => {
    if (!this.state.isValid && this.state.customerId && this.state.chosenProducts.length) {
      this.setState({ isValid: true });
    } else if (
      this.state.isValid &&
      (!this.state.customerId || !this.state.chosenProducts.length)
    ) {
      this.setState({ isValid: false });
    }
  };
  componentWillUnmount = () => {
    this.props.clearRedirect();
  };
  preventChars = (e) => {
    // ограничивает ввод в инпут всего, кроме чисел
    if (
      e.key === ' ' ||
      (e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight' &&
        e.key !== '.' &&
        isNaN(e.key)) // eslint-disable-line
    ) {
      e.preventDefault();
    }
  };
  handleDiscount = (e) => {
    let { value } = e.target;
    if (value > 100) value = 100;
    const coefficient = (100 - value) / 100;
    this.setState({ [e.target.name]: value, coefficient });
  };
  addProduct = () => {
    // если продукт в селекторе не выбран - return
    if (!this.state.productId) return;
    const tempArr = this.state.chosenProducts.slice();
    tempArr.push({
      id: this.state.productId,
      name: this.state.productName,
      price: this.props.productPrices[this.state.productId],
      qty: 1,
    });
    this.setState({ chosenProducts: tempArr });
  };
  unpickProduct = (arrayPosition) => {
    const tempArr = this.state.chosenProducts.slice();
    tempArr.splice(arrayPosition, 1);
    this.setState({ chosenProducts: tempArr });
  };
  qtyHandler = (e, arrayPosition) => {
    const tempArr = this.state.chosenProducts.slice();
    const newCell = tempArr[arrayPosition];
    newCell.qty = +e.target.value;
    tempArr.splice(arrayPosition, 1, newCell);
    this.setState({ chosenProducts: tempArr });
  };
  createInvoice = () => {
    const payload = {
      customer_id: this.state.customerId,
      discount: this.state.discount,
      total: this.state.chosenProducts
        .reduce((prev, curr) => prev + curr.price * curr.qty * this.state.coefficient, 0)
        .toFixed(2),
      chosenProducts: this.state.chosenProducts,
    };
    this.props.createInvoice(payload);
  };
  render = () => (
    <div>
      <Grid>
        <Row>
          <Col md={4} sm={12} xs={12} lg={5}>
            <h1>Create Invoice</h1>
            <Button
              bsStyle="success"
              disabled={!this.state.isValid || this.props.queryInProgress}
              style={{ marginBottom: 15 }}
              onClick={this.createInvoice}
            >
              Create
            </Button>
            <FormGroup controlId="discount">
              <ControlLabel>Discount (%)</ControlLabel>
              <FormControl
                type="number"
                step="1"
                min="0"
                max="100"
                name="discount"
                value={this.state.discount}
                placeholder="Enter discount in percents"
                onChange={e => this.handleDiscount(e)}
                onKeyDown={e => this.preventChars(e)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Customer</ControlLabel>
              <Select
                options={this.props.customers}
                name="selectedCustomer"
                value={this.state.customerId}
                onChange={customer =>
                  this.setState({ customerId: customer === null ? null : customer.value })}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Add product</ControlLabel>
              <Row>
                <Col lg={10} md={8} sm={8} xs={8}>
                  <Select
                    options={this.props.products}
                    name="selectedProduct"
                    value={this.state.productId}
                    onChange={product =>
                      this.setState({
                        productId: product === null ? null : product.value,
                        productName: product === null ? null : product.label,
                      })}
                  />
                </Col>
                <Col lg={2} md={4} sm={4} xs={4}>
                  <Button onClick={this.addProduct}>Add</Button>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
        <InvoiceProductsList
          chosenProducts={this.state.chosenProducts}
          coefficient={this.state.coefficient}
          preventChars={this.preventChars}
          qtyHandler={this.qtyHandler}
          unpickProduct={this.unpickProduct}
        />
        <h2>
          Total: {' '}
          {this.state.chosenProducts
            .reduce((prev, curr) => prev + curr.price * curr.qty * this.state.coefficient, 0)
            .toFixed(2)}
        </h2>
      </Grid>
    </div>
  );
}

InvoiceCreatePage.defaultProps = {
  lastCreated: null,
};

InvoiceCreatePage.propTypes = {
  lastCreated: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loadAllInvoices: PropTypes.func.isRequired,
  loadAllCustomers: PropTypes.func.isRequired,
  loadAllProducts: PropTypes.func.isRequired,
  createInvoice: PropTypes.func.isRequired,
  productPrices: PropTypes.objectOf(PropTypes.number).isRequired,
  customers: PropTypes.arrayOf(PropTypes.object).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  queryInProgress: PropTypes.bool.isRequired,
  clearRedirect: PropTypes.func.isRequired,
};
