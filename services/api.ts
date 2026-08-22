// API service for communicating with the backend

// Use your local IP address when testing on physical device
// For iOS simulator: http://localhost:5000
// For Android emulator: http://10.0.2.2:5000
// For physical device: http://YOUR_LOCAL_IP:5000
const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:5000/api'  // Android emulator default
  : 'https://your-production-api.com/api';

export interface CreateAccountRequest {
  email: string;
  password: string;
  name: string;
}

export interface CreateAccountResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name?: string;
    createdAt: string;
    status: string;
  };
}

export interface VerifyCodeRequest {
  code: string;
}

export interface VerifyCodeResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name?: string;
    status: string;
    emailVerifiedAt: string;
  };
}

export interface CreateUserIdRequest {
  userId: string;
}

export interface CreateUserIdResponse {
  message: string;
  user: {
    id: string;
    email: string;
    userId: string;
    name?: string;
    status: string;
  };
}

export interface CheckUserIdAvailabilityResponse {
  available: boolean;
  userId: string;
}

export interface ApiError {
  error: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async createAccount(data: CreateAccountRequest): Promise<CreateAccountResponse> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create account');
    }

    return result;
  }

  async getUserById(userId: string) {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch user');
    }

    return result;
  }

  /**
   * Send verification code to user's email
   */
  async sendVerificationCode(userId: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send verification code');
    }

    return result;
  }

  /**
   * Verify the email verification code
   */
  async verifyCode(userId: string, code: string): Promise<VerifyCodeResponse> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to verify code');
    }

    return result;
  }

  /**
   * Resend verification code
   */
  async resendVerificationCode(userId: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/resend-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to resend verification code');
    }

    return result;
  }

  /**
   * Check if a user ID (username) is available
   */
  async checkUserIdAvailability(userId: string): Promise<CheckUserIdAvailabilityResponse> {
    const response = await fetch(`${this.baseUrl}/users/check-userid/${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to check user ID availability');
    }

    return result;
  }

  /**
   * Create/set user ID (username) after email verification
   */
  async createUserId(userId: string, userIdValue: string): Promise<CreateUserIdResponse> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/create-userid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userIdValue }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create user ID');
    }

    return result;
  }

  // Helper to update base URL if needed (e.g., when testing on physical device)
  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
}

export const api = new ApiService();
export default api;