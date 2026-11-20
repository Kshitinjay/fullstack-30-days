import { Router } from "express";
import { getAllTasks, createTask, deleteTask, getTaskById, updateTask, getTasksByStatus} from "../controllers/tasks.controller";

const router = Router();

router.get('/', getAllTasks);
router.get('/filter', getTasksByStatus);
router.post('/task', createTask);
router.delete('/task/:taskId', deleteTask);
router.get('/task/:taskId', getTaskById);
router.patch('/task/:taskId', updateTask);

export default router;