import styled from "styled-components";
import { theme } from "../../styles/theme";
 
// export const HeaderRow = styled.div`
//   display: flex;
//   align-items: flex-end;
//   justify-content: space-between;
//   gap: 24px;
//   margin-bottom: 24px;
 
//   @media (max-width: 760px) {
//     flex-direction: column;
//     align-items: flex-start;
//   }
// `;

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 760px) {
    display: block;
    margin-bottom: 24px;
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

  @media (max-width: 760px) {
    font-size: 42px;
    line-height: 1.05;
    letter-spacing: -1px;
  }
`;
 
export const SectionText = styled.p`
  margin: 8px 0 0;
  color: ${theme.colors.textMuted};
  font-size: 15px;

  @media (max-width: 760px) {
    font-size: 20px;
    line-height: 1.35;
    max-width: 100%;
  }
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

  @media (max-width: 760px) {
    margin-top: 28px;
    width: 100%;
    max-width: 340px;
    height: 62px;
    border-radius: 20px;
    justify-content: center;
    font-size: 20px;
  }
`;
 
// export const StatsGrid = styled.section`
//   display: grid;
//   grid-template-columns: repeat(4, minmax(0, 1fr));
//   gap: 18px;
//   margin-bottom: 22px;
 
//   @media (max-width: 1100px) {
//     grid-template-columns: repeat(2, minmax(0, 1fr));
//   }
 
//   @media (max-width: 700px) {
//     grid-template-columns: 1fr;
//   }
// `;
 
// export const StatsGrid = styled.section`
//   display: grid;
//   grid-template-columns: repeat(4, minmax(0, 1fr));
//   gap: 18px;
//   margin-bottom: 22px;
 
//   @media (max-width: 1100px) {
//     grid-template-columns: repeat(2, minmax(0, 1fr));
//   }
 
//   @media (max-width: 760px) {
//     display: flex;
//     overflow-x: auto;
//     padding-bottom: 8px;
//     scroll-snap-type: x mandatory;
 
//     > * {
//       min-width: 160px;
//       scroll-snap-align: start;
//     }
 
//     &::-webkit-scrollbar {
//       display: none;
//     }
//   }
// `;

// forces all stats to show in a clean 2x2 layout.
export const StatsGrid = styled.section`
  display: grid;
  /* 1. Change from 4 columns to 5 columns */
  grid-template-columns: repeat(5, minmax(0, 1fr));
  /* 2. Keeps them perfectly tall and flush across the single line */
  grid-auto-rows: 1fr; 
  gap: 18px;
  margin-bottom: 22px;

  @media (max-width: 1200px) {
    /* Wraps down beautifully on medium desktop monitors */
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 760px) {
    /* Drops cleanly onto mobile screens */
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
`;


 
// export const Toolbar = styled.section`
//   margin-bottom: 22px;
//   padding: 16px;
//   /* background: white; */
 
//   background: ${theme.colors.cardBackground};
 
  
//   /* border: 1px solid #e3e8f0; */
//   border: 1px solid ${theme.colors.border};
//   border-radius: ${theme.radius.large};
//   box-shadow: ${theme.shadows.card};
 
//   display: flex;
//   align-items: center;
//   gap: 14px;
 
//   @media (max-width: 700px) {
//     flex-direction: column;
//     align-items: stretch;
//   }
// `;

export const Toolbar = styled.section`
  margin-bottom: 22px;
  padding: 16px;
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};

  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
    padding: 18px;
    border-radius: 26px;
  }
`;
 
// export const SearchInput = styled.input`
//   flex: 1;
//   min-width: 260px;
//   height: 48px;
//   border: 1px solid ${theme.colors.border};
//   border-radius: ${theme.radius.medium};
//   background: ${theme.colors.inputBackground};
//   padding: 0 15px;
//   outline: none;
//   color: ${theme.colors.textDark};
 
//   &:focus {
//     border-color: ${theme.colors.primary};
//     /* background: white; */
//     background: ${theme.colors.cardBackground};
//   }
 
//   @media (max-width: 700px) {
//     min-width: 0;
//     width: 100%;
//   }
// `;

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
    background: ${theme.colors.cardBackground};
  }

  @media (max-width: 760px) {
    min-width: 0;
    width: 100%;
    height: 54px;
    font-size: 16px;
  }
`;
 
// export const FilterSelect = styled.select`
//   height: 48px;
//   border: 1px solid ${theme.colors.border};
//   border-radius: ${theme.radius.medium};
// background: ${theme.colors.cardBackground};
//   padding: 0 14px;
//   outline: none;
//   color: ${theme.colors.textDark};
//   font-weight: 700;
 
//   &:focus {
//     border-color: ${theme.colors.primary};
//   }
// `;

export const FilterSelect = styled.select`
  height: 48px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.cardBackground};
  padding: 0 14px;
  outline: none;
  color: ${theme.colors.textDark};
  font-weight: 700;

  &:focus {
    border-color: ${theme.colors.primary};
  }

  @media (max-width: 760px) {
    width: 100%;
    height: 58px;
    font-size: 16px;
    border-radius: 18px;
  }
`;
 
// export const VehicleGrid = styled.section`
//   display: grid;
//   grid-template-columns: repeat(3, minmax(0, 1fr));
//   gap: 22px;
 
//   @media (max-width: 1100px) {
//     grid-template-columns: repeat(2, minmax(0, 1fr));
//   }
 
//   @media (max-width: 760px) {
//     grid-template-columns: 1fr;
//   }
// `;
 
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
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.large};
  color: ${theme.colors.textMuted};
  box-shadow: ${theme.shadows.card};
`;
 
export const ErrorCard = styled(EmptyCard)`
  color: #b91c1c;
  background: #fef2f2;
  border-color: #fecaca;
`;
 
 
//Add floating add button for owner mobile
export const FloatingActionButton = styled.button`
  display: none;

  @media (max-width: 760px) {
    position: fixed;
    right: 26px;
    bottom: calc(104px + env(safe-area-inset-bottom));
    z-index: 120;

    width: 64px;
    height: 64px;
    border: none;
    border-radius: 999px;
    background: ${theme.colors.primary};
    color: white;
    box-shadow: 0 16px 35px rgba(11, 94, 215, 0.36);
    cursor: pointer;

    display: grid;
    place-items: center;

    svg {
      font-size: 32px;
    }
  }
`;