import React, { useState, useEffect } from "react";
import { getRoles, addRole, editRole, deleteRole } from "../services/api"; // API functions

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState({ name: "", permissions: [] });
    const [editingRoleId, setEditingRoleId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allPermissions = ["Read", "Write", "Delete"];

    useEffect(() => {
        getRoles().then(setRoles);
    }, []);

    const openModal = (role = null) => {
        if (role) {
            setEditingRoleId(role.id);
            setNewRole({ name: role.name, permissions: role.permissions });
        } else {
            setEditingRoleId(null);
            setNewRole({ name: "", permissions: [] });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewRole({ name: "", permissions: [] });
    };

    const handleAddRole = () => {
        if (!newRole.name || newRole.permissions.length < 1) {
            alert("Please provide a role name and select at least one permission.");
            return;
        }

        if (editingRoleId !== null) {
            // Edit existing role
            editRole({ id: editingRoleId, ...newRole }).then((updatedRole) => {
                setRoles(roles.map((role) => (role.id === editingRoleId ? updatedRole : role)));
                closeModal();
            });
        } else {
            // Add new role
            addRole(newRole).then((newRole) => {
                setRoles([...roles, newRole]);
                closeModal();
            });
        }
    };

    const handleDeleteRole = (id) => {
        deleteRole(id).then(() => {
            setRoles(roles.filter((role) => role.id !== id));
        });
    };

    const togglePermission = (permission) => {
        setNewRole((prev) => {
            const permissions = prev.permissions.includes(permission)
                ? prev.permissions.filter((p) => p !== permission)
                : [...prev.permissions, permission];
            return { ...prev, permissions };
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Role Management</h1>

            <button
                onClick={() => openModal()}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Add Role
            </button>

            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Role Name</th>
                        <th className="border border-gray-200 px-4 py-2">Permissions</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {roles.map((role) => (
                        <tr key={role.id}>
                            <td className="border border-gray-200 px-4 py-2">{role.name}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                {role.permissions.join(", ")}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button
                                    onClick={() => openModal(role)}
                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteRole(role.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            {editingRoleId !== null ? "Edit Role" : "Add Role"}
                        </h2>

                        <input
                            type="text"
                            placeholder="Enter Role Name"
                            value={newRole.name}
                            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                            className="border px-4 py-2 mb-4 w-full"
                        />

                        <div className="mb-4">
                            <label className="block font-bold mb-2">Permissions:</label>
                            {allPermissions.map((permission) => (
                                <label key={permission} className="block">
                                    <input
                                        type="checkbox"
                                        checked={newRole.permissions.includes(permission)}
                                        onChange={() => togglePermission(permission)}
                                    />
                                    {permission}
                                </label>
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddRole}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                {editingRoleId !== null ? "Update Role" : "Add Role"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoleManagement;
