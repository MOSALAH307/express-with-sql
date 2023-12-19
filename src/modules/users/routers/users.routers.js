//EC5
// const router = require("express").Router();
// const {
//   getAllUsers,
//   getUsersWithProducts,
//   searchUserWithNameStartAndAge,
//   searchUserByListOfId,
//   addUserBySearchEmailFirst,
//   addUserByCheckingErrorNo,
//   updateUser,
//   deleteUser,
// } = require("../controllers/users.controllers");

//ECM6
import { Router } from 'express'
import {
  getAllUsers,
  getUsersWithProducts,
  searchUserWithNameStartAndAge,
  searchUserByListOfId,
  addUserBySearchEmailFirst,
  addUserByCheckingErrorNo,
  updateUser,
  deleteUser,
} from '../controllers/users.controllers.js'
//===============================
//user end points
//===============================
const router = Router();
router.get("/users", getAllUsers);

router.get("/usersWithProducts", getUsersWithProducts);

router.get("/searchUser", searchUserWithNameStartAndAge);

router.get("/user", searchUserByListOfId);

router.post("/addUser", addUserBySearchEmailFirst);
router.post("/addUser", addUserByCheckingErrorNo);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);

// module.exports = router;
export default router;
