import React, { useState } from "react";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import RoleCard from "../../components/cards/RoleCard";
import TextInput from "../../components/inputs/TextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { handleSignInSubmit } from "../../HTTPS Services/SignIn";

import {
  Page,
  Content,
  LogoArea,
  LogoBox,
  LogoText,
  Header,
  Title,
  Subtitle,
  RoleGrid,
  LoginCard,
  ForgotPassword,
  Footer,
  FooterLink,
  SideImage,
  LeftGlow,
  BottomGlow,
  Divider,
} from "./LoginPage.style";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const onSubmitHandler = (e) => {
    e.preventDefault();
    setError(''); // Clear previous execution warnings
    
    handleSignInSubmit(email, password, setError);
  };

  return (
    <Page>
      <LeftGlow />
      <BottomGlow />
      <SideImage />

      <Content>
        <LogoArea>
          <LogoBox>
            <DirectionsCarIcon fontSize="small" />
          </LogoBox>
          <LogoText>FleetPro</LogoText>
        </LogoArea>

        <Header>
          <Title>Welcome back</Title>
          <Subtitle>
            Select your workspace to continue managing your vehicle operations
            efficiently.
          </Subtitle>
        </Header>

        <LoginCard onSubmit={onSubmitHandler}>
          <TextInput
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: "#ef4444", fontSize: "14px", margin: "10px 0" }}>{error}</p>}

          <PrimaryButton type="submit">
          Sign In
          </PrimaryButton>


          <ForgotPassword href="#">Forgot password?</ForgotPassword>
        </LoginCard>

        <Footer>
          <FooterLink href="#">
            <HelpOutlineOutlinedIcon
              fontSize="inherit"
              style={{ verticalAlign: "middle", marginRight: "4px" }}
            />
            Need assistance?
          </FooterLink>

          <Divider />

          <FooterLink href="#">Privacy Policy</FooterLink>
        </Footer>
      </Content>
    </Page>
  );
}

export default LoginPage;