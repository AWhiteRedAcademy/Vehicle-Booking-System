import styled from "styled-components";

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
  color: #555f6d;
  text-transform: uppercase;
`;

export const Input = styled.input`
  height: 50px;
  border: 1px solid #c9d2df;
  background: #eef3fb;
  border-radius: 7px;
  padding: 0 14px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #0066d9;
    background: #ffffff;
  }

  &::placeholder {
    color: #667085;
  }
`;