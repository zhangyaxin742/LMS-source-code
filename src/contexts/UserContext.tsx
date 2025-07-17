
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UserRole = "tutor" | "admin" | "student";

interface UserContextType {
  userRole: UserRole | null;
  userName: string;
  userInitials: string;
  userPosition: string;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void; // Add the switchRole function
}

const defaultContext: UserContextType = {
  userRole: null,
  userName: "",
  userInitials: "",
  userPosition: "",
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  switchRole: () => {} // Add default implementation
};

const UserContext = createContext<UserContextType>(defaultContext);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  // For demo purposes, set user details based on role
  const [userName, setUserName] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const [userPosition, setUserPosition] = useState("");

  useEffect(() => {
    // Check for stored auth state on initial load
    const storedAuth = localStorage.getItem("userAuth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setUserRole(authData.role);
      setIsAuthenticated(true);
      setUserDetailsForRole(authData.role);
    }
  }, []);

  const setUserDetailsForRole = (role: UserRole) => {
    if (role === "admin") {
      setUserName("Admin User");
      setUserInitials("AU");
      setUserPosition("Platform Administrator");
    } else if (role === "tutor") {
      setUserName("Thomas Anderson");
      setUserInitials("TA");
      setUserPosition("UI/UX Design Tutor");
    } else if (role === "student") {
      setUserName("Sarah Johnson");
      setUserInitials("SJ");
      setUserPosition("UI/UX Design Student");
    }
  };

  const login = (email: string, password: string, role: UserRole) => {
    // In a real app, this would validate credentials with a backend
    // For demo, we'll just accept any input and set the role
    
    setUserRole(role);
    setIsAuthenticated(true);
    setUserDetailsForRole(role);

    // Store auth state in localStorage
    localStorage.setItem("userAuth", JSON.stringify({ role, email }));

    // Redirect based on role
    if (role === "admin") {
      navigate("/users");
    } else if (role === "tutor") {
      navigate("/dashboard");
    } else if (role === "student") {
      navigate("/student-dashboard");
    }
  };

  const switchRole = (role: UserRole) => {
    // Update role
    setUserRole(role);
    setUserDetailsForRole(role);
    
    // Update stored auth to include the new role
    const storedAuth = localStorage.getItem("userAuth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      localStorage.setItem("userAuth", JSON.stringify({ ...authData, role }));
    }

    // Redirect based on role
    if (role === "admin") {
      navigate("/users");
    } else if (role === "tutor") {
      navigate("/dashboard");
    }
  };

  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    setUserName("");
    setUserInitials("");
    setUserPosition("");
    
    // Clear stored auth
    localStorage.removeItem("userAuth");
    
    // Redirect to login
    navigate("/login");
  };

  return (
    <UserContext.Provider 
      value={{ 
        userRole, 
        userName, 
        userInitials,
        userPosition,
        isAuthenticated,
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
