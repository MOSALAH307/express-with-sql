// const connection = require("../../../db/connection");
import connection from "../../../db/connection.js";
//==============================
//getAllUsers
//==============================
const getAllUsers = (req, res) => {
  const query = `SELECT id,name,age,email FROM users`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "querry error", error });
    }
    return res.json(result)
  });
};
//==============================
//getUsersWithProducts
//==============================
const getUsersWithProducts = (req, res) => {
  const query = `SELECT users.id as userId,name,pName,price,createdby FROM users 
  INNER JOIN products ON products.createdby = users.id ORDER BY users.id`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "querry error", error });
    }
    return res.json(result)
  });
};
//==============================
//search user where name starts with a and age < 30
//==============================
const searchUserWithNameStartAndAge = (req, res) => {
  const { name, age } = req.query;
  // console.log({ name, age });
  const query = `SELECT id,name,age,email FROM users WHERE name LIKE '${name}%' AND age < ${age}`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "querry error", error });
    }
    return res.json(result)
  });
};
//==============================
//search users by list of ids
//==============================
const searchUserByListOfId = (req, res) => {
  const { id } = req.query;
  // console.log(id);
  const query = `SELECT id,name,age,email FROM users WHERE id IN (${id})`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "query error", error });
    }
    return res.json(result)
  });
};
//==============================
//addUser
//==============================
//search for email in database first then add if email doesn't exist
const addUserBySearchEmailFirst = (req, res) => {
  const { name, email, password, age } = req.body;
  // console.log(name, email, password, age);
  const addQuery = `INSERT INTO users (name,email,password,age) VALUES ('${name}','${email}','${password}',${age})`;
  const searchQuery = `SELECT email FROM users WHERE email = '${email}'`;
  connection.execute(searchQuery, (error, result) => {
    if (error) {
      return res.json({ message: "query error", error });
    }
    if (result.length) {
      return res.json({ message: "email already exists" });
    } else {
      connection.execute(addQuery, (error, result) => {
        if (error) {
          return res.json({ message: "query error", error });
        }
        return res.json({ message: "user added", result });
      });
    }
  });
};
//check for error number then add
const addUserByCheckingErrorNo = (req, res) => {
  const { name, email, password, age } = req.body;
  const addQuery = `INSERT INTO users (name,email,password,age) VALUES ('${name}','${email}','${password}',${age})`;
  connection.execute(addQuery, (error, result) => {
    if (error) {
      if (error.errno == 1062) {
        return res.json({ message: "email already exixts" });
      }
      return res.json({ message: "query error", error });
    }
    return res.json({ message: "user added", result });
  });
};
//==============================
//updateUser
//==============================
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, password, age } = req.body;
  // console.log(id);
  const query = `UPDATE users SET name='${name}',email='${email}',password='${password}',age=${age} WHERE id=${id}`;
  connection.execute(query, (error, result) => {
    if (error) {
      if (error.errno == 1062) {
        return res.json({ message: "email already exists" });
      }
      return res.json({ message: "querry error", error });
    }
    return result.affectedRows
      ? res.json({ message: "user updated", result })
      : res.json({ message: "id does not exist" });
  });
};
//==============================
//deleteUser
//==============================
const deleteUser = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE id = ${id}`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "querry error", error });
    }
    return result.affectedRows
      ? res.json({ message: "user deleted", result })
      : res.json({ message: "id does not exist" });
  });
};

// module.exports = {
//   getAllUsers,
//   getUsersWithProducts,
//   searchUserWithNameStartAndAge,
//   searchUserByListOfId,
//   addUserBySearchEmailFirst,
//   addUserByCheckingErrorNo,
//   updateUser,
//   deleteUser,
// };
export {
  getAllUsers,
  getUsersWithProducts,
  searchUserWithNameStartAndAge,
  searchUserByListOfId,
  addUserBySearchEmailFirst,
  addUserByCheckingErrorNo,
  updateUser,
  deleteUser,
};
