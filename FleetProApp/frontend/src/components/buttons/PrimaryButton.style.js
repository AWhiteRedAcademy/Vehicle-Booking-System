import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 8px;
  background: #0066d9;
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  box-shadow: 0 10px 22px rgba(0, 102, 217, 0.25);

  &:hover {
    background: #0057bb;
  }
`;