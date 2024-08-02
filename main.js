const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
// const router = express.Router();

const app = express();
const PORT = 8000;

// Import dependency
const Common = require('./src/common/common')

// Import order dependency
const OrderRepository = require('./src/repository/order');
const OrderService = require('./src/service/order');
const OrderHandler = require('./src/handler/order')

// Import user dependency
const UserHandler = require('./src/handler/user');
const UserService = require('./src/service/user');
const UserRepository = require('./src/repository/user');

// Import item dependency
const ItemRepository = require('./src/repository/item');
const ItemService = require('./src/service/item');
const ItemHandler = require('./src/handler/item');

// Import nodemailer dependency
const NodemailerRepository = require('./src/repository/nodemailer');
const NodemailerService = require('./src/service/nodemailer');
const NodemailerHandler = require('./src/handler/nodemailer');

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.hostname} ${req.url}`);
    next();
}

app.use(express.json());
app.use(logger);

// Swagger Router
// app.use('/api-docs', router)
// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Common
const common = new Common();

// Order
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, common);
const orderHandler = new OrderHandler(orderService);

// Item
const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository, common);
const itemHandler = new ItemHandler(itemService);

// User
const userRepository = new UserRepository();
const userService = new UserService(userRepository, common, itemService, orderService);
const userHandler = new UserHandler(userService);

// Nodemailer
const nodemailerRepository = new NodemailerRepository();
const nodemailerService = new NodemailerService(nodemailerRepository, common);
const nodemailerHandler = new NodemailerHandler(nodemailerService);

// User API
app.get('/user/users', userHandler.getAll);
app.post('/user/register', userHandler.register);
app.delete('/user/delete/:id', userHandler.delete);
app.post('/user/login', userHandler.login);
app.post('/user/logout', userHandler.logout);
app.post('/user/order', userHandler.makeOrder);

// Item API
app.get('/item/items', itemHandler.getAll);
app.get('/item/find', itemHandler.getById);
app.post('/item/add', itemHandler.add);
app.delete('/item/delete/:id', itemHandler.delete);

// Order API
app.delete('/order/delete/:id', orderHandler.delete);
app.get('/order/get-by-user', orderHandler.getByUserId);
app.patch('/order/update', orderHandler.updateStatus);

app.get('/mailer/send', nodemailerHandler.sendEmail);

// Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});      