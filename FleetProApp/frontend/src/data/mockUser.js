const STORAGE_KEY = "fleetpro_mock_users";

export const defaultMockUsers = [
  {
    userId: 1,
    name: "Thaqib Ubayd",
    email: "Thaqib@Owner.com",
    phoneNumber: "0711111111",
    password: "Password123",
    role: "Owner",
    lastLogin: "24 mins ago",
  },
  {
    userId: 2,
    name: "Aids",
    email: "aids@Owner.com",
    phoneNumber: "0722222222",
    password: "Password123",
    role: "Owner",
    lastLogin: "2 hours ago",
  },
  {
    userId: 3,
    name: "Lisa",
    email: "Mvu@Company.com",
    phoneNumber: "0733333333",
    password: "Password123",
    role: "",
    lastLogin: "Never",
  },
];

export function getMockUsers() {
  const storedUsers = localStorage.getItem(STORAGE_KEY);

  if (!storedUsers) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMockUsers));
    return defaultMockUsers;
  }

  return JSON.parse(storedUsers);
}

export function addMockUser(newUser) {
  const users = getMockUsers();

  const nextUserId =
    users.length === 0
      ? 1
      : Math.max(...users.map((user) => user.userId)) + 1;

  const userToAdd = {
    userId: nextUserId,
    name: newUser.name,
    email: newUser.email,
    phoneNumber: newUser.phoneNumber,
    password: newUser.password,
    role: newUser.role,
    lastLogin: "Never",
  };

  const updatedUsers = [...users, userToAdd];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

  return updatedUsers;
}

export function getUserRole(user) {
  const role = user.role?.trim();

  if (!role || role === "Guest") {
    return "Unassigned";
  }

  return role;
}

export function getUserStatus(user) {
  const role = user.role?.trim();

  if (!role || role === "Guest") {
    return "Pending";
  }

  return "Active";
}
export function getMockUserById(userId) {
  const users = getMockUsers();

  return users.find((user) => user.userId === Number(userId));
}

export function updateMockUser(updatedUser) {
  const users = getMockUsers();

  const updatedUsers = users.map((user) =>
    user.userId === Number(updatedUser.userId)
      ? updatedUser
      : user
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

  return updatedUsers;
}

export function deleteMockUser(userId) {
  const users = getMockUsers();

  const updatedUsers = users.filter(
    (user) => user.userId !== Number(userId)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

  return updatedUsers;
}