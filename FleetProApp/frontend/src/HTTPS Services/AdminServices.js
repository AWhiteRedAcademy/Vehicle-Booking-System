import { authFetch } from "./Auth.js";

function normalizeArray(data) {
  const normalizedData = typeof data === "string" ? JSON.parse(data) : data;
  return Array.isArray(normalizedData) ? normalizedData : [];
}

function normalizeUser(user) {
  const rawLastLogin = user.lastLogin ?? user.LastLogin ?? user.lastlogin;

  return {
    userId: user.userId || user.userid || user.id || 0,
    name: user.name || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || user.phone || "",
    role: user.role || "Guest",
    lastLogin: rawLastLogin
      ? new Date(rawLastLogin).toLocaleString()
      : "Never",
  };
}

function buildUserRequest(userData) {
  return {
    name: userData.name?.trim() || "",
    email: userData.email?.trim() || "",
    phoneNumber: userData.phoneNumber?.trim() || "",
    role: userData.role || "Guest",
  };
}

export const getUsers = async () => {
  const users = await authFetch("/api/User", {
    method: "GET",
  });

  return normalizeArray(users).map(normalizeUser);
};

export const getUserById = async (id) => {
  const user = await authFetch(`/api/User/${id}`, {
    method: "GET",
  });

  return normalizeUser(user);
};

export const createUserByAdmin = async (userData) => {
  return authFetch("/api/User/create", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const updateUser = async (id, userData) => {
  return authFetch(`/api/User/${id}`, {
    method: "PUT",
    body: JSON.stringify(buildUserRequest(userData)),
  });
};

export const deleteUser = async (id) => {
  return authFetch(`/api/User/${id}`, {
    method: "DELETE",
  });
};