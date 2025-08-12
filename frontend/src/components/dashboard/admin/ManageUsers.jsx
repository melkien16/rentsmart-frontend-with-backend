import React, { useState } from "react";
import { ResponsiveGrid, StatCard, FilterBar, DataTable, Modal } from "../ui";
import { Users, Shield, UserCheck, UserX } from "lucide-react";

import { mockUsers } from "../mockAdminData";

const ManageUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [addData, setAddData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "user",
    status: "active",
    avatar: "",
  });

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const suspendedUsers = users.filter((u) => u.status === "suspended").length;
  const adminUsers = users.filter((u) => u.role === "admin").length;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleEditUser = (user) => {
    setEditData(user);
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setUsers(
      users.map((user) => (user.id === editData.id ? { ...editData } : user))
    );
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setUsers([
      ...users,
      {
        ...addData,
        id: users.length + 1,
        joinDate: new Date().toISOString().slice(0, 10),
        lastLogin: new Date().toLocaleString(),
        avatar:
          addData.avatar || `https://i.pravatar.cc/150?img=${users.length + 1}`,
      },
    ]);
    setShowAddModal(false);
    setAddData({
      name: "",
      email: "",
      phone: "",
      location: "",
      role: "user",
      status: "active",
      avatar: "",
    });
  };

  const userColumns = [
    {
      key: "name",
      label: "Name",
      render: (value, user) => (
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium text-white">{user.name}</div>
            <div className="text-sm text-gray-400">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "admin"
              ? "bg-purple-500/20 text-purple-400"
              : "bg-blue-500/20 text-blue-400"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "location", label: "Location" },
    { key: "joinDate", label: "Join Date" },
    { key: "lastLogin", label: "Last Login" },
  ];

  const filters = [
    {
      key: "role",
      value: roleFilter,
      options: [
        { value: "all", label: "All Roles" },
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" },
      ],
    },
    {
      key: "status",
      value: statusFilter,
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "suspended", label: "Suspended" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <ResponsiveGrid cols={{ sm: 2, md: 4 }} gap={6}>
        <StatCard
          title="Total Users"
          value={totalUsers}
          subtitle="Registered"
          icon={Users}
          color="emerald"
        />
        <StatCard
          title="Active Users"
          value={activeUsers}
          subtitle="Active"
          icon={UserCheck}
          color="blue"
        />
        <StatCard
          title="Admins"
          value={adminUsers}
          subtitle="Admins"
          icon={Shield}
          color="purple"
        />
        <StatCard
          title="Suspended"
          value={suspendedUsers}
          subtitle="Suspended"
          icon={UserX}
          color="red"
        />
      </ResponsiveGrid>

      {/* Filters and Actions */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={(key, value) => {
          if (key === "role") setRoleFilter(value);
          if (key === "status") setStatusFilter(value);
        }}
        showAddButton={true}
        onAddClick={() => setShowAddModal(true)}
        addButtonText="Add User"
      />

      {/* Users Table */}
      <DataTable
        data={filteredUsers}
        columns={userColumns}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        actions={["edit", "delete"]}
      />

      {/* Edit User Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit User"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                value={editData.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={editData.email || ""}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Role
              </label>
              <select
                value={editData.role || "user"}
                onChange={(e) =>
                  setEditData({ ...editData, role: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              <select
                value={editData.status || "active"}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                value={addData.name}
                onChange={(e) =>
                  setAddData({ ...addData, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={addData.email}
                onChange={(e) =>
                  setAddData({ ...addData, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={addData.phone}
                onChange={(e) =>
                  setAddData({ ...addData, phone: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Location
              </label>
              <input
                type="text"
                value={addData.location}
                onChange={(e) =>
                  setAddData({ ...addData, location: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Role
              </label>
              <select
                value={addData.role}
                onChange={(e) =>
                  setAddData({ ...addData, role: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              <select
                value={addData.status}
                onChange={(e) =>
                  setAddData({ ...addData, status: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Add User
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUsers;
