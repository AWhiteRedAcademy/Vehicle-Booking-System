import { userIdParam, userRoleParam } from '../constants/userHelper';
import { jwtDecode } from 'jwt-decode';

const API_URL = '';

let isRedirectingToLogin = false;

function handleUnauthorized() {
    if (isRedirectingToLogin) {
        return;
    }

    isRedirectingToLogin = true;

    localStorage.removeItem("accessToken");

    alert("Your session has expired. Please sign in again to continue.");

    window.location.href = "/login";
}

export const getCurrentUserId = () => {
    const token = localStorage.getItem("accessToken");

    if (!token || token.split(".").length !== 3) {
        return null;
    }

    const decoded = jwtDecode(token);
    return decoded[userIdParam] || null;
};

export const authFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('accessToken');
    
    // Normalize endpoint string so path comparisons look identical
    const normalizedEndpoint = endpoint.replace(/^\//, '');

    if (normalizedEndpoint === 'api/User/register') {
        const response = await fetch(`${API_URL}/${normalizedEndpoint}`, {
            ...options,
            headers: {
                ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || errData.Message || 'Registration endpoint rejected data.');
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }
        return response.text();
    }

    if (!token || typeof token !== "string") {
        handleUnauthorized();
        throw new Error("You are not logged in. Redirecting to login page...");
    }

    if (token.split(".").length !== 3) {
        console.error("Malformed token detected:", token);
        handleUnauthorized();
        throw new Error("Your session is invalid. Redirecting to login page...");
    }
    
    const decoded = jwtDecode(token);
    const userId = decoded[userIdParam];
    const role = decoded[userRoleParam];

    if (!userId || !role) {
        throw new Error("Token claims are missing required identity values.");
    }

    let finalEndpoint = normalizedEndpoint;
    if (normalizedEndpoint === 'api/Vehicle/user/context') {
        finalEndpoint = `api/Vehicle/user/${userId}?role=${role}`;
    }

    if (normalizedEndpoint === "api/Booking/owner/context") {
        finalEndpoint = `api/Booking/owner/${userId}`;
    }

    const headers = {
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        'Authorization': `Bearer ${token}`, // Ensure space exists between Bearer and token
        ...options.headers,
    };

    const cleanBaseUrl = API_URL.replace(/\/$/, '');
    
    const requestUrl = cleanBaseUrl ? `${cleanBaseUrl}/${finalEndpoint}` : `/${finalEndpoint}`;

    const response = await fetch(requestUrl, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        handleUnauthorized();
        throw new Error("Session expired. Redirecting to login page...");
    }

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

