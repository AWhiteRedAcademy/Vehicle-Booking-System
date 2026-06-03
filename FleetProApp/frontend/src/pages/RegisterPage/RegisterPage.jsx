import { useState } from "react";
import { Link } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ShieldIcon from "@mui/icons-material/Shield";

import TextInput from "../../components/inputs/TextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { handleRegisterSubmit } from "../../HTTPS Services/Register";

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
  FooterLink,
  SideImage,
  LeftGlow,
  BottomGlow,
} from "../LoginPage/LoginPage.style.js";

import { SuccessBox, ErrorBox } from "./RegisterPage.style.js";

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSuccessMessage("");

    if (errors.form) setErrors((prev) => ({ ...prev, form: "" }));
  } // Cleaned up the loose stray bracket that was here

  function validateForm() {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Name cannot contain numbers";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain @";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const dataToSend = { ...formData };

      handleRegisterSubmit(dataToSend)
        .then(() => {
          setSuccessMessage("Registration successful! Redirecting to login...");

          setFormData({
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          });

          setTimeout(() => {
            window.location.href = "/login";
          }, 1200);
        })
        .catch((err) => {
          setSuccessMessage("");
          setErrors({ form: err.message || "Registration failed" });
        });
    }
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
          <Title>Join the Fleet</Title>
          <Subtitle>Create your professional logistics account today.</Subtitle>
        </Header>

        <LoginCard onSubmit={handleSubmit}>
          {successMessage && (
            <SuccessBox>
              <ShieldIcon />
              <div>
                <h3>Success!</h3>
                <p>{successMessage}</p>
              </div>
            </SuccessBox>
          )}

          {errors.form && <ErrorBox>{errors.form}</ErrorBox>}

          <TextInput
            label="Full Name"
            name="fullName"
            placeholder=""
            value={formData.fullName}
            onChange={handleChange}
            leftIcon={<PersonIcon fontSize="small" />}
            error={errors.fullName}
          />

          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
            icon={<EmailIcon fontSize="small" />}
            error={errors.email}
          />

          <TextInput
            label="Phone Number"
            name="phone"
            placeholder=""
            value={formData.phone}
            onChange={handleChange}
            icon={<PhoneIcon fontSize="small" />}
            error={errors.phone}
          />

          <TextInput
            label="Create Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            leftIcon={<ShieldIcon fontSize="small" />}
            rightIcon={
              showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )
            }
            onRightIconClick={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            leftIcon={<ShieldIcon fontSize="small" />}
            rightIcon={
              showConfirmPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )
            }
            onRightIconClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            error={errors.confirmPassword}
          />

          <PrimaryButton type="submit">Create Account</PrimaryButton>

          <FooterLink as={Link} to="/login">
            Already have an account? Sign In
          </FooterLink>
        </LoginCard>
      </Content>
    </Page>
  );
}

export default RegisterPage;
