import styled from "styled-components";
import { theme } from "../../styles/theme";

function getToneStyles(tone) {
  switch (tone) {
    case "green":
      return {
        background: "#dcfce7",
        color: "#15803d",
      };
    case "orange":
      return {
        background: "#fff7ed",
        color: "#c2410c",
      };
    case "red":
      return {
        background: "#fee2e2",
        color: "#b91c1c",
      };
    default:
      return {
        background: "#edf4ff",
        color: theme.colors.primary,
      };
  }
}

export const Card = styled.article`
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.large};
  padding: 20px;
  box-shadow: ${theme.shadows.card};
`;

export const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
`;

export const Content = styled.div``;

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
  margin: 12px 0 0;
  color: ${theme.colors.textMuted};
  font-size: 13px;
`;

export const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${theme.radius.medium};

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $tone }) => getToneStyles($tone).background};
  color: ${({ $tone }) => getToneStyles($tone).color};
`;
