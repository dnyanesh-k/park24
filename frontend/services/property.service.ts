import axios from 'axios';

const BASE_URL = 'http://172.29.164.0:8080/api/v1';

export const getProperties = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/properties`);
    console.log("PROPERTIES : ", res.data)
    return res.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to fetch properties';
  }
};

  export const getPropertyById = async (id: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/properties/${id}`);
      return res.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch property';
    }
  };

export const getMyProperties = async (token: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/properties/seller`, // Matches the new Controller path
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(res.data);

    return res.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to fetch your properties';
  }
};


export const addProperty = async (
  formData: FormData,
  token: string
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/properties`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: () => formData,
      }
    );
    return res.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to add property';
  }
};

export const markInterested = async (
  id: string,
  token: string
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/properties/${id}/interested`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to mark interested';
  }
};