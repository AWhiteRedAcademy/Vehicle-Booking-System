import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  Shell,
  Sidebar,
  Brand,
  LogoBox,
  BrandText,
  RoleBadge,
  Nav,
  NavLinkItem,
  NavIcon,
  NavText,
  SidebarFooter,
  Main,
  Topbar,
  PageHeading,
  PageTitle,
  PageSubtitle,
  TopActions,
  IconButton,
  UserMenuWrapper,
  UserMenuButton,
  UserDropdown,
  UserDropdownHeader,
  UserDropdownName,
  UserDropdownRole,
  UserDropdownDivider,
  UserDropdownItem,
  LogoutNavButton,
  Content,
} from "./DashboardLayout.styles";

function DashboardLayout({
  children,
  title,
  subtitle,
  roleLabel = "Owner Console",
  userLabel = "Owner",
  navItems = [],
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsUserMenuOpen(false);
    navigate("/login");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Shell>
      <Sidebar>
        <Brand>
          <LogoBox>
            <DirectionsCarIcon fontSize="small" />
          </LogoBox>
          <BrandText>FleetPro</BrandText>
        </Brand>

        <RoleBadge>{roleLabel}</RoleBadge>

        <Nav>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <NavLinkItem key={item.label} to={item.to} $active={isActive}>
                <NavIcon>{item.icon}</NavIcon>
                <NavText>{item.label}</NavText>
              </NavLinkItem>
            );
          })}
        </Nav>

        <SidebarFooter>
          <NavLinkItem to="#">
            <NavIcon>
              <SupportAgentIcon fontSize="small" />
            </NavIcon>
            <NavText>Support</NavText>
          </NavLinkItem>

          <LogoutNavButton type="button" onClick={handleLogout}>
            <NavIcon>
              <LogoutIcon fontSize="small" />
            </NavIcon>
            <NavText>Sign Out</NavText>
          </LogoutNavButton>
        </SidebarFooter>
      </Sidebar>

      <Main>
        <Topbar>
          <PageHeading>
            <PageTitle>{title}</PageTitle>
            {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
          </PageHeading>

          <TopActions>
            <IconButton type="button" aria-label="Notifications">
              <NotificationsNoneIcon fontSize="small" />
            </IconButton>

            <UserMenuWrapper ref={menuRef}>
              <UserMenuButton
                type="button"
                onClick={() => setIsUserMenuOpen((currentValue) => !currentValue)}
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
              >
                <AccountCircleIcon fontSize="small" />
                {userLabel}
                <KeyboardArrowDownIcon fontSize="small" />
              </UserMenuButton>

              {isUserMenuOpen && (
                <UserDropdown role="menu">
                  <UserDropdownHeader>
                    <UserDropdownName>{userLabel}</UserDropdownName>
                    <UserDropdownRole>{roleLabel}</UserDropdownRole>
                  </UserDropdownHeader>

                  <UserDropdownDivider />

                  <UserDropdownItem type="button" onClick={handleLogout} role="menuitem">
                    <LogoutIcon fontSize="small" />
                    Logout
                  </UserDropdownItem>
                </UserDropdown>
              )}
            </UserMenuWrapper>
          </TopActions>
        </Topbar>

        <Content>{children}</Content>
      </Main>
    </Shell>
  );
}

export default DashboardLayout;
