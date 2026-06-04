import { useState } from "react";
import { Link } from "react-router-dom";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import TextInput from "../../components/inputs/TextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import {
  Page,
  ResetCard,
  LogoArea,
  Header,
  Form,
  Divider,
  BackLink,
  SuccessBox,
  ErrorText,
} from "./ForgotPassword.style";

import {
  LogoBox,
  LogoText,
  Title,
  Subtitle,
} from "../LoginPage/LoginPage.style";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Later this should call your backend forgot-password endpoint.
    setMessage("If this email exists, a reset link has been sent.");
  }

  return (
    <Page>
      <ResetCard>
        <LogoArea>
          <LogoBox>
            <DirectionsCarIcon fontSize="small" />
          </LogoBox>

          <LogoText>CarGo</LogoText>
        </LogoArea>

        <Header>
          <Title>Reset your password</Title>

          <Subtitle>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </Subtitle>
        </Header>

        {message && (
          <SuccessBox>
            <CheckCircleOutlinedIcon fontSize="small" />
            <span>{message}</span>
          </SuccessBox>
        )}

        <Form onSubmit={handleSubmit}>
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="e.g. administrator@cargo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            leftIcon={<EmailOutlinedIcon fontSize="small" />}
          />

          {error && <ErrorText>{error}</ErrorText>}

          <PrimaryButton type="submit">
            Send Reset Link
            <ArrowForwardIcon fontSize="small" />
          </PrimaryButton>
        </Form>

        <Divider />

        <BackLink as={Link} to="/login">
          <ArrowBackIcon fontSize="small" />
          Back to Login
        </BackLink>
      </ResetCard>
    </Page>
  );
}

export default ForgotPasswordPage;