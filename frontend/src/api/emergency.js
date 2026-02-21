import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const sendEmergencySOS = async (latitude, longitude, phone = null) => {
  const response = await axios.post(`${API_URL}/hospital/sos/`, {
    latitude,
    longitude,
    phone,
  });
  return response.data;
};
