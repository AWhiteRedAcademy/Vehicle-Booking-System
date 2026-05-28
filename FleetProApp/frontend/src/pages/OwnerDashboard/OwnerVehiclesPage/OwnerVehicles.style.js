import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const PageSummary = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;

  span {
    color: ${theme.colors.textDark};
    font-weight: 800;
    font-size: 14px;

    display: flex;
    align-items: center;
    gap: 7px;
  }
`;

export const SummaryDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  display: inline-block;

  background: ${({ $tone }) => {
    if ($tone === "green") return "#22c55e";
    if ($tone === "orange") return "#f97316";
    return theme.colors.primary;
  }};
`;

export const LoadMoreWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

export const ShowingText = styled.p`
  margin: 0;
  color: #64748b;
  font-weight: 700;
`;