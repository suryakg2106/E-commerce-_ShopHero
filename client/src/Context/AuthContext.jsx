import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login as LoginApi, Register as RegisterApi, AuthMe, Logout as LogoutApi } from "../Service/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await AuthMe(); 
        setUser(currentUser.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // 🔐 Login function
  const login = async (cred) => {
    try {
      await LoginApi(cred);       
      const currentUser = await AuthMe(); 
      setUser(currentUser.user);
      navigate("/");             
    } catch (error) {
      throw new Error("Login failed please input valid data!",error);
    }
  };


  const register = async (cred) => {
    try {
      await RegisterApi(cred);
      const currentUser = await AuthMe();
      setUser(currentUser);
      
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // 🚪 Logout function
  const logout = async () => {
    try {
      await LogoutApi();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
