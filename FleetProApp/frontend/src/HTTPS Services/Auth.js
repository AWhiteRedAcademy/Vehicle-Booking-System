import { userIdParam, userRoleParam } from '../constants/userHelper';
import { jwtDecode } from 'jwt-decode';


const API_URL =  '';

export const authFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('accessToken');
    
    if (!token || typeof token !== 'string') {
        throw new Error("You are not logged in. Please sign in again.");
    }

    if (token.split('.').length !== 3) {
        console.error("Malformed token detected:", token);
        localStorage.removeItem('accessToken'); 
        throw new Error("Your session has expired or is invalid. Please log in again.");
    }

    const decoded = jwtDecode(token);
    const userId = decoded[userIdParam];
    const role = decoded[userRoleParam];

    if (!userId || !role) {
        throw new Error("Token claims are missing required identity values.");
    }

    let finalEndpoint = endpoint;
    if (endpoint === 'api/Vehicle/user/context') {
        finalEndpoint = `/api/Vehicle/user/${userId}?role=${role}`;
    }

    const headers = {
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    const cleanBaseUrl = API_URL.replace(/\/$/, '');
    const cleanEndpoint = finalEndpoint.replace(/^\//, '');

    const response = await fetch(`${cleanBaseUrl}/${cleanEndpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {

        const errorMsg = await response.json().catch(() => ({}));
        throw new Error(errorMsg.message || `API Error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }
    
    return response.text(); 
};
