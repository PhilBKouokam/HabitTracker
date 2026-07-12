import { useState, useEffect } from "react";
import { AuthContext } from "./authContext.js";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Load user from token on app start
    useEffect(() => {
        const initializeAuth = () => {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({
                    id: payload.userId,
                    username: payload.username || 'User',
                    token: token
                });
            } catch {
                localStorage.removeItem('token');
                setUser(null);
                setToken(null);
            } finally {
                setLoading(false);
            }
        }

        initializeAuth();
    }, [token]);

    const login = (newToken) => {
        if (!newToken) return;
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setLoading(true);
        window.location.href = '/login'; // Force redirect to login
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
