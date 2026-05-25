import React, { useEffect, useState, useMemo } from 'react';
import VehicleCard from "../../components/cards/VehicleCard.jsx";
import { authFetch } from "../../HTTPS Services/Auth.js"; 
import { VehicleGrid, EmptyCard, ErrorCard } from "../../components/dashboard/DashboardPage.styles.js";
import { AddVehicleCard, PlusCircle } from "./OwnerDashboard.style";

export default function OwnerVehicleList({ vehicles = [], searchTerm = "", availabilityFilter = "all" }) {
  
  // Filter the vehicles 
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const searchValue = searchTerm.toLowerCase();
      
      const make = vehicle.make?.toLowerCase() || "";
      const model = vehicle.model?.toLowerCase() || "";
      const category = vehicle.category?.toLowerCase() || "";

      const matchesSearch =
        make.includes(searchValue) ||
        model.includes(searchValue) ||
        category.includes(searchValue);

      const matchesAvailability =
        availabilityFilter === "all" ||
        (availabilityFilter === "available" && vehicle.isAvailable) ||
        (availabilityFilter === "unavailable" && !vehicle.isAvailable);

      return matchesSearch && matchesAvailability;
    });
  }, [vehicles, searchTerm, availabilityFilter]);

  return (
    <VehicleGrid>
      {filteredVehicles.length === 0 ? (
        <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          No vehicles match your search criteria.
        </p>
      ) : (
        filteredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id || vehicle.vehicleId}
            vehicle={vehicle} 
          />
        ))
      )}

      <AddVehicleCard type="button">
        <PlusCircle>+</PlusCircle>
        <h3>Add New Vehicle</h3>
        <p>Expand your fleet by adding another vehicle profile.</p>
      </AddVehicleCard>
    </VehicleGrid>
  );
}