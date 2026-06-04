const API_URL = import.meta.env.VITE_API_URL || "";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.Message ||
        "Something went wrong. Please try again."
    );
  }

  return data;
}

export async function requestPasswordReset(email) {
  const response = await fetch(`${API_URL}/api/Auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return handleResponse(response);
}

export async function verifyResetOtp(email, otp, otpToken) {
  const response = await fetch(`${API_URL}/api/Auth/verify-reset-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
      otpToken,
    }),
  });

  return handleResponse(response);
}

export async function resetPassword(
  email,
  resetToken,
  newPassword,
  confirmPassword,
) {
  const response = await fetch(`${API_URL}/api/Auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      resetToken,
      newPassword,
      confirmPassword,
    }),
  });

  return handleResponse(response);
}