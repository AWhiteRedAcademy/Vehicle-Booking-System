import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { theme } from "../../styles/theme";
 
// export const Shell = styled.div`
//   min-height: 100vh;
//   display: flex;
//   background: #f5f7fb;
//   color: #102a43;
// `;
 
export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${theme.colors.pageBackground};
  color: ${theme.colors.textDark};
`;
 
// export const Sidebar = styled.aside`
//   width: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "260px" : "82px")};
//   min-height: 100vh;
//   background: #ffffff;
//   border-right: 1px solid #e5eaf1;
//   padding: ${({ $isSidebarOpen }) =>
//     $isSidebarOpen ? "24px 18px" : "24px 12px"};
//   display: flex;
//   flex-direction: column;
//   transition: width 0.25s ease, padding 0.25s ease;
//   overflow: hidden;
// `;
 
// export const Sidebar = styled.aside`
//   width: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "260px" : "82px")};
//   min-height: 100vh;
//   background: ${theme.colors.sidebarBackground};
//   border-right: 1px solid ${theme.colors.border};
//   padding: ${({ $isSidebarOpen }) =>
//     $isSidebarOpen ? "24px 18px" : "24px 12px"};
//   display: flex;
//   flex-direction: column;
//   transition: width 0.25s ease, padding 0.25s ease;
//   overflow: hidden;

//   @media (max-width: 760px) {
//     display: none;
//   }
// `;

export const Sidebar = styled.aside`
  width: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "260px" : "82px")};
  min-height: 100vh;
  background: ${theme.colors.sidebarBackground};
  border-right: 1px solid ${theme.colors.border};
  padding: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? "24px 18px" : "24px 12px"};
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease, padding 0.25s ease;
  overflow: hidden;

  @media (max-width: 760px) {
    display: none;
  }
`;
 
export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
`;
 
export const LogoBox = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: #0b5ed7;
  color: #ffffff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;
 
export const BrandText = styled.h2`
  margin: 0;
 color: ${theme.colors.textDark};
  font-size: 22px;
  font-weight: 900;
  white-space: nowrap;
`;
 
export const RoleBadge = styled.div`
  margin-top: 20px;
  padding: 12px 14px;
  border-radius: 16px;
  background: #eef5ff;
  color: #0b5ed7;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
`;
 
export const Nav = styled.nav`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
 
export const NavLinkItem = styled(NavLink)`
  min-height: 44px;
  border-radius: 14px;
  padding: 0 13px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: ${({ $active }) => ($active ? "#0b5ed7" : "#64748b")};
  background: ${({ $active }) => ($active ? "#eef5ff" : "transparent")};
  font-weight: 800;
  cursor: pointer;
  border: none;
 
  &:hover {
    background: #eef5ff;
    color: #0b5ed7;
  }
`;
 
export const NavIcon = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;
 
export const NavText = styled.span`
  white-space: nowrap;
`;
 
export const SidebarFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
 
export const LogoutNavButton = styled.button`
  min-height: 44px;
  border-radius: 14px;
  padding: 0 13px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  background: transparent;
  color: #64748b;
  font-weight: 800;
  cursor: pointer;
  text-align: left;
 
  &:hover {
    background: #fff1f2;
    color: #dc2626;
  }
`;
 
export const Main = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;
 
// export const Topbar = styled.header`
//   min-height: 76px;
//   background: #ffffff;
//   border-bottom: 1px solid #e5eaf1;
//   padding: 0 32px;
//   display: flex;
//   align-items: center;
//   gap: 16px;
// `;
 
// export const Topbar = styled.header`
//   min-height: 76px;
//   background: ${theme.colors.cardBackground};
//   border-bottom: 1px solid ${theme.colors.border};
//   padding: 0 32px;
//   display: flex;
//   align-items: center;
//   gap: 16px;
 
//   @media (max-width: 760px) {
//     min-height: 68px;
//     padding: 0 20px;
//     position: sticky;
//     top: 0;
//     z-index: 20;
//   }
// `;

export const Topbar = styled.header`
  min-height: 76px;
  background: ${theme.colors.cardBackground};
  border-bottom: 1px solid ${theme.colors.border};
  padding: 0 32px;
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 760px) {
    min-height: 68px;
    padding: 0 18px;
    position: sticky;
    top: 0;
    z-index: 30;
    justify-content: space-between;
  }
`;
 
export const SidebarToggleButton = styled.button`
  width: 42px;
  height: 42px;
  border: 1px solid #e5eaf1;
  border-radius: 14px;
  background: #ffffff;
  color: #102a43;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
 
  &:hover {
    background: #f1f5f9;
  }
`;
 
export const PageHeading = styled.div`
  min-width: 0;
`;
 
export const PageTitle = styled.h1`
  margin: 0;
  color: #102a43;
  font-size: 24px;
  font-weight: 900;
`;
 
export const PageSubtitle = styled.p`
  margin: 4px 0 0;
  color: #64748b;
  font-size: 14px;
`;
 
export const TopActions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 760px) {
    margin-left: 0;
    gap: 10px;
  }
