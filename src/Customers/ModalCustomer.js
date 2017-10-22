import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CustomerInput from './CustomerInput';

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

export default class ModalCustomer extends React.Component {
  componentWillMount = () => {
    this.setState({
      [inputNames.name]: this.props.activeCustomer.name,
      [`${inputNames.name}IsValid`]:
        this.props.activeCustomer.name.length >= minLength[inputNames.name],
      [inputNames.address]: this.props.activeCustomer.address,
      [`${inputNames.address}IsValid`]:
        this.props.activeCustomer.address.length >= minLength[inputNames.address],
      [inputNames.phone]: this.props.activeCustomer.phone,
      [`${inputNames.phone}IsValid`]:
        this.props.activeCustomer.phone.length >= minLength[inputNames.phone],
    });
  };
  getValidationState = (name) => {
    const { length } = this.state[name];
    const min = minLength[name];
    return length >= min ? 'success' : 'error';
  };
  editCustomer = (e) => {
    e.preventDefault();
    if (
      this.state[`${inputNames.name}IsValid`] &&
      this.state[`${inputNames.address}IsValid`] &&
      this.state[`${inputNames.phone}IsValid`]
    ) {
      const editedCustomer = {
        name: this.state[inputNames.name],
        address: this.state[inputNames.address],
        phone: this.state[inputNames.phone],
      };
      this.props.onEditCustomer(editedCustomer);
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
        <Modal.Title id="contained-modal-title-lg">
          Card of {this.props.activeCustomer.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={e => this.onSubmit(e)}>
          <CustomerInput
            id="customerInputName"
            header="Name"
            name={inputNames.name}
            value={this.state[inputNames.name]}
            placeholder="Enter name"
            getValidationState={this.getValidationState}
            onChange={this.handleChange}
          />
          <CustomerInput
            id="customerInputAddress"
            header="Address"
            name={inputNames.address}
            value={this.state[inputNames.address]}
            placeholder="Enter address"
            getValidationState={this.getValidationState}
            onChange={this.handleChange}
          />
          <CustomerInput
            id="customerInputPhone"
            header="Phone"
            name={inputNames.phone}
            value={this.state[inputNames.phone]}
            placeholder="Enter phone"
            getValidationState={this.getValidationState}
            onChange={this.handleChange}
          />
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
          onClick={e => this.editCustomer(e)}
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
  activeCustomer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  onHide: PropTypes.func.isRequired,
  onEditCustomer: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
