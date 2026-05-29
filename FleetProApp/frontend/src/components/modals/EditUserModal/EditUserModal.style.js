import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.35);
  backdrop-filter: blur(8px);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 18px;
  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.28);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e3e8f0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 22px;
  font-weight: 900;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;

  &:hover {
    color: #dc2626;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
`;

export const Label = styled.label`
  color: #334155;
  font-size: 13px;
  font-weight: 900;
`;

export const Input = styled.input`
  height: 46px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: white;
  padding: 0 14px;
  color: ${theme.colors.textDark};
  font-size: 15px;
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const Select = styled.select`
  height: 46px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: white;
  padding: 0 14px;
  color: ${theme.colors.textDark};
  font-size: 15px;
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const PendingNotice = styled.div`
  border-radius: ${theme.radius.medium};
  background: #fff7ed;
  color: #c2410c;
  padding: 12px 14px;
  font-weight: 800;
`;

export const ErrorMessage = styled.div`
  border-radius: ${theme.radius.medium};
  background: #fef2f2;
  color: #b91c1c;
  padding: 12px 14px;
  font-weight: 800;
`;

export const ModalFooter = styled.div`
  padding: 18px 24px;
  border-top: 1px solid #e3e8f0;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
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
  padding: 12px 18px;
  font-weight: 900;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;