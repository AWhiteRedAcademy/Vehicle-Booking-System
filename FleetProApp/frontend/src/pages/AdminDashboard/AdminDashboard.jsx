import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/cards/StatCard";
import EditUserModal from "../../components/modals/EditUserModal/EditUserModal";

import {
  HeaderRow,
  SectionTitle,
  SectionText,
  AddButton,
  StatsGrid,
  EmptyCard,
} from "../../components/dashboard/DashboardPage.styles";

import {
  AdminMetaRow,
  MetaItem,
  UsersPanel,
  UsersToolbar,
  SearchBox,
  SearchInput,
  FilterGroup,
  FilterSelect,
  FilterButton,
  UsersTable,
  UserInfo,
  AvatarCircle,
  UserName,
  UserEmail,
  StatusBadge,
  ActionButtons,
  ViewDetailsButton,
  EditUserButton,
  DeleteUserButton,
  RoleText,
  TableFooter,
  FooterText,
  PaginationActions,
  PaginationButton,
} from "./AdminDashboard.style";

import {
  getUsers,
  updateUser,
  deleteUser,
} from "../../HTTPS Services/AdminServices";

const adminNavItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: <GridViewIcon fontSize="small" />,
  },
  {
    label: "Analytics",
    to: "/admin/analytics",
    icon: <BarChartIcon fontSize="small" />,
  },
];

const pageSize = 8;

function getUserRole(user) {
  const role = user.role?.trim();

  if (!role || role === "Guest") {
    return "Guest";
  }

  return role;
}

function getUserStatus(user) {
  const role = user.role?.trim();

  if (!role || role === "Guest") {
    return "Pending";
  }

  return "Active";
}

function AdminDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let ignore = false;

   const loadUsers = async () => {
   try {
    setIsLoading(true);
    setError("");

    const data = await getUsers();

    console.log("USERS FROM API:");
    console.log(data);

    setUsers(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error loading users:", err);

    setError(err.message || "Failed to load users.");
    setUsers([]);
  } finally {
    setIsLoading(false);
  }
};

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = searchTerm.toLowerCase().trim();

      const displayRole = getUserRole(user);
      const displayStatus = getUserStatus(user);

      const name = user.name?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const phoneNumber = user.phoneNumber?.toLowerCase() || "";
      const userId = user.userId?.toString() || "";

      const matchesSearch =
        searchValue === "" ||
        name.includes(searchValue) ||
        email.includes(searchValue) ||
        phoneNumber.includes(searchValue) ||
        displayRole.toLowerCase().includes(searchValue) ||
        displayStatus.toLowerCase().includes(searchValue) ||
        userId.includes(searchValue);

      const matchesRole = roleFilter === "all" || displayRole === roleFilter;

      const matchesStatus =
        statusFilter === "all" || displayStatus === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const pendingUsers = users.filter(
    (user) => getUserStatus(user) === "Pending",
  ).length;

  const companyUsers = users.filter(
    (user) => getUserRole(user) === "Company",
  ).length;

  const ownerUsers = users.filter(
    (user) => getUserRole(user) === "Owner",
  ).length;

  const activeUsers = users.filter(
    (user) => getUserStatus(user) === "Active",
  ).length;

  function handleEditUser(user) {
    setEditingUser(user);
  }

  async function handleSaveEditedUser(updatedUser) {
    try {
      setIsSaving(true);
      setError("");

      await updateUser(updatedUser.userId, updatedUser);

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.userId === updatedUser.userId
            ? {
                ...user,
                ...updatedUser,
                role: updatedUser.role || "Guest",
              }
            : user,
        ),
      );

      setEditingUser(null);
    } catch (err) {
      setError(err.message || "Unable to update user.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteUser(user) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteUser(user.userId);

      setUsers((currentUsers) =>
        currentUsers.filter(
          (currentUser) => currentUser.userId !== user.userId,
        ),
      );
    } catch (err) {
      setError(err.message || "Unable to delete user.");
    }
  }

  function handleViewUserDetails(user) {
    navigate(`/admin/users/${user.userId}`);
  }

  function handleClearFilters() {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
  }

  function handlePreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  function handleNextPage() {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }

  if (isLoading) {
    return (
      <DashboardLayout
        title="User Management"
        subtitle="Loading users..."
        roleLabel="Admin Console"
        userLabel="Admin"
        navItems={adminNavItems}
      >
        <EmptyCard>Loading users...</EmptyCard>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="User Management"
      subtitle="Manage users, roles, and access permissions."
      roleLabel="Admin Console"
      userLabel="Admin"
      navItems={adminNavItems}
    >
      <HeaderRow>
        <div>
          <SectionTitle>User Management</SectionTitle>

          <AdminMetaRow>
            <MetaItem $color="blue">{users.length} Total Users</MetaItem>
            <MetaItem $color="green">{activeUsers} Active Users</MetaItem>
            <MetaItem $color="orange">{pendingUsers} Pending Users</MetaItem>
          </AdminMetaRow>

          <SectionText>
            Search, filter, and manage platform users across companies and
            owners.
          </SectionText>
        </div>

        <AddButton type="button" onClick={() => navigate("/admin/users/add")}>
          <PersonAddAltIcon fontSize="small" />
          Add New User
        </AddButton>
      </HeaderRow>

      <StatsGrid>
        <StatCard
          label="Company Users"
          value={companyUsers}
          helperText="Company accounts"
          tone="green"
          icon={<BusinessIcon fontSize="small" />}
        />

        <StatCard
          label="Owner Users"
          value={ownerUsers}
          helperText="Vehicle owner accounts"
          tone="blue"
          icon={<CheckCircleIcon fontSize="small" />}
        />

        <StatCard
          label="Total Users"
          value={users.length}
          helperText="Across all roles"
          tone="blue"
          icon={<PeopleAltIcon fontSize="small" />}
        />

        <StatCard
          label="Active Users"
          value={activeUsers}
          helperText="Currently enabled"
          tone="green"
          icon={<CheckCircleIcon fontSize="small" />}
        />
      </StatsGrid>

      <UsersPanel>
        <UsersToolbar>
          <SearchBox>
            <SearchIcon fontSize="small" />
            <SearchInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, email, phone, role, status, or ID..."
            />
          </SearchBox>

          <FilterGroup>
            <FilterSelect
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="Company">Company</option>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
              <option value="Guest">Guest</option>
            </FilterSelect>

            <FilterSelect
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </FilterSelect>

            <FilterButton
              type="button"
              onClick={handleClearFilters}
              title="Clear search and filters"
            >
              <TuneIcon fontSize="small" />
            </FilterButton>
          </FilterGroup>
        </UsersToolbar>

        {error && <EmptyCard>{error}</EmptyCard>}

        {!error && filteredUsers.length === 0 ? (
          <EmptyCard>No users found.</EmptyCard>
        ) : (
          !error && (
            <>
              <UsersTable>
                <thead>
                  <tr>
                    <th>User Information</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedUsers.map((user) => {
                    const displayRole = getUserRole(user);
                    const displayStatus = getUserStatus(user);

                    return (
                      <tr key={user.userId}>
                        <td data-label="User Information">
                          <UserInfo>
                            <AvatarCircle>{user.name.charAt(0)}</AvatarCircle>

                            <div>
                              <UserName>{user.name}</UserName>
                              <UserEmail>{user.email}</UserEmail>
                            </div>
                          </UserInfo>
                        </td>

                        <td data-label="Role">
                          <RoleText>{getUserRole(user)}</RoleText>
                        </td>

                        <td data-label="Status">
                          <StatusBadge $status={getUserStatus(user)}>
                            {getUserStatus(user)}
                          </StatusBadge>
                        </td>

                        <td data-label="Last Login">{user.lastLogin}</td>

                        <td data-label="Actions">
                          <ActionButtons>
                            <ViewDetailsButton
                              type="button"
                              onClick={() => handleViewUserDetails(user)}
                            >
                              <VisibilityIcon fontSize="small" />
                              View
                            </ViewDetailsButton>

                            <EditUserButton
                              type="button"
                              onClick={() => handleEditUser(user)}
                            >
                              <EditIcon fontSize="small" />
                              Edit
                            </EditUserButton>

                            <DeleteUserButton
                              type="button"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <DeleteIcon fontSize="small" />
                              Delete
                            </DeleteUserButton>
                          </ActionButtons>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </UsersTable>

              <TableFooter>
                <FooterText>
                  Showing {filteredUsers.length === 0 ? 0 : startIndex + 1}
                  {" - "}
                  {Math.min(endIndex, filteredUsers.length)}
                  {" of "}
                  {filteredUsers.length}
                  {" users"}
                </FooterText>

                <PaginationActions>
                  <PaginationButton
                    type="button"
                    disabled={safeCurrentPage === 1}
                    onClick={handlePreviousPage}
                  >
                    Previous
                  </PaginationButton>

                  <PaginationButton
                    type="button"
                    disabled={safeCurrentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Next
                  </PaginationButton>
                </PaginationActions>
              </TableFooter>
            </>
          )
        )}
      </UsersPanel>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveEditedUser}
          isSaving={isSaving}
        />
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;
