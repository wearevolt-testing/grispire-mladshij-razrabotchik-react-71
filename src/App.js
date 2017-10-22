import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'react-select/dist/react-select.css';

import CustomersContainer from './Customers/CustomersContainer';
import ProductsPage from './Products/ProductsContainer';
import NavBar from './Common/NavBar';
import InvoiceCreatePage from './Invoices/InvoiceCreatePage';
import InvoicesPage from './Invoices/InvoicesPage';
import InvoiceEditPage from './Invoices/InvoiceEditPage';

export const App = () => (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={InvoicesPage} />
      <Route exact path="/invoices" component={InvoicesPage} />
      <Route path="/invoices/сreate" component={InvoiceCreatePage} />
      <Route
        path="/invoices/:id/edit"
        render={({ match }) => <InvoiceEditPage editId={match.params.id} />}
      />

      <Route path="/products" component={ProductsPage} />
      <Route path="/customers" component={CustomersContainer} />
    </Switch>
  </div>
);

export default App;
