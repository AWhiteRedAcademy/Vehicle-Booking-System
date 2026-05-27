const STORAGE_KEY = "fleetpro_mock_owner_vehicles";

export const defaultOwnerVehicles = [
  {
    vehicleId: 1,
    ownerId: 2,
    make: "BMW",
    model: "540i",
    category: "Executive Sedan",
    dailyRate: 1200,
    isAvailable: true,
  },
  {
    vehicleId: 2,
    ownerId: 2,
    make: "Toyota",
    model: "Fortuner",
    category: "SUV",
    dailyRate: 950,
    isAvailable: true,
  },
  {
    vehicleId: 3,
    ownerId: 2,
    make: "Mercedes-Benz",
    model: "C-Class",
    category: "Sedan",
    dailyRate: 1100,
    isAvailable: false,
  },
];

export function getMockOwnerVehicles() {
  const storedVehicles = localStorage.getItem(STORAGE_KEY);

  if (!storedVehicles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOwnerVehicles));
    return defaultOwnerVehicles;
  }

  return JSON.parse(storedVehicles);
}

export function getMockOwnerVehicleById(vehicleId) {
  const vehicles = getMockOwnerVehicles();

  return vehicles.find((vehicle) => vehicle.vehicleId === Number(vehicleId));
}

export function updateMockOwnerVehicle(updatedVehicle) {
  const vehicles = getMockOwnerVehicles();

  const updatedVehicles = vehicles.map((vehicle) =>
    vehicle.vehicleId === Number(updatedVehicle.vehicleId)
      ? updatedVehicle
      : vehicle
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVehicles));

    return updatedVehicles;
    

}

    export function deleteMockOwnerVehicle(vehicleId) {
  const vehicles = getMockOwnerVehicles();

  const updatedVehicles = vehicles.filter(
    (vehicle) => vehicle.vehicleId !== Number(vehicleId)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVehicles));

  return updatedVehicles;
}