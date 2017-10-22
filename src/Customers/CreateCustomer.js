import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

const inputNames = {
  name: 'name',
  address: 'address',
  phone: 'phone',
};

const minLength = {
  [inputNames.name]: 3,
  [inputNames.address]: 5,
  [inputNames.phone]: 10,
};

export default class CreateCustomer extends React.Component {
  getValidationState = (name) => {
    // Если еще нет стейта, либо в стейте нет переменной с содержимым текущего инпута
    if (!this.state) return null;
    // Если значение стейта для текущего инпута undefined, то в него еще ни разу не вводился символ
    if (this.state[name] === undefined) return null;
    const { length } = this.state[name];
    const min = minLength[name];
    return length >= min ? 'success' : 'error';
  };
  createCustomer = (e) => {
    e.preventDefault();
    try {
      if (
        this.state[`${inputNames.name}IsValid`] &&
        this.state[`${inputNames.address}IsValid`] &&
        this.state[`${inputNames.phone}IsValid`]
      ) {
        const newCustomer = {
          name: this.state[inputNames.name],
          address: this.state[inputNames.address],
          phone: this.state[inputNames.phone],
        };
        this.props.createCustomer(newCustomer);
      }
    } catch (error) {
      console.error('Fill empty fields!');
    }
  };
  handleChange = (e) => {
    const { name } = e.target;
    const { length } = e.target.value;
    const min = minLength[name];
    this.setState({ [name]: e.target.value, [`${name}IsValid`]: length >= min }, this.didChanged);
  };
  didChanged = () => {
    if (this.state.didChanged) return;
    this.setState({ didChanged: true });
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
            validationState={this.getValidationState(inputNames.address)}
          >
            <ControlLabel>Address</ControlLabel>
            <FormControl
              type="text"
              name={inputNames.address}
              value={this.props[inputNames.address]}
              placeholder="Enter address"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup
            controlId="customerInputPhone"
            validationState={this.getValidationState(inputNames.phone)}
          >
            <ControlLabel>Phone</ControlLabel>
            <FormControl
              type="text"
              name={inputNames.phone}
              value={this.props[inputNames.phone]}
              placeholder="Enter phone"
              onChange={this.handleChange}
            />
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={e => this.createCustomer(e)} type="submit" bsStyle="info">
          Create
        </Button>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

CreateCustomer.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  createCustomer: PropTypes.func.isRequired,
};
