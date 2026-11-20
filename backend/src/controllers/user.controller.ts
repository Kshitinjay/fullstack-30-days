import type { Request, Response } from "express";

import * as userService from "../services/user.service.js";

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body ?? {};

  if (typeof name !== "string" || typeof email !== "string" || !name.trim() || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "name and email are required",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "email must be a valid email address",
    });
  }

  const user = userService.createUser({ name, email });

  if (!user) {
    return res.status(409).json({
      success: false,
      message: "User already exists",
    });
  }

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};

export const getAllUsers = (_req: Request, res: Response) => {
  const users = userService.getAllUsers();

  return res.status(200).json({
    success: true,
    data: users,
  });
};

export const getUserById = ( req: Request<{ userId: string }>, res: Response) => {
  const { userId } = req.params;

  const user = userService.getUserById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
};

export const searchUsers = (req: Request<{}, {}, {}, { name?: string, email?: string }>, res: Response) => {
  const { name, email } = req.query;

  if (!name && !email) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one search filter: name or email",
    });
  }

  const user = userService.searchUsers({name, email});

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
};