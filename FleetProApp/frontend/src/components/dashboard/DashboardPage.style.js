import styled from "styled-components";
import { theme } from "../../styles/theme";

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SectionEyebrow = styled.p`
  margin: 0 0 8px;
  color: ${theme.colors.primary};
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.6px;
  text-transform: uppercase;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 32px;
  font-weight: 900;
`;

export const SectionText = styled.p`
  margin: 8px 0 0;
  color: ${theme.colors.textMuted};
  font-size: 15px;
`;

export const AddButton = styled.button`
  border: none;
  border-radius: ${theme.radius.medium};
  padding: 13px 17px;
  background: ${theme.colors.primary};
  color: white;
  font-weight: 900;
  cursor: pointer;
  box-shadow: ${theme.shadows.button};

  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

export const StatsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 22px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const Toolbar = styled.section`
  margin-bottom: 22px;
  padding: 16px;
  background: white;
  border: 1px solid #e3e8f0;
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};

  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 260px;
  height: 48px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.inputBackground};
  padding: 0 15px;
  outline: none;
  color: ${theme.colors.textDark};

  &:focus {
    border-color: ${theme.colors.primary};
    background: white;
  }

  @media (max-width: 700px) {
    min-width: 0;
    width: 100%;
  }
`;

export const FilterSelect = styled.select`
  height: 48px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: white;
  padding: 0 14px;
  outline: none;
  color: ${theme.colors.textDark};
  font-weight: 700;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const VehicleGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyCard = styled.div`
  padding: 26px;
  background: white;
  border: 1px solid #e3e8f0;
  border-radius: ${theme.radius.large};
  color: ${theme.colors.textMuted};
  box-shadow: ${theme.shadows.card};
`;

export const ErrorCard = styled(EmptyCard)`
  color: #b91c1c;
  background: #fef2f2;
  border-color: #fecaca;
`;