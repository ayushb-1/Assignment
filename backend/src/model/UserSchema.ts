// src/models/user.schema.ts
import mongoose, { Schema, Document } from 'mongoose';

// Interface for User document
export interface IUser extends Document {
    username: string;
    age: number;
    hobbies: string[];
    createdAt: Date;
    updatedAt: Date;
}

// User Schema definition
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age cannot be negative'],
        max: [150, 'Age cannot exceed 150']
    },
    hobbies: {
        type: [String],
        default: [],
    }
}, {
    timestamps: true,
    versionKey: false
});

// Create and export the model
const User = mongoose.model<IUser>('User', userSchema);

export default User;