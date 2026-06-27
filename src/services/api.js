const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

// ជំនួយការហៅ API រួមដែលមានភ្ជាប់ Token ស្វ័យប្រវត្តិ (សម្រាប់ Auth/Cart/Orders)
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("userToken");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { token: token }), // បញ្ជូន Token ទៅកាន់ Backend បើមាន
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    // If the server returns 401 Unauthorized, remove any stale client token
    if (response.status === 401) {
      try {
        localStorage.removeItem("userToken");
      } catch (e) {}
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
}

export const fashionApi = {
  // === 1. Authentication API ===
  auth: {
    signup: (userData) =>
      apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    signin: (credentials) =>
      apiRequest("/auth/signin", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    forgotPassword: (email) =>
      apiRequest("/auth/forgotPasswords", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    verifyResetCode: (resetCode) =>
      apiRequest("/auth/verifyResetCode", {
        method: "POST",
        body: JSON.stringify({ resetCode }),
      }),
  },

  // === 2. Products & Categories API ===
  products: {
    getAll: () => apiRequest("/products"),
    getSpecific: (id) => apiRequest(`/products/${id}`),
    getCategories: () => apiRequest("/categories"),
    getSubCategories: () => apiRequest("/subcategories"),
  },

  // === 3. Cart API (v2) ===
  cart: {
    get: () => apiRequest("/cart"),
    add: (productId) =>
      apiRequest("/cart", {
        method: "POST",
        body: JSON.stringify({ productId }),
      }),
    updateQuantity: (productId, count) =>
      apiRequest(`/cart/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ count }),
      }),
    removeItem: (productId) =>
      apiRequest(`/cart/${productId}`, { method: "DELETE" }),
    clear: () => apiRequest("/cart", { method: "DELETE" }),
  },

  // === 4. Wishlist API ===
  wishlist: {
    get: () => apiRequest("/wishlist"),
    add: (productId) =>
      apiRequest("/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId }),
      }),
    remove: (productId) =>
      apiRequest(`/wishlist/${productId}`, { method: "DELETE" }),
  },

  // === 5. Orders API ===
  orders: {
    createCashOrder: (cartId, shippingDetails) =>
      apiRequest(`/orders/${cartId}`, {
        method: "POST",
        body: JSON.stringify({ shippingAddress: shippingDetails }),
      }),
    getUserOrders: (userId) => apiRequest(`/orders/user/${userId}`),
    checkoutSession: (cartId, shippingDetails) =>
      apiRequest(
        `/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          method: "POST",
          body: JSON.stringify({ shippingAddress: shippingDetails }),
        },
      ),
  },
};
