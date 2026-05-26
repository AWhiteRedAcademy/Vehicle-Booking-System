import { authFetch } from "./Auth.js"; 

export const handleRegisterSubmit = async (userData) => {

    const apiPayload = {
        name: userData.fullName,         // Maps 'fullName' to 'name'
        email: userData.email,
        phoneNumber: userData.phone,     // Maps 'phone' to 'phoneNumber'
        password: userData.password
    };

    // 1. authFetch already processes errors and parses JSON
    const data = await authFetch('api/User/register', {
        method: 'POST',
        body: JSON.stringify(apiPayload)
    });

    // 2. If it didn't throw an error inside authFetch, it succeeded!
    return data;
};