import { useMemo, useState } from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
  RoleText,
  TableFooter,
  FooterText,
  PaginationActions,
  PaginationButton,
} from "./AdminDashboard.style";

const adminNavItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: <GridViewIcon fontSize="small" />,
  },

  {
    label: "Users",
    to: "/admin/users",
    icon: <PeopleAltIcon fontSize="small" />,
  },
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
    return mockUsers.filter((user) => {
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
  }, [searchTerm, roleFilter, statusFilter]);

  //   const ActiveUsers = mockUsers.filter(
  //   (user) => !user.role === "Guest")
  //   .fill((users) => user.status === "Active");


  const pendingUsers = mockUsers.filter(
    (user) => getUserStatus(user) === "Pending",
  ).length;

  // const pendingUsers = mockUsers.filter(
  //   (user) => user.role === "Guest")
  //   .fill((users) => user.status === "Pending");

  const companyUsers = mockUsers.filter(
    (user) => user.role === "Company",
  ).length;

  function getUserRole(user) {
    const role = user.role?.trim();

    if (!role || role === "Guest") {
      return "Unassigned";
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

  const ownerUsers = mockUsers.filter((user) => user.role === "Owner").length;
  
   const activeUsers = mockUsers.filter(
    (user) => getUserStatus(user) === "Active",
  ).length;

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
            <MetaItem $color="blue">{mockUsers.length} Total Users</MetaItem>

            <MetaItem $color="green">{activeUsers} Active Users</MetaItem>
          </AdminMetaRow>

          <SectionText>
            Search, filter, and manage platform users across companies and
            owners.
          </SectionText>
        </div>

        <AddButton type="button">
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
              <option value="Driver">Guest</option>
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
                  </tr>
                ))}
              </tbody>
            </UsersTable>

            <TableFooter>
              <FooterText>
                Showing {filteredUsers.length} of {mockUsers.length} users
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
    </DashboardLayout>
  );
}

export default AdminDashboard;
