import express from "express";
import {
  createUser,
  deleteUser,
  fetchUsers,
  LoginUser,
  logoutUser,
  showUser,
  updateUser,
} from "../controllers/userController.js";

const useRoute = express.Router();

useRoute.get("/all", fetchUsers);
useRoute.post("/create", createUser);
useRoute.get("/:id", showUser);
useRoute.put("/update/:id", updateUser);
useRoute.delete("/delete/:id", deleteUser);
useRoute.post("/login", LoginUser);
useRoute.post("/logout", logoutUser);

export default useRoute;
