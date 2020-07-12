import { Router } from 'express';
import TaskService from '../../services/task';
const taskRouter = Router();
const taskService = new TaskService();

taskRouter.post("/createTask", async (req, res, next) => {
    try {
        const { taskDescription, creationDate } = req.body;
        const { newTask } = await taskService.createTask(taskDescription, creationDate);
        return res.json({ newTask }).status(200);
    } catch (e) {
        return next(e);
    }
});

taskRouter.get("/getTasks", async (req, res, next) => {
    try {
        const { tasks } = await taskService.getTasks();
        return res.json({ tasks }).status(200);
    } catch (e) {
        return next(e);
    }
});

taskRouter.put("/updateTask/:taskId", async (req, res, next) => {
    try {
        const taskId = req.params.taskId;
        const payload = req.body;
        const { updatedTask } = await taskService.updateTask(taskId, payload);
        return res.json({ updatedTask }).status(200);
    } catch (e) {
        return next(e);
    }
});

taskRouter.delete("/deleteTask/:taskId", async (req, res, next) => {
    try {
        const taskId = req.params.taskId;
        const { deletedTask } = await taskService.deleteTask(taskId);
        return res.json({ deletedTask }).status(200);
    } catch (e) {
        return next(e);
    }
});
export const TaskRouter = taskRouter;
