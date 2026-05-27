import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Card = styled.article`
  overflow: hidden;
  background: ${theme.colors.cardBackground};
  border: 1px solid #e3e8f0;
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
`;

export const ImageArea = styled.div`
  min-height: 164px;
  position: relative;
  background:
    radial-gradient(circle at top left, rgba(0, 102, 217, 0.25), transparent 34%),
    linear-gradient(135deg, #edf4ff, #e2e8f0);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VehicleIcon = styled.div`
  width: 82px;
  height: 82px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.75);
  color: ${theme.colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 48px;
  }
`;

export const StatusBadge = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;

  color: ${({ $available }) => ($available ? "#15803d" : "#c2410c")};
  background: ${({ $available }) => ($available ? "#dcfce7" : "#fff7ed")};
`;

export const Body = styled.div`
  padding: 18px;
`;

export const VehicleTitle = styled.h3`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 18px;
  font-weight: 900;
`;

export const DetailRow = styled.div`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const DetailTag = styled.span`
  padding: 6px 9px;
  border-radius: 999px;
  background: #f1f5f9;
  color: ${theme.colors.textMuted};
  font-size: 12px;
  font-weight: 800;
`;
export const Footer = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

export const Rate = styled.strong`
  color: ${theme.colors.textDark};
  font-size: 15px;
  font-weight: 900;
`;


export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const EditButton = styled.button`
  border: none;
  border-radius: ${theme.radius.medium};
  padding: 9px 12px;
  background: #edf4ff;
  color: ${theme.colors.primary};
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #dceafe;
  }
`;

export const DeleteButton = styled.button`
  border: none;
  border-radius: ${theme.radius.medium};
  padding: 9px 12px;
  background: #edf4ff;
  color: ${theme.colors.textRed};
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #dceafe;
  }
`;



