import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import VehicleCard from "../../../components/cards/VehicleCard.jsx";
import { VehicleGrid, EmptyCard } from "../../../components/dashboard/DashboardPage.styles.js";
import { AddVehicleCard, PlusCircle } from "../OwnerDashboard.style.js";

export default function OwnerVehicleList({
  vehicles = [],
  searchTerm = "",
  availabilityFilter = "all",
  categoryFilter = "all",
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const searchValue = searchTerm.toLowerCase().trim();

      const vehicleId = vehicle.vehicleId?.toString() || vehicle.id?.toString() || "";
      const make = vehicle.make?.toLowerCase() || "";
      const model = vehicle.model?.toLowerCase() || "";
      const category = vehicle.category?.toLowerCase() || "";
      const licenseNumber = vehicle.licenseNumber?.toLowerCase() || "";
      const vinNumber = vehicle.vinNumber?.toLowerCase() || "";
      const modelYear = vehicle.modelYear?.toString() || "";

      const matchesSearch =
        searchValue === "" ||
        vehicleId.includes(searchValue) ||
        make.includes(searchValue) ||
        model.includes(searchValue) ||
        category.includes(searchValue) ||
        licenseNumber.includes(searchValue) ||
        vinNumber.includes(searchValue) ||
        modelYear.includes(searchValue);

      const matchesAvailability =
        availabilityFilter === "all" || vehicle.isAvailable === availabilityFilter;

      const matchesCategory =
        categoryFilter === "all" || vehicle.category === categoryFilter;

      return matchesSearch && matchesAvailability && matchesCategory;
    });
  }, [vehicles, searchTerm, availabilityFilter, categoryFilter]);

  if (filteredVehicles.length === 0) {
    return (
      <VehicleGrid>
        <EmptyCard>No vehicles found.</EmptyCard>
        <AddVehicleCard type="button" onClick={() => navigate("/owner/vehicles/add")}>
          <PlusCircle>+</PlusCircle>
          <h3>Add New Vehicle</h3>
          <p>Expand your fleet by adding another vehicle profile.</p>
        </AddVehicleCard>
      </VehicleGrid>
    );
  }

  return (
    <VehicleGrid>
      {filteredVehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.vehicleId || vehicle.id}
          vehicle={vehicle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      <AddVehicleCard type="button" onClick={() => navigate("/owner/vehicles/add")}>
        <PlusCircle>+</PlusCircle>
        <h3>Add New Vehicle</h3>
        <p>Expand your fleet by adding another vehicle profile.</p>
      </AddVehicleCard>
    </VehicleGrid>
  );
}
