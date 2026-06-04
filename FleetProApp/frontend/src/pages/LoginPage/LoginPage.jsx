import React, { useState } from "react";
import { Link } from "react-router-dom";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
  LoginCard,
  ForgotPassword,
  Footer,
  FooterLink,
  SideImage,
  LeftGlow,
  BottomGlow,
  Divider,
  ErrorText,
} from "./LoginPage.style";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function onSubmitHandler(event) {
    event.preventDefault();
    setError("");

    handleSignInSubmit(email, password, setError);
  }

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
          <LogoText>CarGo</LogoText>
        </LogoArea>

        <Header>
          <Title>Welcome back</Title>
          <Subtitle>Access your executive dashboard</Subtitle>
        </Header>

        <LoginCard onSubmit={onSubmitHandler}>
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            leftIcon={<EmailIcon fontSize="small" />}
          />

          <TextInput
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            leftIcon={<LockIcon fontSize="small" />}
            rightIcon={
              showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )
            }
            onRightIconClick={() =>
              setShowPassword((currentValue) => !currentValue)
            }
          />

          {error && <ErrorText>{error}</ErrorText>}

          <PrimaryButton type="submit">Sign In</PrimaryButton>

          <ForgotPassword href="/register">
            No Account? Register Here
          </ForgotPassword>
          <ForgotPassword as={Link} to="/forgot-password">
            Forgot password?
          </ForgotPassword>
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
