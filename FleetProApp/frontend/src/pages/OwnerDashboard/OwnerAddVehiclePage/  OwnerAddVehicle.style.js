import styled from "styled-components";
import {theme } from "../../../styles/theme"

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) 360px;
  gap: 24px;

  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormCard = styled.section`
  background: white;
  border: 1px solid #e3e8f0;
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
  padding: 26px;
`;

export const CardTitle = styled.h2`
  margin: 0 0 24px;
  color: ${theme.colors.textDark};
  font-size: 24px;
  font-weight: 900;

  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${theme.colors.primary};
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  margin-bottom: 22px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 720px) {
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
  margin-top: 10px;
`;

export const Input = styled.input`
  height: 52px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.inputBackground};
  padding: 0 16px;
  font-size: 16px;
  color: ${theme.colors.textDark};
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
  font-size: 16px;
  color: ${theme.colors.textDark};
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
    background: white;
  }
`;

export const StatusOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StatusOption = styled.button`
  height: 48px;
  border: 1px solid ${({ $active }) => ($active ? theme.colors.primary : "#dbe4ef")};
  border-radius: ${theme.radius.medium};
  background: ${({ $active }) => ($active ? "#eaf2ff" : "white")};
  color: ${theme.colors.textDark};
  font-weight: 900;
  cursor: pointer;
  text-align: left;
  padding: 0 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &::after {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: ${({ $active }) => ($active ? "#22c55e" : "#cbd5e1")};
  }

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: ${theme.radius.medium};
  background: #fef2f2;
  color: #b91c1c;
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

export const DiscardButton = styled.button`
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
  background: ${theme.colors.textDark};
  color: white;
  min-width: 170px;
  height: 48px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #020617;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;