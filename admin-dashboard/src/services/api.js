const users = [
  { id: 1, name: "Alice", role: "Admin", status: "Active" },
  { id: 2, name: "Bob", role: "Editor", status: "Inactive" },
];

const roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  { id: 3, name: "Viewer", permissions: ["Read"] },
];

// User Management Functions
export const getUsers = () => Promise.resolve(users);

export const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return Promise.resolve(id);
  }
  return Promise.reject(new Error("User not found"));
};

export const addUser = (user) => {
  const newUser = { id: Date.now(), ...user };
  users.push(newUser);
  return Promise.resolve(newUser);
};

export const editUser = (updatedUser) => {
  const index = users.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    return Promise.resolve(updatedUser);
  }
  return Promise.reject(new Error("User not found"));
};

// Role Management Functions
export const getRoles = () => Promise.resolve(roles);

export const addRole = (role) => {
  const newRole = { id: Date.now(), ...role };
  roles.push(newRole);
  return Promise.resolve(newRole);
};

export const editRole = (updatedRole) => {
  const index = roles.findIndex((role) => role.id === updatedRole.id);
  if (index !== -1) {
    roles[index] = updatedRole;
    return Promise.resolve(updatedRole);
  }
  return Promise.reject(new Error("Role not found"));
};

export const deleteRole = (id) => {
  const index = roles.findIndex((role) => role.id === id);
  if (index !== -1) {
    roles.splice(index, 1);
    return Promise.resolve(id);
  }
  return Promise.reject(new Error("Role not found"));
};
