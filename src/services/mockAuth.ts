import { mockUsers, User } from './mockData';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User | null;
  token: string | null;
  error?: string;
}

class MockAuthService {
  private currentUser: User | null = null;
  private token: string | null = null;

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // In a real app, this would validate against a backend
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      return {
        user: null,
        token: null,
        error: 'Invalid email or password'
      };
    }

    // In a real app, this would be a proper JWT token
    const token = `mock-jwt-token-${Date.now()}`;
    
    this.currentUser = user;
    this.token = token;

    return {
      user,
      token
    };
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.token = null;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

export const mockAuthService = new MockAuthService(); 