import React, { useState } from 'react';
import { createUser } from '../services/userServices';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !age) {
            setError('Please fill in all fields.');
            return;
        }

        await createUser({ username, age: Number(age), hobbies: [] });
        setUsername('');
        setAge('');
        setError('');
        onClose(); // Close modal after submission
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                <h2 className="text-xl font-bold mb-4">Add New User</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border p-2 w-full mb-4"
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => {
                            // Ensure we handle the value correctly
                            const value = e.target.value;
                            // Allow empty input or convert to number
                            setAge(value === '' ? '' : Number(value));
                        }}
                        required
                        className="border p-2 w-full mb-4"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
                </form>
                <button onClick={onClose} className="mt-4 text-gray-600 hover:text-gray-800">Cancel</button>
            </div>
        </div>
    );
};

export default UserModal;
