/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Button, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import Select from 'react-select';

import InvoiceProductsList from './InvoiceProductsList';

export default class EditInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: null,
      coefficient: 1,
      chosenProducts: [],
      productsToDelete: [],
      productsToChange: {},
    };
  }
  componentWillMount() {
    this.props.loadInvoice(this.props.editId);
    this.props.loadAllProducts();
    this.props.loadAllCustomers();
    this.props.loadProductsFor(this.props.editId);
  }
  componentDidMount = () => {
    document.title = 'Edit invoice';
  };
  componentWillReceiveProps = (nextProps) => {
    const {
      pickedInvoice,
      customers,
      invoiceProducts,
      productPrices,
      productNames,
      lastEdited,
    } = nextProps;
    // если условие верно - выстрелил action, сообщающий о успешном изменении текущего инвойса
    if (this.props.editId === lastEdited) this.props.history.push('/invoices');
    // если discount в стейте не инициализирован (что происходит при первом изменении),
    // то он заполняется из pickedInvoice
    if (!this.state.discount && pickedInvoice) {
      const coefficient = (100 - pickedInvoice.discount) / 100;
      this.setState({ discount: pickedInvoice.discount, coefficient });
    }
    // аналогично с именем покупателя
    if (!this.state.customerId && customers && pickedInvoice) {
      // если в пришедшем массиве покупателей существует (не удален с момента создания инвойса)
      // юзер с нужным id, то автоматически выбирается
      if (customers.some(customer => customer.value === pickedInvoice.customer_id)) {
        this.setState({
          customerId: pickedInvoice.customer_id,
        });
        // в противном случае он сбрасывается
      } else this.setState({ customerId: null });
    }
    // в стейт добавляется массив продуктов, приведенный к юзабельному виду
    const chosenProducts = invoiceProducts.map(product => ({
      id: product.product_id,
      name: productNames[product.product_id],
      price: productPrices[product.product_id],
      ownId: product.id,
      qty: product.quantity,
    }));
    this.setState({ chosenProducts });
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
    // очистка ID в сторе, отвечающих за редирект
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
  unpickProduct = (arrayPosition) => {
    const chosenProducts = this.state.chosenProducts.slice();
    const deleted = chosenProducts.splice(arrayPosition, 1);
    // если у удаляемого продукта есть ownId - он вернулся из БД
    // следовательно его придется удалять из БД запросом
    if (deleted[0].ownId) {
      const productsToDelete = this.state.productsToDelete.slice();
      productsToDelete.push(deleted[0].ownId);
      this.setState({ chosenProducts, productsToDelete });
    } else this.setState({ chosenProducts });
  };
  addProduct = () => {
    // если продукт в селекторе не выбран - return
    if (!this.state.productId) return;
    const chosenProducts = this.state.chosenProducts.slice();
    chosenProducts.push({
      id: this.state.productId,
      name: this.state.productName,
      price: this.props.productPrices[this.state.productId],
      qty: 1,
    });
    this.setState({ chosenProducts });
  };
  qtyHandler = (e, arrayPosition) => {
    const tempArr = this.state.chosenProducts.slice();
    const newCell = tempArr[arrayPosition];
    newCell.qty = +e.target.value;
    if (newCell.ownId) {
      // наличие ownId говорит о том, что продукт пришел с сервера
      // значит его придется обрабатывать PUT'ом
      this.setState({
        chosenProducts: tempArr,
        productsToChange: { [newCell.ownId]: e.target.value },
      });
    }
    tempArr.splice(arrayPosition, 1, newCell);
    this.setState({ chosenProducts: tempArr });
  };
  editInvoice = () => {
    const payload = {
      id: this.props.editId,
      customer_id: this.state.customerId,
      discount: this.state.discount,
      total: this.state.chosenProducts
        .reduce(
          (prev, curr) => prev + (curr.price ? curr.price : 0) * curr.qty * this.state.coefficient,
          0,
        )
        .toFixed(2),
      // у вновь добавленных продуктов отсутствует ownId, который выдается после попадания в БД
      productsToAdd: this.state.chosenProducts.filter(product => !product.ownId),
      productsToDelete: this.state.productsToDelete,
      productsToChange: Object.keys(this.state.productsToChange).map(key => ({
        [key]: this.state.productsToChange[key],
      })),
    };
    this.props.editInvoice(payload);
  };
  render = () => (
    <div>
      <Grid>
        <Row>
          <Col md={4} sm={12} xs={12} lg={5}>
            <h1>Edit Invoice</h1>
            <Button
              bsStyle="success"
              disabled={!this.state.isValid || this.props.queryInProgress}
              style={{ marginBottom: 15 }}
              onClick={this.editInvoice}
            >
              Edit
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
                    options={this.props.selectorProducts}
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
          Total:{' '}
          {this.state.chosenProducts
            .reduce(
              (prev, curr) =>
                // тернарник на случай, если продукт удален -> его цена неизвестна
                prev + (curr.price ? curr.price : 0) * curr.qty * this.state.coefficient,
              0,
            )
            .toFixed(2)}
        </h2>
      </Grid>
    </div>
  );
}

EditInvoice.defaultProps = {
  pickedInvoice: null,
  lastEdited: null,
};

EditInvoice.propTypes = {
  lastEdited: PropTypes.string,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loadInvoice: PropTypes.func.isRequired,
  editInvoice: PropTypes.func.isRequired,
  loadAllCustomers: PropTypes.func.isRequired,
  loadAllProducts: PropTypes.func.isRequired,
  loadProductsFor: PropTypes.func.isRequired,
  clearRedirect: PropTypes.func.isRequired,
  pickedInvoice: PropTypes.shape({
    discount: PropTypes.number,
    customer_id: PropTypes.number,
  }),
  selectorProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  customers: PropTypes.arrayOf(PropTypes.object).isRequired,
  invoiceProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  productPrices: PropTypes.objectOf(PropTypes.number).isRequired,
  productNames: PropTypes.objectOf(PropTypes.string).isRequired,
  editId: PropTypes.string.isRequired,
  queryInProgress: PropTypes.bool.isRequired,
};
