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
  top: 18px;
  width: 170px;
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: 14px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.16);
  padding: 8px;
  z-index: 50;
`;
// export const ActionMenu = styled.div`
//   position: absolute;
//   right: 0;
//   top: 42px;
//   width: 180px;
//   background: ${theme.colors.cardBackground};
//   border: 1px solid ${theme.colors.border};
//   border-radius: 14px;
//   box-shadow: 0 18px 45px rgba(15, 23, 42, 0.16);
//   padding: 8px;
//   z-index: 999;
// `;

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

export const DetailsOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.46);
  backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 24px;
`;

export const DetailsModal = styled.div`
  width: min(620px, 100%);
  background: ${theme.colors.cardBackground};
  border-radius: 22px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.28);
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
`;

export const DetailsHeader = styled.div`
  padding: 26px;
  background: linear-gradient(135deg, #061827, #12345a);
  color: white;
  display: flex;
  justify-content: space-between;
  gap: 18px;
`;

export const DetailsTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 900;
`;

export const DetailsSubtitle = styled.p`
  margin: 8px 0 0;
  color: #dbeafe;
  font-weight: 700;
`;

export const DetailsCloseButton = styled.button`
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 22px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const DetailsBody = styled.div`
  padding: 26px;
`;

export const DetailsStatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
  color: ${theme.colors.textDark};

  @media (max-width: 620px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const DetailsStatusBadge = styled.span`
  border-radius: 999px;
  padding: 8px 13px;
  font-size: 12px;
  font-weight: 900;

  color: ${({ $status }) => {
    if ($status === "Available") return "#166534";
    if ($status === "In Use") return "#0b5ed7";
    if ($status === "Maintenance") return "#92400e";
    return "#334155";
  }};

  background: ${({ $status }) => {
    if ($status === "Available") return "#dcfce7";
    if ($status === "In Use") return "#dbeafe";
    if ($status === "Maintenance") return "#fef3c7";
    return "#e2e8f0";
  }};
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailsItem = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: 16px;
  padding: 16px;
  background: ${theme.colors.inputBackground};
`;

export const DetailsLabel = styled.p`
  margin: 0 0 6px;
  color: ${theme.colors.textMuted};
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
`;

export const DetailsValue = styled.p`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 16px;
  font-weight: 800;
  word-break: break-word;
`;

export const DetailsActions = styled.div`
  padding: 0 26px 26px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 620px) {
    flex-direction: column;
  }
`;

export const DetailsSecondaryButton = styled.button`
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.cardBackground};
  color: ${theme.colors.textDark};
  border-radius: 12px;
  padding: 11px 18px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const DetailsPrimaryButton = styled.button`
  border: none;
  background: ${({ disabled }) =>
    disabled ? theme.colors.inputBackground : theme.colors.primary};
  color: ${({ disabled }) => (disabled ? theme.colors.textMuted : "white")};
  border-radius: 12px;
  padding: 11px 18px;
  font-weight: 900;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) =>
      disabled ? theme.colors.inputBackground : theme.colors.primaryDark};
  }
`;

export const BookingOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.46);
  backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 24px;
`;

export const BookingModal = styled.form`
  width: min(560px, 100%);
  background: ${theme.colors.cardBackground};
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.28);
`;

export const BookingHeader = styled.div`
  padding: 26px;
  background: linear-gradient(135deg, #061827, #12345a);
  color: white;
  display: flex;
  justify-content: space-between;
  gap: 18px;
`;

export const BookingTitle = styled.h2`
  margin: 0;
  font-size: 26px;
  font-weight: 900;
`;

export const BookingSubtitle = styled.p`
  margin: 8px 0 0;
  color: #dbeafe;
  font-weight: 700;
`;

export const BookingCloseButton = styled.button`
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 22px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const BookingBody = styled.div`
  padding: 26px;
`;

export const BookingDateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const BookingField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BookingLabel = styled.label`
  font-size: 12px;
  font-weight: 900;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
`;

export const BookingInput = styled.input`
  width: 100%;
  height: 46px;
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 0 12px;
  margin-top: 6px;
  font-weight: 700;
  color: ${theme.colors.textDark};
  background: ${theme.colors.inputBackground};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(11, 110, 220, 0.14);
  }
`;

export const BookingSummary = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: 16px;
  background: ${theme.colors.inputBackground};
  padding: 16px;
  margin-top: 18px;
`;

export const BookingSummaryLabel = styled.p`
  margin: 0 0 6px;
  color: ${theme.colors.textMuted};
  font-weight: 900;
  text-transform: uppercase;
  font-size: 12px;
`;

export const BookingTotal = styled.h3`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 24px;
  font-weight: 900;
`;

export const BookingRateText = styled.p`
  margin: 6px 0 0;
  color: ${theme.colors.textMuted};
  font-weight: 700;
`;

export const BookingError = styled.p`
  margin: 16px 0 0;
  color: #dc2626;
  font-weight: 800;
`;

export const BookingActions = styled.div`
  padding: 0 26px 26px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 620px) {
    flex-direction: column;
  }
`;

export const BookingCancelButton = styled.button`
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.cardBackground};
  color: ${theme.colors.textDark};
  border-radius: 12px;
  padding: 11px 18px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const BookingSubmitButton = styled.button`
  border: none;
  background: ${({ disabled }) =>
    disabled ? theme.colors.inputBackground : theme.colors.primary};
  color: ${({ disabled }) => (disabled ? theme.colors.textMuted : "white")};
  border-radius: 12px;
  padding: 11px 18px;
  font-weight: 900;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) =>
      disabled ? theme.colors.inputBackground : theme.colors.primaryDark};
  }
`;