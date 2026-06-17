import { authFetch } from "./Auth.js";

export const addVehicle = async (vehicleData) => {
    return authFetch("api/Vehicle", {
        method: "POST",
        body: JSON.stringify(vehicleData),
    });
};

export const getVehicleById = async (id) => {
    return authFetch(`api/Vehicle/${id}`);
};

export const updateVehicle = async (id, updatedData) => {
    return authFetch(`api/Vehicle/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
    });
};

export const getVehicles = async () => {
    const vehicles = await authFetch("api/Vehicle/user/context", {
        method: "GET",
    });

    const normalizedVehicles =
        typeof vehicles === "string" ? JSON.parse(vehicles) : vehicles;

    if (!Array.isArray(normalizedVehicles)) {
        return [];
    }

    return normalizedVehicles.map((vehicle) => {
        return {
            vehicleId: vehicle.vehicleId || 0,
            ownerId: vehicle.ownerId || 0,
            make: vehicle.make || "",
            model: vehicle.model || "",
            licenseNumber: vehicle.licenseNumber || "",
            vinNumber: vehicle.vinNumber || "",
            modelYear: vehicle.modelYear || 0,
            category: vehicle.category || "",
            dailyRate: vehicle.dailyRate || 0,
            isAvailable: vehicle.isAvailable || "Available",
        };
    });
};

export const deleteVehicle = async (id) => {
    return authFetch(`api/Vehicle/${id}`, {
        method: "DELETE",
    });
};

export const getOwnerBookings = async () => {
    const bookings = await authFetch("api/Booking/owner/context", {
        method: "GET",
    });

    const normalizedBookings =
        typeof bookings === "string" ? JSON.parse(bookings) : bookings;

    if (!Array.isArray(normalizedBookings)) {
        return [];
    }

    return normalizedBookings.map((booking) => ({
        bookingId: booking.bookingId || 0,
        companyId: booking.companyId || 0,
        vehicleId: booking.vehicleId || 0,
        startDate: booking.startDate || "",
        endDate: booking.endDate || "",
        totalCost: booking.totalCost || 0,
        status: booking.status || "Pending",
        licenseNumber: booking.licenseNumber || "",
        make: booking.make || "",
        model: booking.model || "",
        category: booking.category || "",
        companyName: booking.companyName || "",
    }));
};