// const userRouter = require("./modules/users/routers/users.routers");
// const productRouter = require('./modules/products/routers/products.routers.js')
import productRouter from './modules/products/routers/products.routers.js'
import userRouter from './modules/users/routers/users.routers.js'

const initiateApp = (express, app) => {
  //middle ware to parse req body
  app.use(express.json());
  app.use(productRouter)
  app.use(userRouter);
};

// module.exports = initiateApp;
export default initiateApp;
