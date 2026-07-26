const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const submitContactForm = async (data) => {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Server error: ${response.status}`);
  }
  
  return await response.json();
};
