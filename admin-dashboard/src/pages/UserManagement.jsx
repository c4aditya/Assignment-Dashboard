import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, addUser, editUser } from "../services/api";
import UserTable from "../components/UserTable";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [newUser, setNewUser] = useState({
        name: "",
        role: [],
        status: "",
    });

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    const handleDelete = (id) => {
        deleteUser(id).then(() => {
            setUsers(users.filter((user) => user.id !== id));
        });
    };

    const handleAddUser = () => {
        if (newUser.name && newUser.role.length > 1 && newUser.status) {
            addUser(newUser).then((newUserData) => {
                setUsers([...users, newUserData]);
                setShowModal(false); // Close modal after adding
                setNewUser({ name: "", role: [], status: "" }); // Reset form
            });
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleRoleChange = (permission) => {
        setNewUser((prevUser) => ({
            ...prevUser,
            role: prevUser.role.includes(permission)
                ? prevUser.role.filter((r) => r !== permission)
                : [...prevUser.role, permission],
        }));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Add User
            </button>
            <UserTable users={users} onDelete={handleDelete} onEdit={editUser} />

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={newUser.name}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, name: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Role Permissions</label>
                            <div className="flex gap-2">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={newUser.role.includes("Read")}
                                        onChange={() => handleRoleChange("Read")}
                                        className="mr-2"
                                    />
                                    Read
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={newUser.role.includes("Write")}
                                        onChange={() => handleRoleChange("Write")}
                                        className="mr-2"
                                    />
                                    Write
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={newUser.role.includes("Delete")}
                                        onChange={() => handleRoleChange("Delete")}
                                        className="mr-2"
                                    />
                                    Delete
                                </label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Status</label>
                            <select
                                value={newUser.status}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, status: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value="">Select status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddUser}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
