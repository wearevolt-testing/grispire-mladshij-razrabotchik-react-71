/* eslint-disable no-restricted-globals */

import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

const inputNames = {
  name: 'name',
  price: 'price',
};

const minLength = {
  [inputNames.name]: 2,
  [inputNames.price]: 1,
};

export default class ModalCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [inputNames.name]: this.props.activeProduct.name,
      [`${inputNames.name}IsValid`]:
        this.props.activeProduct.name.length >= minLength[inputNames.name],
      [inputNames.price]: this.props.activeProduct.price.toString(),
      [`${inputNames.price}IsValid`]:
        this.props.activeProduct.price.toString().length >= minLength[inputNames.price],
    };
  }
  getValidationState = (name) => {
    const { length } = this.state[name];
    const min = minLength[name];
    // если в поле для цены введена только точка
    if (name === inputNames.price && length < 2 && this.state[name].includes('.')) {
      return 'error';
    }
    return length >= min ? 'success' : 'error';
  };
  editProduct = (e) => {
    e.preventDefault();
    if (this.state[`${inputNames.name}IsValid`] && this.state[`${inputNames.price}IsValid`]) {
      const editedProduct = {
        name: this.state[inputNames.name],
        price: parseFloat(this.state[inputNames.price]).toFixed(2),
      };
      this.props.onEditProduct(editedProduct);
    }
  };
  handleChange = (e) => {
    const { name } = e.target;
    const { length } = e.target.value;
    const min = minLength[name];
    // если в поле для цены введена только точка
    if (name === inputNames.price && length < 2 && e.target.value.includes('.')) {
      this.setState({ [name]: e.target.value, [`${name}IsValid`]: false }, this.didChanged);
      return;
    }
    this.setState({ [name]: e.target.value, [`${name}IsValid`]: length >= min }, this.didChanged);
  };
  didChanged = () => {
    if (this.state.didChanged) return;
    this.setState({ didChanged: true });
  };
  preventChars = (e) => {
    // допускает не более 1 точки на все число
    if (e.key === '.' && e.target.value.includes('.')) e.preventDefault();
    // ограничивает ввод в инпут всего, кроме чисел
    if (
      e.key === ' ' ||
      (e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight' &&
        e.key !== '.' &&
        isNaN(e.key))
    ) {
      e.preventDefault();
    }
  };
  render = () => (
    <Modal
      show={this.props.show}
      onHide={this.props.onHide}
      bsSize="large"
      aria-labelledby="contained-modal-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">
          Card of {this.props.activeProduct.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={e => this.onSubmit(e)}>
          <FormGroup
            controlId="productInputName"
            validationState={this.getValidationState(inputNames.name)}
          >
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              name={inputNames.name}
              value={this.state[inputNames.name]}
              placeholder="Enter name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup
            controlId="productInputAddress"
            validationState={this.getValidationState(inputNames.price)}
          >
            <ControlLabel>Price</ControlLabel>
            <FormControl
              type="text"
              name={inputNames.price}
              value={this.state[inputNames.price]}
              placeholder="Enter price"
              onKeyDown={e => this.preventChars(e)}
              onChange={this.handleChange}
            />
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ float: 'left' }}
          onClick={() => this.props.onDeleteClick()}
          bsStyle="danger"
          bsSize="small"
        >
          Delete
        </Button>
        <Button
          disabled={!this.state.didChanged}
          onClick={e => this.editProduct(e)}
          type="submit"
          bsStyle="info"
        >
          Edit
        </Button>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalCustomer.propTypes = {
  show: PropTypes.bool.isRequired,
  activeProduct: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onHide: PropTypes.func.isRequired,
  onEditProduct: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
