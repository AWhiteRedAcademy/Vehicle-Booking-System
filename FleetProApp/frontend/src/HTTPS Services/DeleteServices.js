export const deleteVehicle = async (vehicleId) => {
    try {
        const response = await authFetch(`/api/Vehicle/${vehicleId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        throw error;
    }
};

export const deleteBooking = async (bookingId) => {
    try {
        const response = await authFetch(`/api/Booking/${bookingId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw error;
    }
};

export const deleteUserProfile = async (userId) => {
    try {
        const response = await authFetch(`/api/User/${userId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        console.error("Error deleting user profile:", error);
        throw error;
    }
};
