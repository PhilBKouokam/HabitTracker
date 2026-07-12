const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4500";

//Helper function to make authenticated fetch requests
export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    const config = {
        ...options,
        headers: {
            "Content-Type" : "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
            ...options.headers
        }
    };

    const fullUrl = url.startsWith('http') 
        ? url 
        : `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;

    try {
        const response = await fetch(fullUrl, config);

        if (response.status === 401) {
            // Token expired or invalid -> logout
            localStorage.removeItem('token');
            window.location.href = '/login';
            return;
        }

        return response;
    } catch (error) {
        console.error('API Fetch Error:', error);
        throw error;
    }
};