`;
 
export const IconButton = styled.button`
  width: 42px;
  height: 42px;
  border: 1px solid ${theme.colors.border};
  border-radius: 14px;
  background: ${theme.colors.cardBackground};
  color: ${theme.colors.textDark};
  display: grid;
  place-items: center;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.inputBackground};
  }

  @media (max-width: 760px) {
    width: 44px;
    height: 44px;
    border-radius: 16px;
  }
`;
 
export const UserMenuWrapper = styled.div`
  position: relative;
`;
 
export const UserMenuButton = styled.button`
  min-height: 42px;
  border: 1px solid ${theme.colors.border};
  border-radius: 14px;
  background: ${theme.colors.cardBackground};
  color: ${theme.colors.textDark};
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.inputBackground};
  }

  @media (max-width: 760px) {
    width: 58px;
    height: 44px;
    justify-content: center;
    padding: 0 10px;
  }
`;
 
export const UserDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
 background: ${theme.colors.cardBackground};
  border: 1px solid #e5eaf1;
  border-radius: 18px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.14);
  padding: 10px;
  z-index: 50;
`;
 
export const UserDropdownHeader = styled.div`
  padding: 10px;
`;
 
export const UserDropdownName = styled.p`
  margin: 0;
color: ${theme.colors.textDark};
  font-weight: 900;
`;
 
export const UserDropdownRole = styled.p`
  margin: 4px 0 0;
 color: ${theme.colors.textDark};
  font-size: 13px;
`;
 
export const UserDropdownDivider = styled.hr`
  border: none;
  border-top: 1px solid #e5eaf1;
  margin: 8px 0;
`;
 
export const UserDropdownItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: #dc2626;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  cursor: pointer;
 
  &:hover {
    background: #fff1f2;
  }
`;
 
// export const Content = styled.section`
//   padding: 32px;
// `;
 
export const Content = styled.section`
  padding: 32px;

  @media (max-width: 760px) {
    padding: 28px 20px 150px;
  }
`;
 
//Mobile navigation
export const MobileBottomNav = styled.nav`
  display: none;

  @media (max-width: 760px) {
    position: fixed;
    left: 14px;
    right: 14px;
    bottom: calc(14px + env(safe-area-inset-bottom));
    z-index: 100;

    min-height: 78px;
    background: ${theme.colors.cardBackground};
    border: 1px solid ${theme.colors.border};
    border-radius: 24px;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    padding: 8px;
  }
`;
 
export const MobileNavLink = styled(NavLink)`
  height: 58px;
  border-radius: 18px;
  text-decoration: none;
  color: ${({ $active }) =>
    $active ? "white" : theme.colors.textMuted};
  background: ${({ $active }) =>
    $active ? theme.colors.primary : "transparent"};
  font-weight: 900;
  font-size: 12px;
 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
 
  svg {
    font-size: 22px;
  }
`;

export const DesktopOnly = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;

  @media (max-width: 760px) {
    display: none;
  }
`;

export const MobileBrand = styled.div`
  display: none;

  @media (max-width: 760px) {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
`;

export const UserLabelText = styled.span`
  @media (max-width: 760px) {
    display: none;
  }
`;
export const NotificationWrapper = styled.div`
  position: relative;
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #dc2626;
  color: #ffffff;
  font-size: 11px;
  font-weight: 900;
  line-height: 20px;
  border: 2px solid ${theme.colors.cardBackground};
`;

export const NotificationDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 360px;
  max-height: 460px;
  overflow: hidden;
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: 18px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.14);
  padding: 12px;
  z-index: 70;

  @media (max-width: 760px) {
    position: fixed;
    top: 76px;
    left: 14px;
    right: 14px;
    width: auto;
    max-height: calc(100vh - 170px);
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 4px 10px;
`;

export const NotificationTitle = styled.p`
  margin: 0;
  color: ${theme.colors.textDark};
  font-weight: 900;
`;

export const NotificationActionButton = styled.button`
  border: none;
  background: transparent;
  color: ${theme.colors.primary};
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const NotificationList = styled.div`
  max-height: 360px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NotificationItem = styled.button`
  width: 100%;
  border: 1px solid ${({ $isRead }) => ($isRead ? theme.colors.border : "#bfdbfe")};
  border-radius: 14px;
  background: ${({ $isRead }) => ($isRead ? theme.colors.inputBackground : "#eff6ff")};
  color: ${theme.colors.textDark};
  padding: 10px;
  text-align: left;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

export const NotificationItemTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 900;
`;

export const NotificationItemText = styled.p`
  margin: 5px 0 0;
  color: ${theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.35;
`;

export const NotificationDate = styled.p`
  margin: 8px 0 0;
  color: ${theme.colors.textMuted};
  font-size: 11px;
  font-weight: 800;
`;

export const NotificationEmpty = styled.div`
  padding: 18px 10px;
  color: ${theme.colors.textMuted};
  font-size: 13px;
  font-weight: 700;
  text-align: center;
`;

export const NotificationError = styled.div`
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 12px;
  background: #fff1f2;
  color: #be123c;
  font-size: 13px;
  font-weight: 800;
`;
