export const updateVehicle = async (vehicleId, updatedData) => {
    try {
        const response = await authFetch(`/api/Vehicle/${vehicleId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        return response;
    } catch (error) {
        console.error("Error updating vehicle:", error);
        throw error;
    }
};

export const updateBooking = async (bookingId, updatedData) => {
    try {
        const response = await authFetch(`/api/Booking/${bookingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        return response;
    } catch (error) {
        console.error("Error updating booking:", error);
        throw error;
    }
};

export const updateUserProfile = async (userId, updatedData) => {
    try {
        const response = await authFetch(`/api/User/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        return response;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};