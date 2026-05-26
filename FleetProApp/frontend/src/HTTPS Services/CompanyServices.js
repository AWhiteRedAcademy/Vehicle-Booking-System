export const getBookings = async (id) => {
    const response = await authFetch(`api/Vehicle/${id}`);
    return response.json();
    
};