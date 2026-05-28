import { authFetch, getCurrentUserId } from "./Auth.js";

function normalizeArray(data) {
  const normalizedData = typeof data === "string" ? JSON.parse(data) : data;
  return Array.isArray(normalizedData) ? normalizedData : [];
}

function normalizeBooking(booking) {
  return {
    bookingId: booking.bookingId || booking.bookingid || 0,
    companyId: booking.companyId || booking.companyid || 0,
    vehicleId: booking.vehicleId || booking.vehicleid || 0,

    make: booking.make || "",
    model: booking.model || "",
    category: booking.category || "",
    licenseNumber: booking.licenseNumber || booking.licensenumber || "",

    ownerName: booking.ownerName || "",
    ownerEmail: booking.ownerEmail || "",
    ownerPhone: booking.ownerPhone || "",

    startDate: booking.startDate || booking.startdate || "",
    endDate: booking.endDate || booking.enddate || "",
    totalCost: booking.totalCost || booking.totalcost || 0,
    dailyRate: booking.dailyRate || booking.dailyrate || 0,

    status: booking.status || "Pending",
    currentBooking: booking.currentBooking || booking.status || "Pending",
  };
}

export const createBooking = async (bookingData) => {
  const companyId = getCurrentUserId();

  if (!companyId) {
    throw new Error("Company ID could not be found. Please log in again.");
  }

  const requestBody = {
    ...bookingData,
    companyId: Number(companyId),
  };

  return authFetch("/api/Booking", {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
};

export const updateBooking = async (id, bookingData) => {
  return authFetch(`/api/Booking/${id}`, {
    method: "PUT",
    body: JSON.stringify(bookingData),
  });
};

export const deleteBooking = async (id) => {
  return authFetch(`/api/Booking/${id}`, {
    method: "DELETE",
  });
};

export const getCurrentCompanyBookings = async () => {
  const bookings = await authFetch("/api/Booking/company/current", {
    method: "GET",
  });

  return normalizeArray(bookings).map(normalizeBooking);
};

export const getCompanyBookingHistory = async () => {
  const bookings = await authFetch("/api/Booking/company/history", {
    method: "GET",
  });

  return normalizeArray(bookings).map(normalizeBooking);
};

export const getBookingsWithVehicleDetails = async () => {
  const [bookings, vehicles] = await Promise.all([
    authFetch("/api/Booking", {
      method: "GET",
    }),
    authFetch("/api/Vehicle", {
      method: "GET",
    }),
  ]);

  const normalizedBookings = normalizeArray(bookings);
  const normalizedVehicles = normalizeArray(vehicles);

  return normalizedVehicles.map((vehicle) => {
    const relatedBookings = normalizedBookings.filter(
      (booking) => booking.vehicleId === vehicle.vehicleId
    );

    const activeBooking =
      relatedBookings.find((booking) => booking.status === "Confirmed") ||
      relatedBookings.find((booking) => booking.status === "Pending") ||
      relatedBookings[0] ||
      null;

    return {
      bookingId: activeBooking?.bookingId || 0,
      vehicleId: vehicle.vehicleId || 0,
      ownerId: vehicle.ownerId || 0,
      companyId: activeBooking?.companyId || 0,
      make: vehicle.make || "",
      model: vehicle.model || "",
      licenseNumber: activeBooking?.licenseNumber || vehicle.licenseNumber || "",
      vinNumber: vehicle.vinNumber || "",
      modelYear: vehicle.modelYear || 0,
      category: vehicle.category || "",
      dailyRate: vehicle.dailyRate || 0,
      isAvailable: vehicle.isAvailable || "Available",
      currentBooking: activeBooking?.status || "No booking",
      startDate: activeBooking?.startDate || "",
      endDate: activeBooking?.endDate || "",
      totalCost: activeBooking?.totalCost || 0,
    };
  });
};

export const getVehicleDetails = async () => {
    const vehicles = await authFetch("/api/Vehicle", {
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

            ownerName: vehicle.ownerName || vehicle.owner?.name || "",
            ownerEmail: vehicle.ownerEmail || vehicle.owner?.email || "",
            ownerPhone: vehicle.ownerPhone || vehicle.owner?.phone || "",
        };
    });
};