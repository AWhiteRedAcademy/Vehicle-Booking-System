import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const FormCard = styled.section`
  background: white;
  border: 1px solid #e3e8f0;
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
  padding: 28px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: #64748b;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  height: 52px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.inputBackground};
  padding: 0 16px;
  color: ${theme.colors.textDark};
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
    background: white;
  }
`;

export const Select = styled.select`
  height: 52px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.inputBackground};
  padding: 0 16px;
  color: ${theme.colors.textDark};
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
    background: white;
  }
`;

export const HelperText = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 13px;
`;

export const PendingNotice = styled.div`
  margin-top: 24px;
  border-radius: ${theme.radius.medium};
  background: #fff7ed;
  color: #c2410c;
  padding: 14px 16px;
  font-weight: 800;
`;

export const ErrorMessage = styled.div`
  margin-top: 18px;
  border-radius: ${theme.radius.medium};
  background: #fef2f2;
  color: #b91c1c;
  padding: 14px 16px;
  font-weight: 800;
`;

export const FooterBar = styled.div`
  margin-top: 28px;
  background: white;
  border: 1px solid #e3e8f0;
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
  padding: 22px 26px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FooterText = styled.p`
  margin: 0;
  color: #334155;
  font-size: 14px;
`;

export const FooterActions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 720px) {
    justify-content: flex-end;
  }
`;

export const CancelButton = styled.button`
  border: none;
  background: transparent;
  color: #334155;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    color: #dc2626;
  }
`;

export const SaveButton = styled.button`
  border: none;
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.primary};
  color: white;
  min-width: 150px;
  height: 48px;
  font-weight: 900;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;