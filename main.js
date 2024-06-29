const express = require('express');

const app = express();
const PORT = 8000;

// Import dependency
const Common = require('./src/common/common')

// Import user dependency
const UserHandler = require('./src/handler/user');
const UserService = require('./src/service/user');
const UserRepository = require('./src/repository/user');

// Import item dependency
const ItemRepository = require('./src/repository/item');
const ItemService = require('./src/service/item');
const ItemHandler = require('./src/handler/item');

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.hostname} ${req.url}`);
    next();
}

app.use(express.json());
app.use(logger);

// Common
const common = new Common();

// User
const userRepository = new UserRepository();
const userService = new UserService(userRepository, common);
const userHandler = new UserHandler(userService);

// Item
const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository, common);
const itemHandler = new ItemHandler(itemService);

// User API
app.get('/user/users', userHandler.getAll);
app.post('/user/register', userHandler.register);
app.delete('/user/delete/:id', userHandler.delete);
app.post('/user/login', userHandler.login);

// Item API
app.get('/item/items', itemHandler.getAll);
app.get('/item/find', itemHandler.getById);
app.post('/item/add', itemHandler.add);
app.delete('/item/delete/:id', itemHandler.delete);

// Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});      