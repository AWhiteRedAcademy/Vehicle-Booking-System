import styled from "styled-components";
import { theme } from "../../styles/theme";

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
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
