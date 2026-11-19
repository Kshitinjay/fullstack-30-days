import { Router } from "express";

import {
  createUser,
  getAllUsers,
  getUserById,
  searchUsers,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/", createUser);

router.get("/", getAllUsers);

router.get("/by-id/:userId", getUserById);

router.get("/search-user", searchUsers);

export default router;