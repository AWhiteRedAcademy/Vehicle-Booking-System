import { userIdParam, userRoleParam } from '../constants/userHelper';

export const handleSignInSubmit = async (email, password, setError) => {
  try {
    const response = await fetch('/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

    // Hold session token safely
    localStorage.setItem('accessToken', token); 
    
    // Perform browser routing after successful login
    switch (data.role) {
      case 'Owner':
        window.location.href = '/owner/dashboard';
        break;
      case 'Company':
        window.location.href = '/company/dashboard';
        break;
      case 'Guest':
        throw new Error("Registration Request succeeded, but Admin approval is required.");
        break;
      default:
        throw new Error("Login succeeded, but user role is unrecognized.");
    }


  } catch (err) {
    console.error("Auth helper error:", err);
    setError(err.message);
  }
};