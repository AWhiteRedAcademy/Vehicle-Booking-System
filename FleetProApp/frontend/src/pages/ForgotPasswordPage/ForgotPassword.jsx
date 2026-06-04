import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import TextInput from "../../components/inputs/TextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import {
  requestPasswordReset,
  verifyResetOtp,
  resetPassword,
} from "../../HTTPS Services/ForgotPassword";

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

  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");

  const [otpToken, setOtpToken] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getTitle() {
    if (step === "email") return "Reset your password";
    if (step === "otp") return "Enter verification code";
    return "Create new password";
  }

  function getSubtitle() {
    if (step === "email") {
      return "Enter your email address and we’ll send you a verification code.";
    }

    if (step === "otp") {
      return "Enter the OTP sent to your email address.";
    }

    return "Choose a new password and confirm it below.";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      if (step === "email") {
        if (!email.trim()) {
          setError("Email address is required.");
          return;
        }

        const result = await requestPasswordReset(email.trim());

        setOtpToken(result.otpToken);

        setMessage("If this email exists, a verification code has been sent.");
        setStep("otp");
        return;
      }

      if (step === "otp") {
        if (!otp.trim()) {
          setError("Please enter the OTP.");
          return;
        }

        const result = await verifyResetOtp(email.trim(), otp.trim(), otpToken);

        setResetToken(result.resetToken);
        setMessage("OTP verified. Please create a new password.");
        setStep("reset");
        return;
      }

      if (step === "reset") {
        if (!newPassword || !confirmPassword) {
          setError("Please enter and confirm your new password.");
          return;
        }

        if (newPassword !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }

        await resetPassword(
          email.trim(),
          resetToken,
          newPassword,
          confirmPassword,
        );

        setMessage("Password reset successful. Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }
    } catch (err) {
      setError(err.message || "Unable to reset password.");
    } finally {
      setIsSubmitting(false);
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
          <Title>{getTitle()}</Title>
          <Subtitle>{getSubtitle()}</Subtitle>
        </Header>

        {message && (
          <SuccessBox>
            <CheckCircleOutlinedIcon fontSize="small" />
            <span>{message}</span>
          </SuccessBox>
        )}

        <Form onSubmit={handleSubmit}>
          {step === "email" && (
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="e.g. administrator@cargo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              leftIcon={<EmailOutlinedIcon fontSize="small" />}
            />
          )}

          {step === "otp" && (
            <TextInput
              label="Verification Code"
              name="otp"
              type="text"
              placeholder="Enter OTP from your email"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              leftIcon={<PinOutlinedIcon fontSize="small" />}
            />
          )}

          {step === "reset" && (
            <>
              <TextInput
                label="New Password"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                leftIcon={<LockOutlinedIcon fontSize="small" />}
                rightIcon={
                  showNewPassword ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )
                }
                onRightIconClick={() =>
                  setShowNewPassword((currentValue) => !currentValue)
                }
              />

              <TextInput
                label="Confirm New Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                leftIcon={<LockOutlinedIcon fontSize="small" />}
                rightIcon={
                  showConfirmPassword ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )
                }
                onRightIconClick={() =>
                  setShowConfirmPassword((currentValue) => !currentValue)
                }
              />
            </>
          )}

          {error && <ErrorText>{error}</ErrorText>}

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {step === "email" && (isSubmitting ? "Sending..." : "Send OTP")}
            {step === "otp" && (isSubmitting ? "Verifying..." : "Verify OTP")}
            {step === "reset" &&
              (isSubmitting ? "Resetting..." : "Reset Password")}

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
