import styled from "styled-components";

export const Card = styled.button`
  position: relative;
  width: 100%;
  min-height: 145px;
  border-radius: 12px;
  border: 2px solid ${({ $selected }) => ($selected ? "#0066d9" : "#d7dce5")};
  background: #ffffff;
  padding: 26px 22px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: 0.2s ease;

  &:hover {
    border-color: #0066d9;
    transform: translateY(-2px);
  }
`;

export const IconCircle = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #edf4ff;
  color: #0066d9;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 16px;

  svg {
    font-size: 26px;
  }
`;

export const Title = styled.h3`
  margin: 0 0 9px;
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
`;

export const Description = styled.p`
  margin: 0;
  max-width: 280px;
  font-size: 12px;
  line-height: 1.5;
  color: #475569;
`;

export const SelectedIcon = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  color: #0066d9;

  display: flex;
  align-items: center;
  justify-content: center;
`;