import { userIdParam, userRoleParam } from '../constants/userHelper';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5020';

export const handleSignInSubmit = async (email, password, setError) => {
  try {
    const response = await fetch(`${API_URL}/api/Auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || errData.Message || 'Invalid email or password');
    }

    const data = await response.json();
    const token = data.accessToken || data.token || data.AccessToken;

    if (!token) {
      throw new Error("Login succeeded, but no valid session token was returned.");
    }

    localStorage.setItem('accessToken', token);

    switch (data.role) {
      case 'Owner':
        window.location.href = '/owner/dashboard';
        break;
      case 'Company':
        window.location.href = '/company/dashboard';
        break;
      case 'Admin':
        window.location.href = '/admin/dashboard';
        break;
      case 'Guest':
        throw new Error("Registration Request succeeded, but Admin approval is required.");
      default:
        throw new Error("Login succeeded, but user role is unrecognized.");
    }
  } catch (err) {
    console.error("Auth helper error:", err);
    setError(err.message || 'Network error. Please check if the backend is running.');
  }
};