import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 24px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileCard = styled.section`
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
  padding: 28px;
  text-align: center;
`;

export const AvatarLarge = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 999px;
  background: ${theme.colors.primary};
  color: white;
  font-size: 36px;
  font-weight: 900;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
`;

export const UserMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserName = styled.h2`
  margin: 0;
  color: ${theme.colors.textDark};
  font-size: 24px;
  font-weight: 900;
`;

export const UserEmailText = styled.p`
  margin: 8px 0 14px;
  color: ${theme.colors.textMuted};
`;

export const DetailCard = styled.section`
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.shadows.card};
  padding: 28px;
`;

export const DetailTitle = styled.h3`
  margin: 0 0 22px;
  color: ${theme.colors.textDark};
  font-size: 20px;
  font-weight: 900;
`;

export const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const DetailIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.border};
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const DetailLabel = styled.p`
  margin: 0;
  color: ${theme.colors.textMuted};
  font-size: 13px;
  font-weight: 800;
`;

export const DetailValue = styled.p`
  margin: 4px 0 0;
  color: ${theme.colors.textDark};
  font-weight: 900;
`;

export const StatusBadge = styled.span`
  border-radius: 999px;
  padding: 7px 13px;
  font-size: 12px;
  font-weight: 900;

  color: ${({ $status }) =>
    $status === "Active" ? "#15803d" : "#c2410c"};

  background: ${({ $status }) =>
    $status === "Active" ? "#dcfce7" : "#fff7ed"};
`;

export const BackButton = styled.button`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.inputBackground};
  color: ${theme.colors.primary};
  padding: 12px 16px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.cardBackground};
  }
`;