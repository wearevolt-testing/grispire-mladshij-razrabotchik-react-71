import React from 'react';

import PropTypes from 'prop-types';
import { Grid, Row, Button } from 'react-bootstrap';
import ModalCustomer from './ModalCustomer';
import CreateCustomer from './CreateCustomer';
import CustomerList from './CustomerList';
import ModalConfirm from '../Common/ModalConfirm';

export default class CustomersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCustomer: false,
      showDelete: false,
      showCreate: false,
    };
  }
  componentWillMount = () => {
    this.props.loadAllCustomers();
  };
  componentDidMount = () => {
    document.title = 'Customers';
  };
  onCustomerClick = (number) => {
    this.setState({ activeCustomer: this.props.customers[number], showCustomer: true });
  };
  toggleDeleteConfirm = () => {
    this.setState({ showCustomer: !this.state.showCustomer, showDelete: !this.state.showDelete });
  };
  editCustomer = (editedCustomerInfo) => {
    this.setState({ showCustomer: false });
    this.props.editCustomer(this.state.activeCustomer.id, editedCustomerInfo);
  };
  deleteCustomer = () => {
    this.props.deleteCustomer(this.state.activeCustomer.id);
    this.setState({ showDelete: false });
  };
  createCustomer = (newCustomer) => {
    this.props.createCustomer(newCustomer);
    this.setState({ showCreate: false });
  };
  render = () => (
    <div>
      <Grid>
        <Row>
          <h1>
            Customer list{' '}
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
          <CustomerList
            customersArr={this.props.customers}
            onCustomerClick={this.onCustomerClick}
          />
          {this.state.showCustomer ? (
            <ModalCustomer
              show={this.state.showCustomer}
              onHide={() => this.setState({ showCustomer: false })}
              activeCustomer={this.state.activeCustomer}
              onEditCustomer={this.editCustomer}
              onDeleteClick={this.toggleDeleteConfirm}
            />
          ) : null}
          {this.state.showDelete ? (
            <ModalConfirm
              show={this.state.showDelete}
              header={`Delete customer ${this.state.activeCustomer.name}?`}
              text={`Are you sure you want to delete user ${this.state.activeCustomer
                .name}? This action cannot be undone.`}
              onHide={this.toggleDeleteConfirm}
              onConfirm={this.deleteCustomer}
            />
          ) : null}
          {this.state.showCreate ? (
            <CreateCustomer
              show={this.state.showCreate}
              onHide={() => this.setState({ showCreate: false })}
              createCustomer={this.createCustomer}
            />
          ) : null}
        </Row>
      </Grid>
    </div>
  );
}

CustomersPage.propTypes = {
  loadAllCustomers: PropTypes.func.isRequired,
  editCustomer: PropTypes.func.isRequired,
  createCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
  customers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
