import styled from "styled-components";
import { theme } from "../../styles/theme";

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const LeftIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textMuted};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightIconButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);

  border: none;
  background: transparent;
  color: ${theme.colors.textMuted};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.inputBackground};
  border-radius: 7px;

  padding-left: ${({ $hasLeftIcon }) => ($hasLeftIcon ? "44px" : "14px")};
  padding-right: ${({ $hasRightIcon }) => ($hasRightIcon ? "44px" : "14px")};

  font-size: 14px;
  outline: none;
  color: ${theme.colors.textDark};

  &:focus {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.cardBackground};
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #dc2626;
  font-size: 12px;
  font-weight: 700;
`;