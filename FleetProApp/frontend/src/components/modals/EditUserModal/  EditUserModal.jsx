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
} from "./  EditUserModal.style";

function EditUserModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    lastLogin: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    setFormData({
      userId: user.userId,
      name: user.name ?? "",
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
      role: user.role ?? "",
      lastLogin: user.lastLogin ?? "Never",
    });
  }, [user]);

  if (!user) return null;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    const updatedUser = {
      userId: Number(formData.userId),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      role: formData.role,
      lastLogin: formData.lastLogin,
    };

    onSave(updatedUser);
  }

  const willBePending = formData.role === "";

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
              />
            </FormGroup>

            <FormGroup>
              <Label>Role</Label>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">No role — Pending</option>
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

            <SaveButton type="submit">
              <SaveIcon fontSize="small" />
              Save Changes
            </SaveButton>
          </ModalFooter>
        </form>
      </Modal>
    </Overlay>
  );
}

export default EditUserModal;