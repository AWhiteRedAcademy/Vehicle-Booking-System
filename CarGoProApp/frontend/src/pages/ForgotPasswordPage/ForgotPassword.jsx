import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";

import TextInput from "../../components/inputs/TextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { 
  initiateForgotPassword, 
  verifyResetOtp, 
  completePasswordReset 
} from "../../HTTPS Services/ForgetPass";

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
  const navigate = useNavigate();

  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRequestOtp(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await initiateForgotPassword(email.trim());
      setMessage("If this email exists, an OTP security code has been sent.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the 6-digit OTP code.");
      return;
    }

    setLoading(true);
    try {
      const data = await verifyResetOtp(email.trim(), otp.trim());
      setMessage(data.message || "OTP verified successfully. Set your new password.");
      setStep(3);
    } catch (err) {
      setError(err.message || "Invalid or expired OTP code.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await completePasswordReset(email.trim(), newPassword);
      setMessage(data.message || "Password updated successfully!");
      setStep(4);
    } catch (err) {
      setError(err.message || "Failed to update password. Session expired.");
    } finally {
      setLoading(false);
    }
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
            {step === 1 && "Enter your email address to receive a 6-digit security code."}
            {step === 2 && `Enter the validation OTP code sent to ${email}.`}
            {step === 3 && "Create a secure new password for your account."}
            {step === 4 && "Your password has been changed successfully."}
          </Subtitle>
        </Header>

        {message && (
          <SuccessBox>
            <CheckCircleOutlinedIcon fontSize="small" />
            <span>{message}</span>
          </SuccessBox>
        )}

        {error && <ErrorText style={{ marginBottom: "14px" }}>{error}</ErrorText>}

        {step === 1 && (
          <Form onSubmit={handleRequestOtp}>
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="e.g. administrator@cargo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<EmailOutlinedIcon fontSize="small" />}
              disabled={loading}
            />
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Verification Code"}
              <ArrowForwardIcon fontSize="small" />
            </PrimaryButton>
          </Form>
        )}

        {step === 2 && (
          <Form onSubmit={handleVerifyOtp}>
            <TextInput
              label="Verification Code (OTP)"
              name="otp"
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              leftIcon={<PinOutlinedIcon fontSize="small" />}
              disabled={loading}
            />
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP Code"}
              <ArrowForwardIcon fontSize="small" />
            </PrimaryButton>
          </Form>
        )}

        {step === 3 && (
          <Form onSubmit={handleResetPassword}>
            <TextInput
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="Minimum 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              leftIcon={<LockOutlinedIcon fontSize="small" />}
              disabled={loading}
            />
            <TextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Re-type new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<LockOutlinedIcon fontSize="small" />}
              disabled={loading}
            />
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Saving..." : "Update Password"}
              <ArrowForwardIcon fontSize="small" />
            </PrimaryButton>
          </Form>
        )}

        {step === 4 && (
          <PrimaryButton type="button" onClick={() => navigate("/login")}>
            Proceed to Login
            <ArrowForwardIcon fontSize="small" />
          </PrimaryButton>
        )}

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
