import { Request, Response } from 'express';
import User from '../model/UserSchema';
// Custom error handler function
const handleError = (error: any, res: Response) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({ 
            success: false, 
            message: 'Validation Error', 
            errors: error.errors 
        });
    }
    if (error.name === 'CastError') {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid ID format' 
        });
    }
    console.error('Error:', error);
    return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
};

// Get all users
export const getUsers = async (_: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select('-__v');
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        handleError(error, res);
    }
};


// Create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.create(req.body);
        
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        handleError(error, res);
    }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            {
                new: true, 
                runValidators: true,
                context: 'query'
            }
        ).select('-__v');

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        handleError(error, res);
    }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        handleError(error, res);
    }
};

