// const mysql = require("mysql2");
import {createConnection} from "mysql2"
//connection with database
const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "friday",
});

// module.exports = connection;
export default connection;