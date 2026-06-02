import styled from "styled-components";
import { theme } from "../../styles/theme";

export const SuccessBox = styled.div`
  width: 100%;
  margin-bottom: 18px;
  padding: 14px 16px;
  border-radius: ${theme.radius.medium};
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #16a34a;

  display: flex;
  align-items: flex-start;
  gap: 12px;

  svg {
    color: #16a34a;
    font-size: 22px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  h3 {
    margin: 0;
    color: #16a34a;
    font-size: 15px;
    font-weight: 900;
    line-height: 1.2;
  }

  p {
    margin: 4px 0 0;
    color: ${theme.colors.textDark};
    font-size: 13px;
    line-height: 1.4;
    font-weight: 700;
  }
`;

export const ErrorBox = styled.div`
  width: 100%;
  margin-bottom: 18px;
  padding: 14px 16px;
  border-radius: ${theme.radius.medium};
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #dc2626;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
`;