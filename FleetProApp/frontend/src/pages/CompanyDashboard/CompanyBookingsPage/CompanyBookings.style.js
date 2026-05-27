import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const BookingPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 28px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.select`
  height: 44px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: white;
  padding: 0 14px;
  color: ${theme.colors.textDark};
  font-weight: 800;
  cursor: pointer;
`;

export const ExportButton = styled.button`
  height: 44px;
  border: none;
  border-radius: 10px;
  background: ${theme.colors.textDark};
  color: white;
  padding: 0 18px;
  font-weight: 900;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #020617;
  }
`;

export const BookingsPanel = styled.section`
  background: white;
  border: 1px solid #e3e8f0;
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
  overflow: hidden;
`;

export const BookingsToolbar = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e3e8f0;
`;

export const SearchBox = styled.div`
  max-width: 520px;
  height: 46px;
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

export const BookingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: #eaf2ff;
    color: #334155;
    text-align: left;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.4px;
    padding: 18px 24px;
  }

  td {
    padding: 22px 24px;
    border-bottom: 1px solid #edf2f7;
    color: ${theme.colors.textDark};
    vertical-align: middle;
  }

  tbody tr:hover {
    background: #f8fbff;
  }
`;

export const VehicleCell = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const VehicleThumb = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: #eaf2ff;
  color: ${theme.colors.primary};
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const VehicleName = styled.strong`
  color: ${theme.colors.textDark};
  line-height: 1.4;
`;

export const ClientName = styled.span`
  color: ${theme.colors.textDark};
  line-height: 1.5;
`;

export const DurationText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  span {
    color: ${theme.colors.textDark};
  }

  small {
    color: #64748b;
  }
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;

  color: ${({ $status }) => {
    if ($status === "Upcoming") return "#0b5ed7";
    if ($status === "Active") return "#15803d";
    if ($status === "Completed") return "#475569";
    if ($status === "Cancelled") return "#dc2626";
    return "#334155";
  }};

  background: ${({ $status }) => {
    if ($status === "Upcoming") return "#dbeafe";
    if ($status === "Active") return "#dcfce7";
    if ($status === "Completed") return "#f1f5f9";
    if ($status === "Cancelled") return "#fee2e2";
    return "#f1f5f9";
  }};
`;

export const AmountText = styled.strong`
  color: ${theme.colors.primary};
  font-size: 16px;
`;

export const DetailsButton = styled.button`
  border: 1px solid ${theme.colors.primary};
  border-radius: 9px;
  background: white;
  color: ${theme.colors.primary};
  padding: 8px 14px;
  font-weight: 900;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: #eef5ff;
  }
`;
export const DateInput = styled.input`
  height: 44px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: white;
  padding: 0 14px;
  color: ${theme.colors.textDark};
  font-weight: 800;
  cursor: pointer;
`;

export const DeleteBookingButton = styled.button`
  border: none;
  border-radius: 9px;
  background: #fef2f2;
  color: #dc2626;
  padding: 8px 12px;
  font-weight: 900;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #fee2e2;
  }
`;

export const TableFooter = styled.div`
  padding: 18px 24px;
  background: #f8fafc;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FooterText = styled.p`
  margin: 0;
  color: #334155;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PageButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #cbd5e1;
  border-radius: 9px;
  background: ${({ $active }) => ($active ? theme.colors.textDark : "white")};
  color: ${({ $active }) => ($active ? "white" : theme.colors.textDark)};
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: ${theme.colors.primary};
    color: ${({ $active }) => ($active ? "white" : theme.colors.primary)};
  }
`;
