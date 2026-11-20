import type { Request, Response } from "express";
import * as tasksService from "../services/tasks.service.js";

const validStatuses = ["todo", "in-progress", "done"];

export const getAllTasks = (_req: Request, res: Response) => {
    const tasks = tasksService.getAllTasks();

    console.log('Controller called');

    return res.status(200).json({
        success: true,
        data: tasks,
    });
};

export const createTask = (req: Request, res: Response) => {
    const { value } = req.body ?? {};

    if (!value.trim()) {
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

    const task = tasksService.updateTask(taskId, value, status);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: task,
    });
}

export const getTasksByStatus = (req: Request<{}, {}, {}, { status?: string }>, res: Response) => {
    const { status } = req.query;

    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be todo, in-progress or done",
        });
    }

    const tasks = tasksService.getTasksByStatus(status);

    return res.status(200).json({
        success: true,
        data: tasks,
    });
}