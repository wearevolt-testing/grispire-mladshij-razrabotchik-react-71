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

export default class CreateProduct extends React.Component {
  getValidationState = (name) => {
    // Если еще нет стейта, либо в стейте нет переменной с содержимым текущего инпута
    if (!this.state) return null;
    // Если значение стейта для текущего инпута undefined, то в него еще ни разу не вводился символ
    if (this.state[name] === undefined) return null;
    const { length } = this.state[name];
    const min = minLength[name];
    if (name === inputNames.price && length < 2 && this.state[name].includes('.')) {
      return 'error';
    }
    return length >= min ? 'success' : 'error';
  };
  createProduct = (e) => {
    e.preventDefault();
    try {
      if (this.state[`${inputNames.name}IsValid`] && this.state[`${inputNames.price}IsValid`]) {
        const newProduct = {
          name: this.state[inputNames.name],
          price: this.state[inputNames.price],
        };
        this.props.createProduct(newProduct);
      }
    } catch (error) {
      console.error('Fill empty fields!');
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
        <Modal.Title id="contained-modal-title-lg">Create new customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={e => this.onSubmit(e)}>
          <FormGroup
            controlId="customerInputName"
            validationState={this.getValidationState(inputNames.name)}
          >
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              name={inputNames.name}
              value={this.props[inputNames.name]}
              placeholder="Enter name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup
            controlId="customerInputAddress"
            validationState={this.getValidationState(inputNames.price)}
          >
            <ControlLabel>Price</ControlLabel>
            <FormControl
              type="text"
              name={inputNames.price}
              value={this.props[inputNames.price]}
              placeholder="Enter price"
              onChange={this.handleChange}
              onKeyDown={e => this.preventChars(e)}
            />
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={e => this.createProduct(e)} type="submit" bsStyle="info">
          Create
        </Button>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

CreateProduct.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  createProduct: PropTypes.func.isRequired,
};
