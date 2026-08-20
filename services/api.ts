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
  };
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

  // Helper to update base URL if needed (e.g., when testing on physical device)
  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
}

export const api = new ApiService();
export default api;