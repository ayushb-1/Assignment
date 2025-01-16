import { Request,Response } from "express";

let users: Array<{id: string, username: string, age: number, hobbies: string[]}> = [];

export const getUsers = (req: Request, res: Response)=>{
    res.status(200).json(users);
};

export const createUser = (req: Request, res: Response)=>{
    const {id, username, age, hobbies} = req.body;
    const newUser = {id,username,age,hobbies};

    users.push(newUser);
    res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response)=>{
    const {userId} = req.params;
    const {username, age, hobbies} = req.body;

    const userIndex = users.findIndex(user => user.id === userId);

    if(userIndex === -1){
        return res.status(404).json({message: "user not found"});
    }
    users[userIndex] = { ...users[userIndex], username, age, hobbies};

    return res.status(200).json(users[userIndex]);
};

export const deleteUser = (req: Request, res: Response)=>{
    const {userId} = req.params;

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // Remove the user from the array
    users.splice(userIndex, 1);
    res.status(204).send();
};

