// const connection = require('../../../db/connection')
import connection from "../../../db/connection.js";

//==============================
//getAllProducts
//==============================
const getAllProducts = (req, res) => {
  const query = `SELECT * FROM products`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "query error", error });
    }
    return res.json(result);
  });
};
//==============================
//search for products where price > 3000
//==============================
const searchProduct = (req, res) => {
  const { price } = req.query;
  // console.log(price);
  const query = `SELECT * FROM products WHERE price > ${price} ORDER BY price`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "query error", error });
    }
    return res.json(result);
  });
};
//==============================
//add product
//in database createdby accepts null
//==============================
const addProduct = (req, res) => {
  const { pName, pDescription, price, createdby } = req.body;
  const query = `INSERT INTO products (pName, pDescription, price, createdby) VALUES 
  ('${pName}','${pDescription}',${price},${createdby})`;
  connection.execute(query, (error, result) => {
    if (error) {
      if (error.errno == 1452) {
        return res.json({ message: "invalid user id" });
      }
      return res.json({ message: "query error", error });
    }
    return res.json({ message: "product added", result });
  });
};
//==============================
//update product
//==============================
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { pName, pDescription, price, createdby } = req.body;
  const query = `UPDATE products SET pName='${pName}',pDescription='${pDescription}',price=${price} WHERE id=${id} AND createdby=${createdby}`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "query error", error });
    }
    return result.affectedRows
      ? res.json({ message: "product updated", result })
      : res.json({ message: "invalid product id or user id" });
  });
};
//==============================
//delete product
//==============================
const deleteProduct = (req, res) => {
  const { id } = req.params;
  const { createdby } = req.body;
  const query = `DELETE FROM products WHERE id = ${id} AND createdby = ${createdby}`;
  connection.execute(query, (error, result) => {
    if (error) {
      return res.json({ message: "query error", error });
    }
    return result.affectedRows
      ? res.json({ message: "product deleted", result })
      : res.json({ message: "invalid product id or user id" });
  });
};

// module.exports={getAllProducts,searchProduct,addProduct,updateProduct,deleteProduct}
export {
  getAllProducts,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
