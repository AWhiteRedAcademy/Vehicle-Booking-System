import styled from "styled-components";
import { theme } from "../../styles/theme";

export const AdminMetaRow = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const MetaItem = styled.span`
  color: ${theme.colors.textDark};
  font-weight: 700;

  &::before {
    content: "";
    width: 9px;
    height: 9px;
    border-radius: 999px;
    display: inline-block;
    margin-right: 8px;
    background: ${({ $color }) =>
      $color === "green" ? "#22c55e" : theme.colors.primary};
  }
`;

export const UsersPanel = styled.section`
  margin-top: 28px;
  background: white;
  border: 1px solid #e3e8f0;
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
  overflow: hidden;
`;

export const UsersToolbar = styled.div`
  padding: 28px;
  border-bottom: 1px solid #e3e8f0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchBox = styled.div`
  max-width: 480px;
  width: 100%;
  height: 48px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.inputBackground};
  padding: 0 14px;

  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: #64748b;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  color: ${theme.colors.textDark};
  font-size: 15px;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const FilterSelect = styled.select`
  height: 48px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: white;
  padding: 0 14px;
  outline: none;
  color: ${theme.colors.textDark};
  font-weight: 700;
`;

export const FilterButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  color: #64748b;
  display: grid;
  place-items: center;
  cursor: pointer;
  border-radius: ${theme.radius.medium};

  &:hover {
    background: #eef5ff;
    color: ${theme.colors.primary};
  }
`;

export const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: #f8fafc;
    color: #64748b;
    text-align: left;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 900;
    padding: 18px 28px;
  }

  td {
    padding: 22px 28px;
    border-bottom: 1px solid #edf2f7;
    color: ${theme.colors.textDark};
    font-size: 15px;
  }

  tbody tr:hover {
    background: #f8fbff;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const AvatarCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: ${theme.colors.primary};
  color: white;
  font-weight: 900;
  display: grid;
  place-items: center;
`;

export const UserName = styled.p`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 16px;
  font-weight: 900;
`;

export const UserEmail = styled.p`
  margin: 4px 0 0;
  color: #64748b;
  font-size: 14px;
`;

export const RoleText = styled.span`
  color: ${theme.colors.textDark};
  font-weight: 800;
`;

export const StatusBadge = styled.span`
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 900;

  color: ${({ $status }) =>
    $status === "Active" ? "#15803d" : "#64748b"};

  background: ${({ $status }) =>
    $status === "Active" ? "#dcfce7" : "#f1f5f9"};
`;

export const TableFooter = styled.div`
  padding: 20px 28px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FooterText = styled.p`
  margin: 0;
  color: #64748b;
`;

export const PaginationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PaginationButton = styled.button`
  min-width: 100px;
  height: 44px;
  border: 1px solid #e3e8f0;
  border-radius: ${theme.radius.medium};
  background: white;
  color: ${theme.colors.textDark};
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    color: #94a3b8;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;