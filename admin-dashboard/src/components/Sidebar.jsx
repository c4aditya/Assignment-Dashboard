import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white h-screen">
            <div className="p-4 text-lg font-bold">Admin Dashboard</div>
            <nav>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "block p-4 bg-gray-700" : "block p-4 hover:bg-gray-700"
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/users"
                    className={({ isActive }) =>
                        isActive ? "block p-4 bg-gray-700" : "block p-4 hover:bg-gray-700"
                    }
                >
                    User Management
                </NavLink>
                <NavLink
                    to="/roles"
                    className={({ isActive }) =>
                        isActive ? "block p-4 bg-gray-700" : "block p-4 hover:bg-gray-700"
                    }
                >
                    Role Management
                </NavLink>
                <NavLink
                    to="/permissions"
                    className={({ isActive }) =>
                        isActive ? "block p-4 bg-gray-700" : "block p-4 hover:bg-gray-700"
                    }
                >
                    Permission Management
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
