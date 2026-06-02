import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const DashboardPanel = styled.section`
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
  overflow: hidden;
`;

export const AddVehicleCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 2px dashed ${theme.colors.border};
  border-radius: 12px;
  cursor: pointer;
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.textDark};

  &:hover {
    background: ${theme.colors.cardBackground};
    border-color: ${theme.colors.primary};
  }
`;

export const PlusCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.cardBackground};
  color: ${theme.colors.primary};
  margin-bottom: 8px;
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

    td:last-child {
      border-bottom: none;
      padding-bottom: 0;
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
  color: ${({ $available }) => ($available ? "#16a34a" : "#0b5ed7")};
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
`;

export const FooterText = styled.p`
  margin: 0;
  color: ${theme.colors.textMuted};
  font-size: 14px;
  font-weight: 700;
`;

export const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PaginationButton = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  background: ${theme.colors.cardBackground};
  color: ${theme.colors.textDark};
  font-size: 22px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${theme.colors.inputBackground};
    color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

// export const PaginationButton = styled.button`
//   width: 34px;
//   height: 34px;
//   border: none;
//   border-radius: 10px;
//   background: white;
//   color: ${theme.colors.textDark};
//   font-size: 22px;
//   cursor: pointer;

//   &:hover {
//     background: #eef5ff;
//     color: ${theme.colors.primary};
//   }
// `;

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
  z-index: 30;
`;

export const ActionMenuItem = styled.button`
  width: 100%;
  border: none;
  background: ${theme.colors.cardBackground};
  color: ${({ $danger }) => ($danger ? "#dc2626" : theme.colors.textDark)};
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: ${({ $danger }) => ($danger ? "#fef2f2" : "#eef5ff")};
    color: ${({ $danger }) => ($danger ? "#b91c1c" : theme.colors.primary)};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.46);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 24px;
`;


export const ModalCard = styled.div`
  width: min(620px, 100%);
  background: ${theme.colors.cardBackground};
  border-radius: 22px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.28);
  border: 1px solid ${theme.colors.border};
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 26px;
  background: linear-gradient(135deg, #061827, #12345a);
  color: white;
  display: flex;
  justify-content: space-between;
  gap: 18px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 26px;
  font-weight: 900;
`;

export const ModalSubtitle = styled.p`
  margin: 8px 0 0;
  color: #dbeafe;
  font-weight: 700;
`;

export const ModalCloseButton = styled.button`
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

export const ModalBody = styled.div`
  padding: 26px;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: 16px;
  padding: 16px;
  background: ${theme.colors.inputBackground};
`;


export const DetailLabel = styled.p`
  margin: 0 0 6px;
  color: ${theme.colors.textMuted};
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
`;

export const DetailValue = styled.p`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 16px;
  font-weight: 800;
  word-break: break-word;
`;

export const ModalActions = styled.div`
  padding: 0 26px 26px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ModalSecondaryButton = styled.button`
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

export const ModalPrimaryButton = styled.button`
  border: none;
  background: ${({ disabled }) => (disabled ? "#94a3b8" : theme.colors.primary)};
  color: white;
  border-radius: 12px;
  padding: 11px 18px;
  font-weight: 900;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) =>
      disabled ? "#94a3b8" : theme.colors.primaryDark};
  }
`;

export const ModalDangerButton = styled.button`
  border: none;
  background: #dc2626;
  color: white;
  border-radius: 12px;
  padding: 11px 18px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: #b91c1c;
  }
`;

export const ModalInput = styled.input`
  width: 100%;
  height: 46px;
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 0 12px;
  margin-top: 6px;
  font-weight: 700;
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.textDark};
`;

export const PanelMessage = styled.div`
  padding: 24px 26px;
  color: ${theme.colors.textMuted};
  font-weight: 700;
`;

export const PanelError = styled.div`
  padding: 0 26px 24px;
  color: #dc2626;
  font-weight: 800;
`;

export const ModalErrorText = styled.p`
  margin: 0 0 16px;
  color: #dc2626;
  font-weight: 800;
`;

export const ModalWarningText = styled.p`
  margin-top: 0;
  color: ${theme.colors.textDark};
  font-weight: 800;
`;