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