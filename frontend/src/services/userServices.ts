import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL as string;

export const getUsers = async () => {
    console.log(API_URL)
    const response = await axios.get(API_URL);
    console.log(API_URL)
    return response.data;
};

//create user
export const createUser = async (userData: {username: string; age: number; hobbies: string[]}) =>{
    const response = await axios.post(API_URL, userData);
    return response.data;
}

// Update an existing user
export const updateUser = async (userId: string, userData: { username?: string; age?: number; hobbies?: string[] }) => {
    const response = await axios.put(`${API_URL}/${userId}`, userData); // PUT request to /api/users/:userId
    return response.data;
};

// Delete a user
export const deleteUser = async (userId: string) => {
    await axios.delete(`${API_URL}/${userId}`); // DELETE request to /api/users/:userId
};