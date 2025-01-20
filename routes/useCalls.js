const baseURL = 'https://aircall-api.onrender.com';

const fetchCalls = async () => {
  const response = await fetch(`${baseURL}/activities`);
  const data = await response.json();
  return data;
};

export default fetchCalls;