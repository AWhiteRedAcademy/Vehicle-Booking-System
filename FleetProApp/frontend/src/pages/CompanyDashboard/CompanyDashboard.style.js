import styled from "styled-components";
import { theme } from "../../styles/theme";

export const DashboardPanel = styled.section`
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  padding: 24px 26px;
  border-bottom: 1px solid ${theme.colors.border};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const PanelTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 24px;
  font-weight: 900;
`;

export const PanelActionButton = styled.button`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.textDark};
  padding: 10px 16px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const BookingTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: ${theme.colors.inputBackground};
    color: ${theme.colors.textMuted};
    text-align: left;
    font-size: 14px;
    font-weight: 900;
    padding: 18px 24px;
  }

  td {
    padding: 18px 24px;
    border-bottom: 1px solid ${theme.colors.border};
    color: ${theme.colors.textDark};
    font-size: 14px;
    vertical-align: middle;
  }

  tbody tr:hover {
    background: ${theme.colors.inputBackground};
  }

  @media (max-width: 760px) {
    display: block;
    border-collapse: separate;

    thead {
      display: none;
    }

    tbody {
      display: grid;
      gap: 14px;
      padding: 14px;
    }

    tr {
      display: block;
      background: ${theme.colors.cardBackground};
      border: 1px solid ${theme.colors.border};
      border-radius: 18px;
      padding: 14px;
      box-shadow: ${theme.shadows.card};
    }

    td {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      border-bottom: 1px solid ${theme.colors.border};
      padding: 13px 0;
      white-space: normal;
      text-align: right;
    }

    td:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    td::before {
      content: attr(data-label);
      color: ${theme.colors.textMuted};
      font-size: 12px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      text-align: left;
      flex-shrink: 0;
    }

    td:first-child {
      display: block;
      text-align: left;
      padding-top: 0;
    }

    td:first-child::before {
      display: block;
      margin-bottom: 10px;
    }
  }
`;

export const BookingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const VehicleImage = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.primary};
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const VehicleName = styled.p`
  margin: 0;
  color: ${theme.colors.textDark};
  font-weight: 900;
`;

export const VehicleMeta = styled.p`
  margin: 4px 0 0;
  color: ${theme.colors.textMuted};
  font-size: 13px;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 7px;
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.textDark};
  border: 1px solid ${theme.colors.border};
  padding: 5px 8px;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StatusText = styled.span`
  color: ${({ $available }) => ($available ? "#16a34a" : theme.colors.primary)};
  font-weight: 900;

  &::before {
    content: "•";
    margin-right: 6px;
  }
`;

export const ActionButton = styled.button`
  border: none;
  background: transparent;
  color: ${theme.colors.textMuted};
  cursor: pointer;
  display: grid;
  place-items: center;
  border-radius: 10px;
  padding: 8px;

  &:hover {
    background: ${theme.colors.inputBackground};
    color: ${theme.colors.primary};
  }
`;

export const TableFooter = styled.div`
  padding: 18px 24px;
  background: ${theme.colors.inputBackground};
  border-top: 1px solid ${theme.colors.border};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FooterText = styled.p`
  margin: 0;
  color: ${theme.colors.textMuted};
  font-size: 14px;
`;

export const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PaginationButton = styled.button`
  min-width: 34px;
  height: 34px;
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  background: ${theme.colors.cardBackground};
  color: ${theme.colors.textDark};
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${theme.colors.inputBackground};
    color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ActionMenuWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const ActionMenu = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
  width: 170px;
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: 14px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.16);
  padding: 8px;
  z-index: 50;
`;

export const ActionMenuItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: ${({ $danger }) => ($danger ? "#dc2626" : theme.colors.textDark)};
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: ${({ $danger }) =>
      $danger ? "#fef2f2" : theme.colors.inputBackground};
    color: ${({ $danger }) => ($danger ? "#b91c1c" : theme.colors.primary)};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
