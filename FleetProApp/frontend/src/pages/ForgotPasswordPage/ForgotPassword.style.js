import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Page = styled.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(0, 102, 217, 0.08), transparent 32%),
    ${theme.colors.pageBackground};

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;

  @media (max-width: 520px) {
    padding: 20px;
    align-items: flex-start;
  }
`;

export const ResetCard = styled.section`
  width: 100%;
  max-width: 430px;
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: 18px;
  box-shadow: ${theme.shadows.card};
  padding: 38px 32px;
  text-align: center;

  @media (max-width: 520px) {
    padding: 32px 22px;
    border-radius: 16px;
  }
`;

export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 28px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: left;
`;

export const SuccessBox = styled.div`
  width: 100%;
  margin-bottom: 18px;
  padding: 14px 16px;
  border-radius: ${theme.radius.medium};
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #16a34a;
  font-size: 14px;
  font-weight: 800;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const ErrorText = styled.p`
  margin: -4px 0 0;
  color: #dc2626;
  font-size: 13px;
  font-weight: 800;
  text-align: left;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.border};
  margin: 30px 0 24px;
`;

export const BackLink = styled.a`
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 900;
  text-decoration: none;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    text-decoration: underline;
  }
`;