import type { Request, Response } from "express";
import * as tasksService from "../services/tasks.service.js";

const validStatuses = ["todo", "in-progress", "done"];

export const getAllTasks = (req: Request<{}, {}, {}, { status?: string, page?: string, limit?: string }>, res: Response) => {
    const { status } = req.query;
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    if (status !== undefined && !validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be todo, in-progress or done",
        });
    }

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
        return res.status(400).json({
            success: false,
            message: "page and limit must be positive whole numbers",
        });
    }

    const tasks = status ? tasksService.getTasksByStatus(status) : tasksService.getAllTasks();

    const totalTasks = tasks.length;
    const totalPages = Math.ceil(totalTasks / limit);
    const startIndex = (page - 1) * limit;
    const paginatedTasks = tasks.slice(startIndex, startIndex + limit);

    return res.status(200).json({
        success: true,
        data: paginatedTasks,
        pagination: {
            page,
            limit,
            totalTasks,
            totalPages,
        },
    });
};

export const createTask = (req: Request, res: Response) => {
    const { value } = req.body ?? {};

    if (typeof value !== "string" || !value.trim()) {
        return res.status(400).json({
            success: false,
            message: "Task value cannot be empty",
        });
    }

    const task = tasksService.createTask(value);

    if (!task) {
        return res.status(409).json({
            success: false,
            message: "Task already exists",
        });
    }

    return res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
    });
}

export const deleteTask = (req: Request<{ taskId: string }>, res: Response) => {
    const { taskId } = req.params;

    const task = tasksService.deleteTask(taskId);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: task,
    });
}

export const getTaskById = (req: Request<{ taskId: string }>, res: Response) => {
    const { taskId } = req.params;
    const task = tasksService.getTask(taskId);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Task retrived successfully",
        data: task,
    });
}

export const updateTask = (req: Request<{ taskId: string }>, res: Response) => {
    const { taskId } = req.params;
    const { value, status } = req.body ?? {};

    if (value === undefined && status === undefined) {
        return res.status(400).json({
            success: false,
            message: "Provide value or status to update",
        });
    }

    if (value !== undefined && (typeof value !== "string" || !value.trim())) {
        return res.status(400).json({
            success: false,
            message: "Task value cannot be empty",
        });
    }

    if (status !== undefined && !validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be todo, in-progress or done",
        });
    }

    const task = tasksService.getTask(taskId);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    if (value !== undefined) {
        const existingTask = tasksService.getTaskByValue(value);

        if (existingTask && existingTask.id !== taskId) {
            return res.status(409).json({
                success: false,
                message: "Task already exists",
            });
        }
    }

    const updatedTask = tasksService.updateTask(taskId, value, status);

    return res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
    });
}