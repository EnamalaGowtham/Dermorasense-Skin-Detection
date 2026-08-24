export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const SERVER_URL = API_BASE_URL.replace(/\/api$/, '');

export const getAuthHeaders = () => {
    // The backend uses httpOnly cookies, so we don't strictly need to attach an Authorization header
    // But we need to ensure credentials are included
    return {
        'Content-Type': 'application/json',
    };
};

export const apiFetch = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const fetchOptions = {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...(options.headers || {}),
        },
        credentials: 'include', // Important for cookies
    };

    const response = await fetch(url, fetchOptions);
    
    // Attempt to parse JSON if content type is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || data.message || 'API Error');
        }
        return data;
    }
    
    if (!response.ok) {
        throw new Error('API Error');
    }
    
    return response;
};
