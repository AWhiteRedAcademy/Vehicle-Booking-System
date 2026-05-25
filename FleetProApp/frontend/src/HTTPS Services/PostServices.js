export const addVehicle = async (VehicleData) => {
    try {
        const response = await authFetch(`/api/Vehicle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(VehicleData)
        });
        return response;
    } catch (error) {
        console.error("Error adding vehicle:", error);
        throw error;
    }
};

export const addBooking = async (BookingData) => {
    try {
        const response = await authFetch(`/api/Booking`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(BookingData)
        });
        return response;
    } catch (error) {
        console.error("Error adding booking:", error);
        throw error;
    }
};     

export const addUserProfile = async (UserProfileData) => {
    try {
        const response = await authFetch(`/api/User`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UserProfileData)
        });
        return response;
    } catch (error) {
        console.error("Error adding user profile:", error);
        throw error;
    }
};