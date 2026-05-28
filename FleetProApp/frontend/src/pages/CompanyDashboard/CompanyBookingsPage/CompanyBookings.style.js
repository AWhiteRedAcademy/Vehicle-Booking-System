import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const DashboardPanel = styled.section`
  background: white;
  border: 1px solid #e3e8f0;
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
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  cursor: pointer;
  background: #f8fafc;
  
  &:hover {
    background: #f1f5f9;
    border-color: #94a3b8;
  }
`;

export const PlusCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e2e8f0;
  color: #64748b;
  margin-bottom: 8px;
`;


export const PanelHeader = styled.div`
  padding: 24px 26px;
  border-bottom: 1px solid #e3e8f0;

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
  border: none;
  border-radius: ${theme.radius.medium};
  background: #eef5ff;
  color: ${theme.colors.textDark};
  padding: 10px 16px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: #dbeafe;
  }
`;

export const BookingTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: #eef4ff;
    color: #334155;
    text-align: left;
    font-size: 14px;
    font-weight: 900;
    padding: 18px 24px;
  }

  td {
    padding: 18px 24px;
    border-bottom: 1px solid #edf2f7;
    color: #334155;
    font-size: 14px;
    vertical-align: middle;
  }

  tbody tr:hover {
    background: #f8fbff;
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
  background: #eaf2ff;
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
  background: #e8eef8;
  color: #334155;
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
  color: #334155;
  cursor: pointer;
  display: grid;
  place-items: center;
  border-radius: 10px;
  padding: 8px;

  &:hover {
    background: #eef5ff;
    color: ${theme.colors.primary};
  }
`;

export const TableFooter = styled.div`
  padding: 18px 24px;
  background: #f8fbff;

  display: flex;
  align-items: center;
  justify-content: space-between;
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
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 10px;
  background: white;
  color: ${theme.colors.textDark};
  font-size: 22px;
  cursor: pointer;

  &:hover {
    background: #eef5ff;
    color: ${theme.colors.primary};
  }
`;

export const ActionMenuWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const ActionMenu = styled.div`
  position: absolute;
  right: 0;
  top: 38px;
  width: 170px;
  background: white;
  border: 1px solid #e3e8f0;
  border-radius: 14px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.16);
  padding: 8px;
  z-index: 20;
`;

export const ActionMenuItem = styled.button`
  width: 100%;
  border: none;
  background: white;
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
  background: white;
  border-radius: 22px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.28);
  border: 1px solid #e3e8f0;
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
  border: 1px solid #e3e8f0;
  border-radius: 16px;
  padding: 16px;
  background: #f8fbff;
`;

export const DetailLabel = styled.p`
  margin: 0 0 6px;
  color: #64748b;
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
  border: 1px solid #cbd5e1;
  background: white;
  color: #334155;
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
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 0 12px;
  margin-top: 6px;
  font-weight: 700;
`;