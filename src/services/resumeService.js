const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const submitResumeDownload = async (companyName, email) => {
  const response = await fetch(`${API_URL}/api/resume/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ companyName, email }),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to save details';
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (e) {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};
