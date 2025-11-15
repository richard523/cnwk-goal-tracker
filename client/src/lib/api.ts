const getApiUrl = (path: string) => {
  const apiUrl = import.meta.env.VITE_API_URL || '';
  return `${apiUrl}${path}`;
};

export default getApiUrl;
