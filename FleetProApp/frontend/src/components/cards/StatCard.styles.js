import styled from "styled-components";
import { theme } from "../../styles/theme";

function getToneStyles(tone) {
  switch (tone) {
    case "green":
      return {
        background: "#dcfce7", // Light Green
        color: "#15803d",      // Dark Green
      };
    case "blue":
      return {
        background: "#e8f0fe", // Light Blue
        color: "#1a73e8",      // Dark Blue
      };
    case "orange":
      return {
        background: "#fff7ed", // Light Orange
        color: "#c2410c",      // Dark Orange
      };
    case "red":
      return {
        background: "#fee2e2", // Light Red
        color: "#b91c1c",      // Dark Red
      };
    default:
      return {
        background: "#f1f3f4",
        color: "#5f6368",
      };
  }
}

export const Card = styled.article`
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.large};
  padding: 20px;
  box-shadow: ${theme.shadows.card};
  
  display: flex;
  flex-direction: column;
  height: 100%; 
`;

export const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  flex-grow: 1; 
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.p`
  margin: 0;
  color: ${theme.colors.textMuted};
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Value = styled.h2`
  margin: 12px 0 0;
  color: ${theme.colors.textDark};
  font-size: 28px;
  font-weight: 900;
`;

export const HelperText = styled.p`
  margin: auto 0 0 0; 
  padding-top: 12px;
  color: ${theme.colors.textMuted};
  font-size: 13px;
`;

export const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${theme.radius.medium};
  flex-shrink: 0; 

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $tone }) => getToneStyles($tone).background};
  color: ${({ $tone }) => getToneStyles($tone).color};
`;
