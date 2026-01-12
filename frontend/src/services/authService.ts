import api from './api';

/**
 * Authentication Service
 * Handles login, logout, and token management
 */

const TOKEN_KEY = 'auth_token';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  data: {
    token: string;
    expiresIn: string;
  };
}

class AuthService {
  /**
   * Login with username and password
   */
  async login(credentials: LoginCredentials): Promise<string> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const token = response.data.data.token;
      
      // Store token in localStorage
      this.setToken(token);
      
      return token;
    } catch (error) {
      this.logout(); // Clear any existing token
      throw error;
    }
  }

  /**
   * Logout and clear token
   */
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  /**
   * Set token in localStorage
   */
  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Verify token with backend
   */
  async verifyToken(): Promise<boolean> {
    const token = this.getToken();
    
    if (!token) {
      return false;
    }

    try {
      await api.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  /**
   * Get authorization header for API requests
   */
  getAuthHeader(): { Authorization: string } | {} {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export default new AuthService();
