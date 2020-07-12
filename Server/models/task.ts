import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        taskDescription: {
            type: String,
            required: true,
        },
        creationDate: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true,
            default: false
        }
    },
);

export default mongoose.model('Task', taskSchema);