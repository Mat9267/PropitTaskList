import axios from "axios";
const API_URL = "http://localhost:3000/task/";

export default class APIService {

    async createTask(taskDescription: string, creationDate: Date) {
        const formattedDate = creationDate.getDate() + "." + (creationDate.getMonth() + 1) + "." + creationDate.getFullYear()
        const { data: res } = await axios.post(API_URL + "createTask", {
            taskDescription: taskDescription,
            creationDate: formattedDate,
        });
        return res.newTask;
    };

    async getTasks() {
        const { data: res } = await axios.get(API_URL + "getTasks");
        return res.tasks;
    };

    async updateTask(id: string, payload: object) {
        const { data: res } = await axios.put(`${API_URL + "updateTask/"}${id}`, payload);
        return res.updatedTask;
    };

    async deleteTask(id: string) {
        const { data: res } = await axios.delete(`${API_URL + "deleteTask/"}${id}`);
        return res.deletedTask;
    };
}
