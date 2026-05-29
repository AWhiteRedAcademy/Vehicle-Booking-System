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
  TwoColumnGrid,
  ModalFooter,
  CancelButton,
  SaveButton,
  ErrorMessage,
} from "./  EditVehicleModal.style"

function EditVehicleModal({ vehicle, onClose, onSave }) {
  const [formData, setFormData] = useState({
    vehicleId: "",
    ownerId: "",
    make: "",
    model: "",
    category: "",
    dailyRate: "",
    isAvailable: true,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!vehicle) return;

    setFormData({
      vehicleId: vehicle.vehicleId,
      ownerId: vehicle.ownerId,
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      dailyRate: vehicle.dailyRate,
      isAvailable: vehicle.isAvailable,
    });
  }, [vehicle]);

  if (!vehicle) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleStatusChange(event) {
    const value = event.target.value === "true";

    setFormData((currentData) => ({
      ...currentData,
      isAvailable: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.make.trim()) {
      setError("Vehicle make is required.");
      return;
    }

    if (!formData.model.trim()) {
      setError("Vehicle model is required.");
      return;
    }

    if (!formData.dailyRate || Number(formData.dailyRate) <= 0) {
      setError("Daily rate must be greater than 0.");
      return;
    }

    const updatedVehicle = {
      vehicleId: Number(formData.vehicleId),
      ownerId: Number(formData.ownerId),
      make: formData.make,
      model: formData.model,
      category: formData.category,
      dailyRate: Number(formData.dailyRate),
      isAvailable: formData.isAvailable,
    };

    onSave(updatedVehicle);
  }

  return (
    <Overlay>
      <Modal>
        <ModalHeader>
          <ModalTitle>Edit Vehicle</ModalTitle>

          <CloseButton type="button" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label>Vehicle Make</Label>
              <Input
                name="make"
                value={formData.make}
                onChange={handleChange}
                placeholder="e.g. BMW"
              />
            </FormGroup>

            <FormGroup>
              <Label>Model</Label>
              <Input
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. 540i"
              />
            </FormGroup>

            <TwoColumnGrid>
              <FormGroup>
                <Label>Category</Label>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Executive Sedan">Executive Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Cargo">Cargo</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Sedan">Sedan</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <Select
                  value={formData.isAvailable.toString()}
                  onChange={handleStatusChange}
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </Select>
              </FormGroup>
            </TwoColumnGrid>

            <FormGroup>
              <Label>Daily Rate</Label>
              <Input
                type="number"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleChange}
                placeholder="e.g. 1200"
              />
            </FormGroup>

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

export default EditVehicleModal;