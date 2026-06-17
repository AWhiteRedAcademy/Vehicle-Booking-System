import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../HTTPS Services/NotificationServices.js";

import {
  Shell,
  Sidebar,
  SidebarToggleButton,
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
MobileBrand,
DesktopOnly,
UserLabelText,
MobileBottomNav,
MobileNavLink,
NotificationWrapper,
NotificationBadge,
NotificationDropdown,
NotificationHeader,
NotificationTitle,
NotificationActionButton,
NotificationList,
NotificationItem,
NotificationItemTitle,
NotificationItemText,
NotificationDate,
NotificationEmpty,
NotificationError,
} from "./DashboardLayout.styles";

function DashboardLayout({
  children,
  title,
  subtitle,
  roleLabel = "Owner Console",
  userLabel = "Owner",
  navItems = [],
}) {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const notificationRef = useRef(null);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notificationError, setNotificationError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function handleLogout() {
    localStorage.removeItem("accessToken");
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

      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  function handleToggleTheme() {
    setThemeMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
  }

  async function loadNotificationCount() {
    try {
      const count = await getUnreadNotificationCount();
      setUnreadCount(count);
    } catch (err) {
      console.error("Notification count error:", err);
    }
  }

  async function loadNotifications() {
    try {
      setNotificationLoading(true);
      setNotificationError("");
      const data = await getNotifications(25);
      setNotifications(data);
      setUnreadCount(data.filter((notification) => !notification.isRead).length);
    } catch (err) {
      console.error("Notification fetch error:", err);
      setNotificationError(err.message || "Unable to load notifications.");
    } finally {
      setNotificationLoading(false);
    }
  }

  useEffect(() => {
    loadNotificationCount();

    const intervalId = window.setInterval(() => {
      loadNotificationCount();
    }, 30000);

    return () => window.clearInterval(intervalId);
  }, []);

  async function handleToggleNotifications() {
    const shouldOpen = !isNotificationsOpen;
    setIsNotificationsOpen(shouldOpen);
    setIsUserMenuOpen(false);

    if (shouldOpen) {
      await loadNotifications();
    }
  }

  async function handleMarkAsRead(notification) {
    if (!notification || notification.isRead) {
      return;
    }

    try {
      await markNotificationAsRead(notification.notificationId);
      setNotifications((currentNotifications) =>
        currentNotifications.map((currentNotification) =>
          currentNotification.notificationId === notification.notificationId
            ? { ...currentNotification, isRead: true }
            : currentNotification
        )
      );
      setUnreadCount((currentCount) => Math.max(currentCount - 1, 0));
    } catch (err) {
      console.error("Mark notification as read error:", err);
      setNotificationError(err.message || "Unable to update notification.");
    }
  }

  async function handleMarkAllAsRead() {
    try {
      await markAllNotificationsAsRead();
      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => ({ ...notification, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error("Mark all notifications as read error:", err);
      setNotificationError(err.message || "Unable to update notifications.");
    }
  }

  function formatNotificationDate(value) {
    if (!value) {
      return "";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }


  return (
    <Shell>
      <Sidebar $isSidebarOpen={isSidebarOpen}>
        <Brand>
          <LogoBox>
            <DirectionsCarIcon fontSize="small" />
          </LogoBox>

          {isSidebarOpen && <BrandText>CarGo</BrandText>}
        </Brand>

        {isSidebarOpen && <RoleBadge>{roleLabel}</RoleBadge>}

        <Nav>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <NavLinkItem key={item.label} to={item.to} $active={isActive}>
                <NavIcon>{item.icon}</NavIcon>
                {isSidebarOpen && <NavText>{item.label}</NavText>}
              </NavLinkItem>
            );
          })}
        </Nav>

        <SidebarFooter>
          <NavLinkItem to="#">
            <NavIcon>
              <SupportAgentIcon fontSize="small" />
            </NavIcon>

            {isSidebarOpen && <NavText>Support</NavText>}
          </NavLinkItem>

          <LogoutNavButton type="button" onClick={handleLogout}>
            <NavIcon>
              <LogoutIcon fontSize="small" />
            </NavIcon>

            {isSidebarOpen && <NavText>Sign Out</NavText>}
          </LogoutNavButton>
        </SidebarFooter>
      </Sidebar>

      <Main>
        {/* <Topbar>
          <SidebarToggleButton
            type="button"
            onClick={() => setIsSidebarOpen((currentValue) => !currentValue)}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <MenuOpenIcon fontSize="small" />
            ) : (
              <MenuIcon fontSize="small" />
            )}
          </SidebarToggleButton>
 
          <PageHeading>
            <PageTitle>{title}</PageTitle>
            {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
          </PageHeading>
 
          <TopActions>
            <IconButton
              type="button"
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
            >
              {themeMode === "light" ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <LightModeIcon fontSize="small" />
              )}
            </IconButton>
 
            <NotificationWrapper ref={notificationRef}>
              <IconButton
                type="button"
                aria-label="Notifications"
                onClick={handleToggleNotifications}
              >
                <NotificationsNoneIcon fontSize="small" />
                {unreadCount > 0 && (
                  <NotificationBadge>{unreadCount > 99 ? "99+" : unreadCount}</NotificationBadge>
                )}
              </IconButton>

              {isNotificationsOpen && (
                <NotificationDropdown>
                  <NotificationHeader>
                    <NotificationTitle>Notifications</NotificationTitle>

                    {unreadCount > 0 && (
                      <NotificationActionButton type="button" onClick={handleMarkAllAsRead}>
                        Mark all read
                      </NotificationActionButton>
                    )}
                  </NotificationHeader>

                  {notificationError && (
                    <NotificationError>{notificationError}</NotificationError>
                  )}

                  {notificationLoading && (
                    <NotificationEmpty>Loading notifications...</NotificationEmpty>
                  )}

                  {!notificationLoading && notifications.length === 0 && (
                    <NotificationEmpty>No notifications yet.</NotificationEmpty>
                  )}

                  {!notificationLoading && notifications.length > 0 && (
                    <NotificationList>
                      {notifications.map((notification) => (
                        <NotificationItem
                          key={notification.notificationId}
                          type="button"
                          $isRead={notification.isRead}
                          onClick={() => handleMarkAsRead(notification)}
                        >
                          <NotificationItemTitle>{notification.title}</NotificationItemTitle>
                          <NotificationItemText>{notification.message}</NotificationItemText>
                          <NotificationDate>{formatNotificationDate(notification.createdAtUtc)}</NotificationDate>
                        </NotificationItem>
                      ))}
                    </NotificationList>
                  )}
                </NotificationDropdown>
              )}
            </NotificationWrapper>
 
            <UserMenuWrapper ref={menuRef}>
              <UserMenuButton
                type="button"
                onClick={() =>
                  setIsUserMenuOpen((currentValue) => !currentValue)
                }
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
 
                  <UserDropdownItem
                    type="button"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    <LogoutIcon fontSize="small" />
                    Logout
                  </UserDropdownItem>
                </UserDropdown>
              )}
            </UserMenuWrapper>
          </TopActions>
        </Topbar> */}

        <Topbar>
          <MobileBrand>
            <LogoBox>
              <DirectionsCarIcon fontSize="small" />
            </LogoBox>
            <BrandText>FleetManager</BrandText>
          </MobileBrand>

          <DesktopOnly>
            <SidebarToggleButton
              type="button"
              onClick={() => setIsSidebarOpen((currentValue) => !currentValue)}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? (
                <MenuOpenIcon fontSize="small" />
              ) : (
                <MenuIcon fontSize="small" />
              )}
            </SidebarToggleButton>

            <PageHeading>
              <PageTitle>{title}</PageTitle>
              {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
            </PageHeading>
          </DesktopOnly>

          <TopActions>
            <IconButton
              type="button"
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
            >
              {themeMode === "light" ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <LightModeIcon fontSize="small" />
              )}
            </IconButton>

            <NotificationWrapper ref={notificationRef}>
              <IconButton
                type="button"
                aria-label="Notifications"
                onClick={handleToggleNotifications}
              >
                <NotificationsNoneIcon fontSize="small" />
                {unreadCount > 0 && (
                  <NotificationBadge>{unreadCount > 99 ? "99+" : unreadCount}</NotificationBadge>
                )}
              </IconButton>

              {isNotificationsOpen && (
                <NotificationDropdown>
                  <NotificationHeader>
                    <NotificationTitle>Notifications</NotificationTitle>

                    {unreadCount > 0 && (
                      <NotificationActionButton type="button" onClick={handleMarkAllAsRead}>
                        Mark all read
                      </NotificationActionButton>
                    )}
                  </NotificationHeader>

                  {notificationError && (
                    <NotificationError>{notificationError}</NotificationError>
                  )}

                  {notificationLoading && (
                    <NotificationEmpty>Loading notifications...</NotificationEmpty>
                  )}

                  {!notificationLoading && notifications.length === 0 && (
                    <NotificationEmpty>No notifications yet.</NotificationEmpty>
                  )}

                  {!notificationLoading && notifications.length > 0 && (
                    <NotificationList>
                      {notifications.map((notification) => (
                        <NotificationItem
                          key={notification.notificationId}
                          type="button"
                          $isRead={notification.isRead}
                          onClick={() => handleMarkAsRead(notification)}
                        >
                          <NotificationItemTitle>{notification.title}</NotificationItemTitle>
                          <NotificationItemText>{notification.message}</NotificationItemText>
                          <NotificationDate>{formatNotificationDate(notification.createdAtUtc)}</NotificationDate>
                        </NotificationItem>
                      ))}
                    </NotificationList>
                  )}
                </NotificationDropdown>
              )}
            </NotificationWrapper>

            <UserMenuWrapper ref={menuRef}>
              <UserMenuButton
                type="button"
                onClick={() =>
                  setIsUserMenuOpen((currentValue) => !currentValue)
                }
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
              >
                <AccountCircleIcon fontSize="small" />

                <UserLabelText>{userLabel}</UserLabelText>

                <KeyboardArrowDownIcon fontSize="small" />
              </UserMenuButton>

              {isUserMenuOpen && (
                <UserDropdown role="menu">
                  <UserDropdownHeader>
                    <UserDropdownName>{userLabel}</UserDropdownName>
                    <UserDropdownRole>{roleLabel}</UserDropdownRole>
                  </UserDropdownHeader>

                  <UserDropdownDivider />

                  <UserDropdownItem
                    type="button"
                    onClick={handleLogout}
                    role="menuitem"
                  >
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

      <MobileBottomNav>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <MobileNavLink key={item.label} to={item.to} $active={isActive}>
              {item.icon}
              <span>{item.label}</span>
            </MobileNavLink>
          );
        })}
      </MobileBottomNav>
    </Shell>
  );
}

export default DashboardLayout;
