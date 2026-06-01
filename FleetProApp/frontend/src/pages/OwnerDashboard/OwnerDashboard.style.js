import styled from "styled-components";
import { theme } from "../../styles/theme";

export const AddVehicleCard = styled.button`
  min-height: 311px;
  border: 2px dashed ${theme.colors.border};
  border-radius: ${theme.radius.large};
  background: ${theme.colors.cardBackground};
  cursor: pointer;
  padding: 28px;
  text-align: center;
  color: ${theme.colors.textMuted};
  box-shadow: ${theme.shadows.card};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    margin: 14px 0 6px;
    color: ${theme.colors.textDark};
    font-size: 17px;
    font-weight: 900;
  }

  p {
    margin: 0;
    max-width: 230px;
    line-height: 1.5;
    color: ${theme.colors.textMuted};
  }

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    background: ${theme.colors.inputBackground};
  }
`;

export const PlusCircle = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.primary};
  font-size: 30px;
  font-weight: 900;
  border: 1px solid ${theme.colors.border};

  display: flex;
  align-items: center;
  justify-content: center;
`;