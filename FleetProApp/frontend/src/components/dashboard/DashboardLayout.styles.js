import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";

export const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${theme.colors.background};
  color: ${theme.colors.textDark};
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
  transition:
    width 0.25s ease,
    padding 0.25s ease;
  overflow: hidden;
`;

export const SidebarToggleButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #e5eaf1;
  border-radius: 12px;
  background: #ffffff;
  color: #1e293b;
  display: grid;
  place-items: center;
  cursor: pointer;
  margin-right: 16px;

  &:hover {
    background: #f1f5f9;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LogoBox = styled.div`
  width: 38px;
  height: 38px;
  border-radius: ${theme.radius.small};
  background: ${theme.colors.primary};
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BrandText = styled.span`
  font-size: 18px;
  font-weight: 900;
  color: ${theme.colors.textDark};
`;

export const RoleBadge = styled.div`
  margin-top: 24px;
  padding: 14px;
  border-radius: ${theme.radius.medium};
  background: #edf4ff;
  color: ${theme.colors.primary};
  font-size: 13px;
  font-weight: 800;
`;

export const Nav = styled.nav`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NavLinkItem = styled(Link)`
  min-height: 44px;
  padding: 0 14px;
  border-radius: ${theme.radius.medium};

  display: flex;
  align-items: center;
  gap: 12px;

  color: ${({ $active }) =>
    $active ? theme.colors.primary : theme.colors.textMuted};
  background: ${({ $active }) => ($active ? "#edf4ff" : "transparent")};
  font-size: 14px;
  font-weight: 800;

  &:hover {
    background: #edf4ff;
    color: ${theme.colors.primary};
  }
`;

export const NavIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavText = styled.span``;

export const SidebarFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Main = styled.main`
  flex: 1;
  min-width: 0;
`;

export const Topbar = styled.header`
  height: 72px;
  background: #ffffff;
  border-bottom: 1px solid #e5eaf1;
  padding: 0 32px;
  display: flex;
  align-items: center;
`;

export const PageHeading = styled.div``;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 900;
  color: ${theme.colors.textDark};
`;

export const PageSubtitle = styled.p`
  margin: 5px 0 0;
  color: ${theme.colors.textMuted};
  font-size: 14px;
`;

export const TopActions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #d7dce5;
  background: white;
  border-radius: ${theme.radius.medium};
  cursor: pointer;
  color: ${theme.colors.textMuted};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }
`;

export const UserPill = styled.div`
  height: 40px;
  padding: 0 14px;
  border: 1px solid #d7dce5;
  border-radius: 999px;
  background: white;
  color: ${theme.colors.textDark};
  font-size: 13px;
  font-weight: 800;

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Content = styled.section`
  padding: 32px 34px 48px;
`;

export const UserMenuWrapper = styled.div`
  position: relative;
`;

export const UserMenuButton = styled.button`
  height: 40px;
  padding: 0 12px 0 14px;
  border: 1px solid #d7dce5;
  border-radius: 999px;
  background: white;
  color: ${theme.colors.textDark};
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const UserDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  background: white;
  border: 1px solid #e3e8f0;
  border-radius: ${theme.radius.medium};
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.14);
  padding: 10px;
  z-index: 20;
`;

export const UserDropdownHeader = styled.div`
  padding: 10px 10px 8px;
`;

export const UserDropdownName = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 900;
  color: ${theme.colors.textDark};
`;

export const UserDropdownRole = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.textMuted};
`;

export const UserDropdownDivider = styled.div`
  height: 1px;
  background: #e3e8f0;
  margin: 6px 0;
`;

export const UserDropdownItem = styled.button`
  width: 100%;
  min-height: 40px;
  border: none;
  border-radius: ${theme.radius.small};
  background: transparent;
  color: #dc2626;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  padding: 0 10px;

  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: #fef2f2;
  }
`;

export const LogoutNavButton = styled.button`
  min-height: 44px;
  padding: 0 14px;
  border: none;
  border-radius: ${theme.radius.medium};
  background: transparent;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 12px;

  color: ${theme.colors.textMuted};
  font-size: 14px;
  font-weight: 800;

  &:hover {
    background: #edf4ff;
    color: ${theme.colors.primary};
  }
`;
