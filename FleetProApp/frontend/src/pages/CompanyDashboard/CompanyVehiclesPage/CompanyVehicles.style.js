import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const VehicleInventoryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const VehicleInventoryCard = styled.article`
  background: white;
  border: 1px solid #e3e8f0;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: ${theme.shadows.card};
`;

export const VehicleImageArea = styled.div`
  height: 190px;
  position: relative;
  background: #dbeafe;
`;

export const VehicleImagePlaceholder = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f172a, #334155);
  color: white;
`;

export const VehicleStatusBadge = styled.span`
  position: absolute;
  top: 18px;
  right: 18px;
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

  &::before {
    content: "•";
    margin-right: 6px;
  }
`;

export const VehicleTypeBadge = styled.span`
  position: absolute;
  left: 18px;
  bottom: 18px;
  border-radius: 6px;
  padding: 7px 11px;
  background: #061827;
  color: white;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
`;

export const VehicleCardBody = styled.div`
  padding: 24px;
`;

export const VehicleCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
`;

export const VehicleTitle = styled.h3`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 25px;
  line-height: 1.05;
  font-weight: 900;
`;

export const VehiclePlate = styled.p`
  margin: 8px 0 0;
  color: #334155;
  font-weight: 900;
`;

export const VehicleMenuButton = styled.button`
  border: none;
  background: transparent;
  color: #64748b;
  padding: 5px;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background: #eef5ff;
    color: ${theme.colors.primary};
  }
`;

export const VehicleInfoGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  min-height: 62px;
`;

export const VehicleInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  color: ${theme.colors.primary};

  svg {
    margin-top: 2px;
  }
`;

export const VehicleInfoLabel = styled.p`
  margin: 0 0 4px;
  color: #64748b;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
`;

export const VehicleInfoValue = styled.p`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 16px;
  font-weight: 700;
`;

export const VehicleCardDivider = styled.hr`
  border: none;
  border-top: 1px solid #e3e8f0;
  margin: 26px 0 16px;
`;

export const VehicleCardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const VehicleLinkButton = styled.button`
  border: none;
  background: transparent;
  color: ${theme.colors.primary};
  font-weight: 900;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const VehicleBookButton = styled.button`
  border: none;
  border-radius: 10px;
  background: ${({ disabled }) => (disabled ? "#edf2f7" : theme.colors.primary)};
  color: ${({ disabled }) => (disabled ? "#94a3b8" : "white")};
  padding: 10px 18px;
  font-weight: 900;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) =>
      disabled ? "#edf2f7" : theme.colors.primaryDark};
  }
`;

export const LoadMoreWrapper = styled.div`
  margin-top: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

export const LoadMoreButton = styled.button`
  min-width: 220px;
  height: 52px;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  background: white;
  color: #334155;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const ShowingText = styled.p`
  margin: 0;
  color: #334155;
`;

export const DetailsOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.46);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 24px;
`;

export const DetailsModal = styled.div`
  width: min(620px, 100%);
  background: white;
  border-radius: 22px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.28);
  overflow: hidden;
  border: 1px solid #e3e8f0;
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
  border: 1px solid #e3e8f0;
  border-radius: 16px;
  padding: 16px;
  background: #f8fbff;
`;

export const DetailsLabel = styled.p`
  margin: 0 0 6px;
  color: #64748b;
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
`;

export const DetailsSecondaryButton = styled.button`
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

export const DetailsPrimaryButton = styled.button`
  border: none;
  background: ${({ disabled }) => (disabled ? "#edf2f7" : theme.colors.primary)};
  color: ${({ disabled }) => (disabled ? "#94a3b8" : "white")};
  border-radius: 12px;
  padding: 11px 18px;
  font-weight: 900;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) =>
      disabled ? "#edf2f7" : theme.colors.primaryDark};
  }
`;

export const BookingOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.46);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 24px;
`;

export const BookingModal = styled.form`
  width: min(560px, 100%);
  background: white;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid #e3e8f0;
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
  color: #64748b;
  text-transform: uppercase;
`;

export const BookingInput = styled.input`
  width: 100%;
  height: 46px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 0 12px;
  margin-top: 6px;
  font-weight: 700;
  color: ${theme.colors.textDark};
  background: white;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(11, 110, 220, 0.14);
  }
`;

export const BookingSummary = styled.div`
  border: 1px solid #e3e8f0;
  border-radius: 16px;
  background: #f8fbff;
  padding: 16px;
  margin-top: 18px;
`;

export const BookingSummaryLabel = styled.p`
  margin: 0 0 6px;
  color: #64748b;
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
  color: #64748b;
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
`;

export const BookingCancelButton = styled.button`
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

export const BookingSubmitButton = styled.button`
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

