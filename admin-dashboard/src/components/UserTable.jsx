import React from "react";

const UserTable = ({ users, onDelete, onEdit }) => {
    const handleEditClick = (user) => {
        const updatedName = prompt("Enter new name:", user.name);
        if (updatedName) {
            onEdit({ ...user, name: updatedName });
        }
    };

    return (
        <table className="w-full border">
            <thead>
                <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Role</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody class="text-center">
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="border p-2">{user.name}</td>
                        <td className="border p-2">{user.role}</td>
                        <td className="border p-2">{user.status}</td>
                        <td className="border p-2">
                            <button
                                onClick={() => onDelete(user.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleEditClick(user)}
                                className="bg-green-600 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
