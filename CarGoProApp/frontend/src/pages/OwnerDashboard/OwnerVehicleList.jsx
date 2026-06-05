import { useMemo } from 'react';
import VehicleCard from "../../components/cards/VehicleCard.jsx";
import { VehicleGrid } from "../../components/dashboard/DashboardPage.styles.js";

export default function OwnerVehicleList({
  vehicles = [],
  searchTerm = "",
  availabilityFilter = "all",
  onDelete,
}) {
  // Filter the vehicles list based on combined parameters
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const searchValue = searchTerm.toLowerCase();
      
      const make = vehicle.make?.toLowerCase() || "";
      const model = vehicle.model?.toLowerCase() || "";
      const category = vehicle.category?.toLowerCase() || "";
      const licenseNumber = vehicle.licenseNumber?.toLowerCase() || "";
      const vinNumber = vehicle.vinNumber?.toLowerCase() || "";
      const modelYear = vehicle.modelYear?.toString() || "";

      const matchesSearch =
        make.includes(searchValue) ||
        model.includes(searchValue) ||
        category.includes(searchValue) ||
        licenseNumber.includes(searchValue) ||
        vinNumber.includes(searchValue) ||
        modelYear.includes(searchValue);

      const matchesAvailability =
        availabilityFilter === "all" || vehicle.isAvailable === availabilityFilter;

      return matchesSearch && matchesAvailability;
    });
  }, [vehicles, searchTerm, availabilityFilter]);

  return (
    <VehicleGrid>
      {filteredVehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.vehicleId || vehicle.id}
          vehicle={vehicle}
          onDelete={onDelete}
        />
      ))}
    </VehicleGrid>
  );
}

