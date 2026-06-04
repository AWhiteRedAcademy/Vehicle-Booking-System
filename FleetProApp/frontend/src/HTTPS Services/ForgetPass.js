import { authFetch } from "./Auth.js";

export const initiateForgotPassword = async (email) => {
    return authFetch('api/auth/forgot-password', {
        method: "POST",
        body: JSON.stringify({ email }),
    });
};


export const verifyResetOtp = async (email, code) => {
    return authFetch('api/auth/verify-reset-otp', {
        method: "POST",
        body: JSON.stringify({ email, code }),
    });
};

export const completePasswordReset = async (email, newPassword) => {
    return authFetch('api/auth/reset-password', {
        method: "POST",
        body: JSON.stringify({ email, newPassword }),
    });
};
