import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Page = styled.main`
  min-height: 100vh;
  background: ${theme.colors.pageBackground};

  display: flex;
  justify-content: center;
  align-items: stretch;

  position: relative;
  overflow: hidden;
`;

export const Content = styled.section`
  width: 100%;
  max-width: 1280px;
  padding: 48px 32px;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  z-index: 2;

  @media (max-width: 760px) {
    padding: 36px 20px;
  }
`;

export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
`;

export const LogoBox = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: ${theme.colors.primary};
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoText = styled.span`
  font-size: 18px;
  font-weight: 900;
  color: ${theme.colors.textDark};
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 42px;

  @media (max-width: 760px) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.h1`
  margin: 0 0 14px;
  font-size: 42px;
  font-weight: 900;
  color: ${theme.colors.textDark};

  @media (max-width: 760px) {
    font-size: 36px;
  }
`;

export const Subtitle = styled.p`
  margin: 0 auto;
  max-width: 520px;
  font-size: 17px;
  line-height: 1.5;
  color: ${theme.colors.textMuted};

  @media (max-width: 760px) {
    font-size: 15px;
  }
`;

export const RoleGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 26px;
  margin-bottom: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const LoginCard = styled.form`
  width: 100%;
  max-width: 400px;
  background: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: 18px;
  padding: 32px;
  box-shadow: ${theme.shadows.card};

  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (max-width: 480px) {
    padding: 26px 20px;
    border-radius: 16px;
  }
`;

export const ErrorText = styled.p`
  margin: -4px 0 0;
  color: #dc2626;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
`;

export const ForgotPassword = styled.a`
  margin-top: 2px;
  text-align: center;
  color: ${theme.colors.primary};
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding-top: 42px;

  display: flex;
  align-items: center;
  gap: 22px;

  font-size: 13px;
  color: ${theme.colors.textMuted};

  @media (max-width: 480px) {
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const FooterLink = styled.a`
  color: ${theme.colors.textMuted};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const SideImage = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 33%;
  height: 100%;
  background:
    linear-gradient(
      rgba(245, 247, 251, 0.78),
      rgba(245, 247, 251, 0.86)
    ),
    url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80");
  background-size: cover;
  background-position: center;
  opacity: 0.75;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const LeftGlow = styled.div`
  position: absolute;
  left: -120px;
  top: -120px;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: rgba(0, 102, 217, 0.08);
  filter: blur(70px);
`;

export const BottomGlow = styled.div`
  position: absolute;
  right: 80px;
  bottom: -160px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: rgba(0, 102, 217, 0.08);
  filter: blur(75px);
`;

export const Divider = styled.span`
  width: 1px;
  height: 14px;
  background: ${theme.colors.border};
`;