const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const submitResumeDownload = async (companyName) => {
  const response = await fetch(`${API_URL}/api/resume/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ companyName }),
  });

  if (!response.ok) {
    throw new Error('Failed to save details');
  }

  return await response.json();
};

export const fetchResumeDownloads = async () => {
  const response = await fetch(`${API_URL}/api/resume/downloads`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch downloads');
  }

  return await response.json();
};
