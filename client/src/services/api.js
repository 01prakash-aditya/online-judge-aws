
const API_BASE_URL = 'http://13.60.248.255:8000';  
const MAIN_API_BASE_URL = 'http://13.60.248.255:3000';  

export const compileAndRun = async (language, code, input = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language,
        code,
        input
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to compile and run code');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${MAIN_API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      ...options,
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'API request failed');
    }

    return result;
  } catch (error) {
    console.error('Main API Error:', error);
    throw error;
  }
};