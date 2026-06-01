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
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
  overflow: hidden;
`;

export const UsersToolbar = styled.div`
  padding: 28px;
  border-bottom: 1px solid ${theme.colors.border};

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
    color: ${theme.colors.textMuted};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  color: ${theme.colors.textDark};
  font-size: 15px;

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 700px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterSelect = styled.select`
  height: 48px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.inputBackground};
  padding: 0 14px;
  outline: none;
  color: ${theme.colors.textDark};
  font-weight: 700;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const FilterButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.textMuted};
  display: grid;
  place-items: center;
  cursor: pointer;
  border-radius: ${theme.radius.medium};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: ${theme.colors.inputBackground};
    color: ${theme.colors.textMuted};
    text-align: left;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 900;
    padding: 18px 28px;
  }

  td {
    padding: 22px 28px;
    border-bottom: 1px solid ${theme.colors.border};
    color: ${theme.colors.textDark};
    font-size: 15px;
  }

  tbody tr:hover {
    background: ${theme.colors.inputBackground};
  }

  @media (max-width: 900px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
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
  flex-shrink: 0;
`;

export const UserName = styled.p`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 16px;
  font-weight: 900;
`;

export const UserEmail = styled.p`
  margin: 4px 0 0;
  color: ${theme.colors.textMuted};
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
    $status === "Active" ? "#15803d" : "#c2410c"};

  background: ${({ $status }) =>
    $status === "Active" ? "#dcfce7" : "#fff7ed"};
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ViewDetailsButton = styled.button`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.textDark};
  padding: 8px 11px;
  font-weight: 900;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const EditUserButton = styled.button`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.primary};
  padding: 8px 11px;
  font-weight: 900;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.cardBackground};
  }
`;

export const DeleteUserButton = styled.button`
  border: 1px solid rgba(220, 38, 38, 0.25);
  border-radius: ${theme.radius.medium};
  background: rgba(220, 38, 38, 0.08);
  color: #dc2626;
  padding: 8px 11px;
  font-weight: 900;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(220, 38, 38, 0.14);
  }
`;

export const TableFooter = styled.div`
  padding: 20px 28px;
  background: ${theme.colors.inputBackground};
  border-top: 1px solid ${theme.colors.border};

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
  color: ${theme.colors.textMuted};
  font-weight: 700;
`;

export const PaginationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PaginationButton = styled.button`
  min-width: 100px;
  height: 44px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.cardBackground};
  color: ${theme.colors.textDark};
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;