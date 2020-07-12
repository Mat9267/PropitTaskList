import Task from '../models/task';

export default class TaskService {

    async createTask(taskDescription, creationDate) {
        if (!taskDescription || !creationDate) {
            throw new Error('Missing one or more parameters');
        }
        else {
            const newTask = await Task.create({
                taskDescription: taskDescription,
                creationDate: creationDate,
            });
            if (!newTask) {
                throw new Error('Error creating task');
            } else {
                return { newTask };
            }
        }
    }

    async getTasks() {
        const tasks = await Task.find({});
        if (!tasks) {
            throw new Error('Error getting tasks');
        } else {
            return { tasks };
        }

    }

    async updateTask(taskId, payload) {
        if (!taskId) {
            throw new Error('Missing one or more parameters');
        }
        else {
            const updatedTask = await Task.findOneAndUpdate(
                { _id: taskId },
                { $set: { completed: payload.completed } },
                { new: true });
            if (!updatedTask) {
                throw new Error('Error updating task with id: ' + taskId);
            }
            else {
                return { updatedTask };
            }
        }
    }

    async deleteTask(taskId) {
        if (!taskId) {
            throw new Error('Missing one or more parameters');
        }
        else {
            const deletedTask = await Task.findOneAndDelete({ _id: taskId });
            if (!deletedTask) {
                throw new Error('Error deleting task with id: ' + taskId);
            }
            else {
                return { deletedTask };
            }
        }
    }
}