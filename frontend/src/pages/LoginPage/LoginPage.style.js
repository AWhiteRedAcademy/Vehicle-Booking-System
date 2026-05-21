import styled from "styled-components";

export const Page = styled.main`
  min-height: 100vh;
  background: #f5f7fb;

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
  background: #0066d9;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoText = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 52px;
`;

export const Title = styled.h1`
  margin: 0 0 14px;
  font-size: 42px;
  font-weight: 900;
  color: #0f172a;
`;

export const Subtitle = styled.p`
  margin: 0 auto;
  max-width: 520px;
  font-size: 17px;
  line-height: 1.5;
  color: #475569;
`;

export const RoleGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 26px;
  margin-bottom: 48px;
`;

export const LoginCard = styled.form`
  width: 100%;
  max-width: 380px;
  background: white;
  border: 1px solid #d7dce5;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);

  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const ForgotPassword = styled.a`
  margin-top: 6px;
  text-align: center;
  color: #0066d9;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding-top: 42px;

  display: flex;
  align-items: center;
  gap: 22px;

  font-size: 13px;
  color: #475569;
`;

export const FooterLink = styled.a`
  color: #475569;
  cursor: pointer;

  &:hover {
    color: #0066d9;
  }
`;

export const SideImage = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 33%;
  height: 100%;
  background: linear-gradient(
      rgba(245, 247, 251, 0.78),
      rgba(245, 247, 251, 0.86)
    ),
    url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80");
  background-size: cover;
  background-position: center;
  opacity: 0.75;
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
  background: #cbd5e1;
`;

/*
@media (max-width: 900px) {
  ${RoleGrid} {
    grid-template-columns: 1fr;
  }

  ${SideImage} {
    display: none;
  }

  ${Title} {
    font-size: 34px;
  }
`;

*/