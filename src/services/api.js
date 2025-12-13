// import axios from 'axios';

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// // Products API
// export const getProducts = async (filters = {}) => {
//   try {
//     const params = new URLSearchParams();
    
//     if (filters.category && filters.category !== 'all') {
//       params.append('category', filters.category);
//     }
//     if (filters.search) {
//       params.append('search', filters.search);
//     }
//     if (filters.featured !== undefined) {
//       params.append('featured', filters.featured);
//     }
//     if (filters.sortBy) {
//       params.append('sortBy', filters.sortBy);
//     }
    
//     const response = await axios.get(`${API}/products?${params.toString()}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };

// export const getProduct = async (productId) => {
//   try {
//     const response = await axios.get(`${API}/products/${productId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     throw error;
//   }
// };

// // Categories API
// export const getCategories = async () => {
//   try {
//     const response = await axios.get(`${API}/categories`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     throw error;
//   }
// };

// // Orders API
// export const createOrder = async (orderData) => {
//   try {
//     const response = await axios.post(`${API}/orders`, orderData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating order:', error);
//     throw error;
//   }
// };

// export const getOrder = async (orderId) => {
//   try {
//     const response = await axios.get(`${API}/orders/${orderId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     throw error;
//   }
// };

// // Contact API
// export const submitContactMessage = async (messageData) => {
//   try {
//     const response = await axios.post(`${API}/contact`, messageData);
//     return response.data;
//   } catch (error) {
//     console.error('Error submitting contact message:', error);
//     throw error;
//   }
// };

// // Stats API
// export const getStats = async () => {
//   try {
//     const response = await axios.get(`${API}/stats`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching stats:', error);
//     throw error;
//   }
// };



import { products, categories } from "../data/mockData";

export const getCategories = async () => {
  return categories;
};

export const getProducts = async (filters = {}) => {
  let result = [...products];

  // category filtering
  if (filters.category && filters.category !== "all") {
    result = result.filter(p => p.category === filters.category);
  }

  // featured filter
  if (filters.featured) {
    result = result.filter(p => p.featured === true);
  }

  // search filtering
  if (filters.search) {
    const term = filters.search.toLowerCase();
    result = result.filter(p =>
      p.nameEn.toLowerCase().includes(term) ||
      p.nameAr.toLowerCase().includes(term)
    );
  }

  // sort
  if (filters.sortBy === "priceLowest") {
    result.sort((a, b) => a.price - b.price);
  }
  if (filters.sortBy === "priceHighest") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
};
