// eslint-disable
let express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path'),
  Sequelize = require('sequelize'),
  _ = require('lodash');

sequelize = new Sequelize(`sqlite://${path.join(__dirname, 'invoices.sqlite')}`, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'invoices.sqlite'),
});

Customer = sequelize.define('customers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
});

Product = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL,
  },
});

Invoice = sequelize.define('invoices', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: Sequelize.INTEGER,
  },
  discount: {
    type: Sequelize.DECIMAL,
  },
  total: {
    type: Sequelize.DECIMAL,
  },
});

InvoiceItem = sequelize.define('invoice_items', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoice_id: {
    type: Sequelize.INTEGER,
  },
  product_id: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.DECIMAL,
  },
});

sequelize
  .sync()
  .then(() => {
    Customer.truncate();
  })
  .then(() => {
    Product.truncate();
  })
  .then(() => {
    Invoice.truncate();
  })
  .then(() => {
    InvoiceItem.truncate();
  })
  .then(() => {
    Customer.create({
      name: 'Mark Benson',
      address: '353 Rochester St, Rialto FL 43250',
      phone: '555-534-2342',
    });

    Customer.create({
      name: 'Bob Smith',
      address: '215 Market St, Dansville CA 94325',
      phone: '555-534-2342',
    });

    Customer.create({
      name: 'John Draper',
      address: '890 Main St, Fontana IL 31450',
      phone: '555-534-2342',
    });

    Product.create({
      name: 'Parachute Pants',
      price: 29.99,
    });

    Product.create({
      name: 'Phone Holder',
      price: 9.99,
    });

    Product.create({
      name: 'Pet Rock',
      price: 5.99,
    });

    Product.create({
      name: 'Egg Timer',
      price: 15.99,
    });

    Product.create({
      name: 'Neon Green Hat',
      price: 21.99,
    });
  })
  .catch((e) => {
    console.log('ERROR SYNCING WITH DB', e);
  });

const app = (module.exports = express());
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// CUSTOMERS API

app
  .route('/api/customers')
  .get((req, res) => {
    Customer.findAll().then((customers) => {
      res.json(customers);
    });
  })
  .post((req, res) => {
    console.log(req.body);
    const customer = Customer.build(_.pick(req.body, ['name', 'address', 'phone']));
    customer.save().then((customer) => {
      res.json(customer);
    });
  });

app
  .route('/api/customers/:customer_id')
  .get((req, res) => {
    Customer.findById(req.params.customer_id).then((customer) => {
      res.json(customer);
    });
  })
  .put((req, res) => {
    console.log(req.body);
    Customer.findById(req.params.customer_id).then((customer) => {
      customer.update(_.pick(req.body, ['name', 'address', 'phone'])).then((customer) => {
        res.json(customer);
      });
    });
  })
  .delete((req, res) => {
    Customer.findById(req.params.customer_id).then((customer) => {
      customer.destroy().then((customer) => {
        res.json(customer);
      });
    });
  });

// PRODUCTS API

app
  .route('/api/products')
  .get((req, res) => {
    Product.findAll().then((products) => {
      res.json(products);
    });
  })
  .post((req, res) => {
    const product = Product.build(_.pick(req.body, ['name', 'price']));
    product.save().then((product) => {
      res.json(product);
    });
  });

app
  .route('/api/products/:product_id')
  .get((req, res) => {
    Product.findById(req.params.product_id).then((product) => {
      res.json(product);
    });
  })
  .put((req, res) => {
    Product.findById(req.params.product_id).then((product) => {
      product.update(_.pick(req.body, ['name', 'price'])).then((product) => {
        res.json(product);
      });
    });
  })
  .delete((req, res) => {
    Product.findById(req.params.product_id).then((product) => {
      product.destroy().then((product) => {
        res.json(product);
      });
    });
  });

// INVOICES API

app
  .route('/api/invoices')
  .get((req, res) => {
    Invoice.findAll().then((invoices) => {
      res.json(invoices);
    });
  })
  .post((req, res) => {
    const invoice = Invoice.build(_.pick(req.body, ['customer_id', 'discount', 'total']));
    invoice.save().then((invoice) => {
      res.json(invoice);
    });
  });

app
  .route('/api/invoices/:invoice_id')
  .get((req, res) => {
    Invoice.findById(req.params.invoice_id).then((invoice) => {
      res.json(invoice);
    });
  })
  .put((req, res) => {
    Invoice.findById(req.params.invoice_id).then((invoice) => {
      invoice
        .update(_.pick(req.body, ['customer_id', 'discount', 'total']))
        .then((invoice) => {
          res.json(invoice);
        });
    });
  })
  .delete((req, res) => {
    Invoice.findById(req.params.invoice_id).then((invoice) => {
      invoice.destroy().then((invoice) => {
        res.json(invoice);
      });
    });
  });

// INVOICE ITEMS API

app
  .route('/api/invoices/:invoice_id/items')
  .get((req, res) => {
    InvoiceItem.findAll({ where: { invoice_id: req.params.invoice_id } }).then((invoice_items) => {
      res.json(invoice_items);
    });
  })
  .post((req, res) => {
    const invoice_item = InvoiceItem.build(_.pick(req.body, ['product_id', 'quantity']));
    invoice_item.set('invoice_id', req.params.invoice_id);
    invoice_item.save().then((invoice_item) => {
      res.json(invoice_item);
    });
  });

app
  .route('/api/invoices/:invoice_id/items/:id')
  .get((req, res) => {
    InvoiceItem.findById(req.params.id).then((invoice_item) => {
      res.json(invoice_item);
    });
  })
  .put((req, res) => {
    InvoiceItem.findById(req.params.id).then((invoice_item) => {
      invoice_item
        .update(_.pick(req.body, ['product_id', 'quantity']))
        .then((invoice_item) => {
          res.json(invoice_item);
        });
    });
  })
  .delete((req, res) => {
    InvoiceItem.findById(req.params.id).then((invoice_item) => {
      invoice_item.destroy().then((invoice_item) => {
        res.json(invoice_item);
      });
    });
  });

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')));
    res.end();
  });
} else {
  app.use(express.static(`${__dirname}/public`));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

// Starting express server
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
