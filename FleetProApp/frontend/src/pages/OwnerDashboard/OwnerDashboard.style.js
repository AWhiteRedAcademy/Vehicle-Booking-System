import styled from "styled-components";
import { theme } from "../../styles/theme";

export const AddVehicleCard = styled.button`
  min-height: 311px;
  border: 2px dashed #cbd5e1;
  border-radius: ${theme.radius.large};
  background: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  padding: 28px;
  text-align: center;
  color: ${theme.colors.textMuted};

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
  }

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const PlusCircle = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #edf4ff;
  color: ${theme.colors.primary};
  font-size: 30px;
  font-weight: 900;

  display: flex;
  align-items: center;
  justify-content: center;
`;