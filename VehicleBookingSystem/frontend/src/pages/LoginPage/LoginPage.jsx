import { useState } from "react";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import RoleCard from "../../components/cards/RoleCard";
import TextInput from "../../components/inputs/TextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

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
  const [selectedRole, setSelectedRole] = useState("Driver");

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Selected role:", selectedRole);
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
          <LogoText>FleetPro</LogoText>
        </LogoArea>

        <Header>
          <Title>Welcome back</Title>
          <Subtitle>
            Select your workspace to continue managing your vehicle operations
            efficiently.
          </Subtitle>
        </Header>

        <RoleGrid>
          <RoleCard
            title="Owner"
            description="Manage fleet assets, financial reports, and overall organization growth."
            icon={<GroupsIcon />}
            selected={selectedRole === "Owner"}
            onClick={() => setSelectedRole("Owner")}
          />

          <RoleCard
            title="Company"
            description="Access assigned vehicles, track routes, and report maintenance needs."
            icon={<LocalShippingIcon />}
            selected={selectedRole === "Driver"}
            onClick={() => setSelectedRole("Driver")}
          />

          <RoleCard
            title="Administrator"
            description="Oversee user permissions, system settings, and data integrity."
            icon={<AdminPanelSettingsIcon />}
            selected={selectedRole === "Administrator"}
            onClick={() => setSelectedRole("Administrator")}
          />
        </RoleGrid>

        <LoginCard onSubmit={handleSubmit}>
          <TextInput
            label="Email Address"
            type="email"
            placeholder="name@company.com"
          />

          <TextInput label="Password" type="password" placeholder="••••••••" />

          <PrimaryButton>Sign In</PrimaryButton>

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