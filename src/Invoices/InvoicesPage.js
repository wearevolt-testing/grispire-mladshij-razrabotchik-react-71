import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Button } from 'react-bootstrap';
import InvoiceList from './InvoiceList';
import ModalConfirm from '../Common/ModalConfirm';

export default class InvoicesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInvoice: false,
      showDelete: false,
    };
  }
  componentWillMount = () => {
    this.props.loadAllCustomers();
    this.props.loadAllInvoices();
  };
  componentDidMount = () => {
    document.title = 'Invoices';
  };
  toggleDeleteConfirm = () => {
    this.setState({ showInvoice: !this.state.showInvoice, showDelete: !this.state.showDelete });
  };
  startInvoiceDelete = (id) => {
    this.setState({ invoiceToDelete: id });
    this.setState({ showDelete: true });
  };
  deleteInvoice = () => {
    this.props.deleteInvoice(this.state.invoiceToDelete);
    this.setState({ showDelete: false });
  };
  render = () => (
    <div>
      <Grid>
        <Row>
          <h1>
            Invoice list{' '}
            <Link to="/invoices/сreate">
              <Button bsStyle="primary">Create</Button>
            </Link>
          </h1>
        </Row>
        <Row>
          <InvoiceList
            invoicesArr={this.props.invoices}
            onInvoiceClick={this.onInvoiceClick}
            startInvoiceDelete={this.startInvoiceDelete}
            // превращает массив объектов-юзеров в объект вида id: name
            usersObj={this.props.customers.reduce(
              (prev, curr) => ({ ...prev, [curr.id]: curr.name }),
              {},
            )}
          />
          {this.state.showDelete ? (
            <ModalConfirm
              show={this.state.showDelete}
              header="Delete this invoice?"
              text="Are you sure you want to delete invoice? This action cannot be undone."
              onHide={this.toggleDeleteConfirm}
              onConfirm={this.deleteInvoice}
            />
          ) : null}
        </Row>
      </Grid>
    </div>
  );
}

InvoicesPage.propTypes = {
  loadAllInvoices: PropTypes.func.isRequired,
  loadAllCustomers: PropTypes.func.isRequired,
  deleteInvoice: PropTypes.func.isRequired,
  invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
  customers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
