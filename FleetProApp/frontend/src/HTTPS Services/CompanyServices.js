import { authFetch } from "./Auth.js"; 


export const getBookingsWithVehicleDetails = async () => {
    // Fetch both endpoints concurrently
    const [bookings, vehicles] = await Promise.all([
        authFetch('/api/Booking', {
            method: 'GET',
        }),
        authFetch('/api/Vehicle', {
            method: 'GET',
        })
    ]);

    // Safety parse if authFetch returns a raw string instead of an object
    const normalizedBookings = typeof bookings === 'string' ? JSON.parse(bookings) : bookings;
    const normalizedVehicles = typeof vehicles === 'string' ? JSON.parse(vehicles) : vehicles;

    return normalizedBookings.map(booking => {
        const vehicle = normalizedVehicles.find(v => v.vehicleId === booking.vehicleId) || {};

        return {
            bookingId: booking.bookingid || 0,
            make: vehicle.make || "",
            model: vehicle.model || "",
            licenseNumber: booking.licenseNumber || vehicle.licenseNumber || "",
            category: vehicle.category || "",
            dailyRate: vehicle.dailyRate || 0,
            isAvailable: vehicle.isAvailable || "",
            currentBooking: booking.status || ""
        };
    });
};

export const getVehicleDetails = async () => {

    const [vehicles] = await Promise.all([
        authFetch('/api/Vehicle', {
            method: 'GET',
        })
    ]);

    // Safety parse if authFetch returns a raw string instead of an object
    const normalizedVehicles = typeof vehicles === 'string' ? JSON.parse(vehicles) : vehicles;

    return normalizedVehicles.map(vehicle => {
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
            isAvailable: vehicle.isAvailable || "",
        };
    });
};