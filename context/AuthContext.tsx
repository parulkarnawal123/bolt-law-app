import { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Simulate checking for a stored user session
    const checkUserSession = async () => {
      try {
        // For demo purposes, we'll create a mock user
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+91 9876543210',
          address: '123 Legal Street, New Delhi, India',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        };
        
        // Uncomment to simulate a logged-in user
        // setUser(mockUser);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking user session:', error);
        setIsLoading(false);
      }
    };
    
    checkUserSession();
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For demo purposes, accept any credentials
      // In a real app, you would validate against a backend
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: email,
          phone: '+91 9876543210',
          address: '123 Legal Street, New Delhi, India',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        };
        
        setUser(mockUser);
        return;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For demo purposes, accept any registration
      // In a real app, you would register with a backend
      if (name && email && password) {
        const mockUser: User = {
          id: '1',
          name: name,
          email: email,
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        };
        
        setUser(mockUser);
        return;
      }
      
      throw new Error('Invalid registration data');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // For demo purposes, just clear the user state
      // In a real app, you would call a logout endpoint
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};