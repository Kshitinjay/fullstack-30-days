import { Router } from "express";
import { getAllTasks, createTask, deleteTask, getTaskById, updateTask} from "../controllers/tasks.controller";

const router = Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:taskId', getTaskById);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;