import styled from "styled-components";
import { theme } from "../../styles/theme";
export const SuccessBox = styled.div`
  padding: 10px 14px;
  margin-bottom: 8px;
  height:40px
  border-radius: 10px;
  background: #ecfdf5;
  border: 1px solid #86efac;

  display: flex;
  align-items: center;
  gap: 10px;

  width: fit-content;
  max-width: 320px;

  h3 {
    margin: 0;
    font-size: 20px;
    color: #065f46;
    font-weight: 700;
  }

  p {
    margin: 2px 0 0;
    font-size: 11px;
    color: #065f46;
    line-height: 1.3;
  }

  svg {
    color: #065f46;
    font-size: 18px;
  }
`;