import { authFetch } from "./Auth.js"; 

export const addVehicle = async (vehicleData) => {
    return authFetch('api/Vehicle', {
        method: 'POST',
        body: JSON.stringify(vehicleData)
    });
};

export const getVehicleById = async (id) => {
    return authFetch(`api/Vehicle/${id}`);
};

export const updateVehicle = async (id, updatedData) => {
    return authFetch(`api/Vehicle/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData)
    });
};