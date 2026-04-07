import axios from 'axios';

const BASE_URL = 'http://172.29.164.0:8080/api/v1';

export const login = async (payload: {
  phoneNumber: string;
  passwordHash: string;
}) => {
  try {
    console.log(`${payload}`);
    console.log("JSON being sent:", JSON.stringify(payload));

    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data?.message || 'Login failed';
    }
    throw 'Network error';
  }
};

export const register = async (payload: any) => {
  try {
    console.log("REGISTER USER:", JSON.stringify(payload));

    const response = await axios.post(
      `${BASE_URL}/users/register`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log("RESPONSE.DATA ==>", response.data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data?.message || 'Registration failed';
    }
    throw 'Network error';
  }
};