import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import {
  Overlay,
  Modal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Select,
  ModalFooter,
  CancelButton,
  SaveButton,
  ErrorMessage,
  PendingNotice,
} from "./EditUserModal.style";

const validRoles = ["Guest", "Owner", "Company", "Admin"];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  return /^0\d{9}$/.test(phoneNumber);
}

function EditUserModal({ user, onClose, onSave, isSaving = false }) {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    role: "Guest",
    lastLogin: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    setFormData({
      userId: user.userId || "",
      name: user.name ?? "",
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
      role: user.role || "Guest",
      lastLogin: user.lastLogin ?? "Never",
    });

    setError("");
  }, [user]);

  if (!user) return null;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function validateForm() {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phoneNumber = formData.phoneNumber.trim();

    if (!name) {
      return "Name is required.";
    }

    if (name.length < 2) {
      return "Name must be at least 2 characters.";
    }

    if (!email) {
      return "Email is required.";
    }

    if (!isValidEmail(email)) {
      return "Please enter a valid email address.";
    }

    if (!phoneNumber) {
      return "Phone number is required.";
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      return "Phone number must be exactly 10 digits and start with 0.";
    }

    if (!validRoles.includes(formData.role)) {
      return "Invalid role selected.";
    }

    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const updatedUser = {
      userId: Number(formData.userId),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      role: formData.role || "Guest",
      lastLogin: formData.lastLogin,
    };

    onSave(updatedUser);
  }

  const willBePending = formData.role === "Guest";

  return (
    <Overlay>
      <Modal>
        <ModalHeader>
          <ModalTitle>Edit User</ModalTitle>

          <CloseButton type="button" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label>Full Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Smith"
              />
            </FormGroup>

            <FormGroup>
              <Label>Email Address</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@company.com"
              />
            </FormGroup>

            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. 0712345678"
                maxLength="10"
              />
            </FormGroup>

            <FormGroup>
              <Label>Role</Label>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Guest">No role — Pending</option>
                <option value="Owner">Owner</option>
                <option value="Company">Company</option>
                <option value="Admin">Admin</option>
              </Select>
            </FormGroup>

            {willBePending && (
              <PendingNotice>
                This user will remain <strong>Pending</strong> until a role is assigned.
              </PendingNotice>
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}
          </ModalBody>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>

            <SaveButton type="submit" disabled={isSaving}>
              <SaveIcon fontSize="small" />
              {isSaving ? "Saving..." : "Save Changes"}
            </SaveButton>
          </ModalFooter>
        </form>
      </Modal>
    </Overlay>
  );
}

export default EditUserModal;