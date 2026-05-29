import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/cards/StatCard";

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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditUserModal from "../../components/modals/EditUserModal/  EditUserModal";

import {
  getMockUsers,
  getUserRole,
  getUserStatus,
  getMockUserById,
  updateMockUser,
  deleteMockUser,
} from "../../data/mockUser";

const adminNavItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: <GridViewIcon fontSize="small" />,
  },

  // {
  //   label: "Users",
  //   to: "/admin/users",
  //   icon: <PeopleAltIcon fontSize="small" />,
  // },
  {
    label: "Analytics",
    to: "/admin/analytics",
    icon: <BarChartIcon fontSize="small" />,
  },
];

const mockUsers = [
  {
    userId: 1,
    name: "Thaqib Ubayd",
    email: "Thaqib@Owner.com",
    role: "Owner",
    status: "",
    lastLogin: "24 mins ago",
  },
  {
    userId: 2,
    name: "Aids",
    email: "aids@Owner.com",
    role: "Owner",
    status: "",
    lastLogin: "2 hours ago",
  },
  {
    userId: 3,
    name: "Lisa ",
    email: "Mvu@Company.com",
    role: "",
    status: "",
    lastLogin: "8 days ago",
  },
];

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const navigate = useNavigate();
  const [users, setUsers] = useState(getMockUsers());
  const [editingUser, setEditingUser] = useState(null);

  // const filteredUsers = useMemo(() => {
  //   return mockUsers.filter((user) => {
  //     const searchValue = searchTerm.toLowerCase().trim();

  //     const matchesSearch =
  //       searchValue === "" ||
  //       user.name.toLowerCase().includes(searchValue) ||
  //       user.email.toLowerCase().includes(searchValue) ||
  //       user.role.toLowerCase().includes(searchValue) ||
  //       user.status.toLowerCase().includes(searchValue) ||
  //       user.userId.toString().includes(searchValue);

  //     const matchesRole = roleFilter === "all" || user.role === roleFilter;

  //     const matchesStatus =
  //       statusFilter === "all" || user.role === statusFilter;

  //     return matchesSearch && matchesRole && matchesStatus;
  //   });
  // }, [searchTerm, roleFilter, statusFilter]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = searchTerm.toLowerCase().trim();

      const displayRole = getUserRole(user);
      const displayStatus = getUserStatus(user);

      const matchesSearch =
        searchValue === "" ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        displayRole.toLowerCase().includes(searchValue) ||
        displayStatus.toLowerCase().includes(searchValue) ||
        user.userId.toString().includes(searchValue);

      const matchesRole = roleFilter === "all" || displayRole === roleFilter;

      const matchesStatus =
        statusFilter === "all" || displayStatus === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  //   const ActiveUsers = mockUsers.filter(
  //   (user) => !user.role === "Guest")
  //   .fill((users) => user.status === "Active");

  const pendingUsers = users.filter(
    (user) => getUserStatus(user) === "Pending",
  ).length;

  // const pendingUsers = mockUsers.filter(
  //   (user) => user.role === "Guest")
  //   .fill((users) => user.status === "Pending");

  const companyUsers = users.filter((user) => user.role === "Company").length;

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

  const ownerUsers = users.filter((user) => user.role === "Owner").length;

  const activeUsers = users.filter(
    (user) => getUserStatus(user) === "Active",
  ).length;

  function handleEditUser(user) {
    setEditingUser(user);
  }

  function handleSaveEditedUser(updatedUser) {
    const updatedUsers = updateMockUser(updatedUser);

    setUsers(updatedUsers);
    setEditingUser(null);
  }

  function handleDeleteUser(user) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`,
    );

    if (!confirmed) {
      return;
    }

    const updatedUsers = deleteMockUser(user.userId);
    setUsers(updatedUsers);
  }

  function handleViewUserDetails(user) {
    navigate(`/admin/users/${user.userId}`);
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
          helperText="+12% this month"
          tone="green"
          icon={<BusinessIcon fontSize="small" />}
        />

        <StatCard
          label="Owner Users"
          value={ownerUsers}
          helperText="Verified active"
          tone="blue"
          icon={<CheckCircleIcon fontSize="small" />}
        />

        <StatCard
          label="Total Users"
          value={mockUsers.length}
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
              placeholder="Search by name, email, role, status, or ID..."
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
              <option value="Guest">Guest</option>
            </FilterSelect>

            <FilterSelect
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </FilterSelect>

            <FilterButton type="button">
              <TuneIcon fontSize="small" />
            </FilterButton>
          </FilterGroup>
        </UsersToolbar>

        {filteredUsers.length === 0 ? (
          <EmptyCard>No users found.</EmptyCard>
        ) : (
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
                {filteredUsers.map((user) => (
                  <tr key={user.userId}>
                    <td>
                      <UserInfo>
                        <AvatarCircle>{user.name.charAt(0)}</AvatarCircle>

                        <div>
                          <UserName>{user.name}</UserName>
                          <UserEmail>{user.email}</UserEmail>
                        </div>
                      </UserInfo>
                    </td>

                    <td>
                      <RoleText>{getUserRole(user)}</RoleText>
                    </td>

                    <td>
                      <StatusBadge $status={getUserStatus(user)}>
                        {getUserStatus(user)}
                      </StatusBadge>
                    </td>

                    <td>{user.lastLogin}</td>

                    <td>
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
                ))}
              </tbody>
            </UsersTable>

            <TableFooter>
              <FooterText>
                Showing {filteredUsers.length} of {users.length} users
              </FooterText>

              <PaginationActions>
                <PaginationButton type="button" disabled>
                  Previous
                </PaginationButton>

                <PaginationButton type="button">Next</PaginationButton>
              </PaginationActions>
            </TableFooter>
          </>
        )}
      </UsersPanel>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveEditedUser}
        />
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;
