import { randomUUID } from "node:crypto";
import { Task } from "../types/task.types";

const tasks: Task[] = [];

const normalize = (value: unknown): string =>
    typeof value === "string" ? value.trim().toLowerCase() : "";

export const getAllTasks = (): Task[] => {
    return [...tasks];
};

export const createTask = (value: string): Task | null => {
    const taskValue = normalize(value);

    const existingTask = tasks.find((task) => normalize(task.value) === taskValue);

    if (existingTask) {
        return null;
    }

    const newTask: Task = {
        id: randomUUID(),
        value: taskValue,
        status: 'todo',
    };

    tasks.push(newTask);

    return newTask;
}

export const deleteTask = (id: string): Task | null => {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return null;
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);

    return deletedTask;
}

export const getTask = (id: string): Task | null => {
    const task = tasks.find((task) => task.id === id);

    if(!task){
        return null;
    }
    
    return task;
}

export const getTaskByValue = (value: string): Task | null => {
    const task = tasks.find((task) => normalize(task.value) === normalize(value));

    if (!task) {
        return null;
    }

    return task;
}

export const updateTask = (id: string, value?: string, status?: string): Task | null => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return null;
    }

    if (value !== undefined) {
        task.value = normalize(value);
    }

    if (status !== undefined) {
        task.status = status;
    }

    return task;
}

export const getTasksByStatus = (status: string): Task[] => {
    return tasks.filter((task) => task.status === status);
}