import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  background: #f5f7fb;
  color: #102a43;
`;

export const Sidebar = styled.aside`
  width: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "260px" : "82px")};
  min-height: 100vh;
  background: #ffffff;
  border-right: 1px solid #e5eaf1;
  padding: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? "24px 18px" : "24px 12px"};
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease, padding 0.25s ease;
  overflow: hidden;
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
  color: #102a43;
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

export const Topbar = styled.header`
  min-height: 76px;
  background: #ffffff;
  border-bottom: 1px solid #e5eaf1;
  padding: 0 32px;
  display: flex;
  align-items: center;
  gap: 16px;
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
`;

export const IconButton = styled.button`
  width: 42px;
  height: 42px;
  border: 1px solid #e5eaf1;
  border-radius: 14px;
  background: #ffffff;
  color: #102a43;
  display: grid;
  place-items: center;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
  }
`;

export const UserMenuWrapper = styled.div`
  position: relative;
`;

export const UserMenuButton = styled.button`
  min-height: 42px;
  border: 1px solid #e5eaf1;
  border-radius: 14px;
  background: #ffffff;
  color: #102a43;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
  }
`;

export const UserDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  background: #ffffff;
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
  color: #102a43;
  font-weight: 900;
`;

export const UserDropdownRole = styled.p`
  margin: 4px 0 0;
  color: #64748b;
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

export const Content = styled.section`
  padding: 32px;
`;