import { defineStore } from "pinia";
import type {
  Cart,
  CartItem,
  Product,
  Customer,
  Sale,
  SaleItem,
  ApiResponse
} from "~/types";

export const usePosStore = defineStore("pos", () => {
  const config = useRuntimeConfig();
  const baseUrl: string = config.public.apiBase as string;

  // State
  const cart = ref<Cart>({
    items: [],
    subtotal: 0,
    discountAmount: 0,
    taxAmount: 0,
    total: 0,
    itemCount: 0
  });

  const selectedCustomer = ref<Customer | null>(null);
  const paymentMethod = ref<"ເງິນສົດ" | "ບັດເຄຣດິດ" | "QR" | "ໂອນເງິນ">(
    "ເງິນສົດ"
  );
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Helper function to get auth token
  const getAuthToken = () => {
    if (process.client) {
      return localStorage.getItem("auth-token");
    }
    return null;
  };

  // Helper function to get request headers
  const getHeaders = () => {
    const token = getAuthToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    };
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = cart.value.items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    const itemCount = cart.value.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const taxRate = 0.1;
    const taxAmount = subtotal * taxRate;
    const total = subtotal - cart.value.discountAmount + taxAmount;

    cart.value.subtotal = subtotal;
    cart.value.itemCount = itemCount;
    cart.value.taxAmount = taxAmount;
    cart.value.total = total;
  };

  // Add item to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItemIndex = cart.value.items.findIndex(
      (item) => item.product.id === product.id
    );
    if (existingItemIndex > -1) {
      const existingItem = cart.value.items[existingItemIndex];
      if (!existingItem) {
        throw new Error("Item not found in cart");
      }
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock < newQuantity) {
        throw new Error(`ສິນຄ້າຄົງເຫຼືອບໍ່ພຽງພໍ ມີພຽງ ${product.stock} ຊິ້ນ`);
      }
      existingItem.quantity = newQuantity;
      existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
      if (product.stock < quantity) {
        throw new Error(`ສິນຄ້າຄົງເຫຼືອບໍ່ພຽງພໍ ມີພຽງ ${product.stock} ຊິ້ນ`);
      }
      const cartItem: CartItem = {
        product,
        quantity,
        price: parseFloat(Number(product.price).toFixed(2)),
        discount: 0,
        subtotal: quantity * parseFloat(Number(product.price).toFixed(2))
      };
      cart.value.items.push(cartItem);
    }
    calculateTotals();
  };

  // Update quantity
  const updateQuantity = (productId: number, quantity: number) => {
    const itemIndex = cart.value.items.findIndex(
      (item) => item.product.id === productId
    );
    if (itemIndex > -1) {
      const item = cart.value.items[itemIndex];
      if (!item) {
        throw new Error("Item not found in cart");
      }
      if (quantity <= 0) {
        cart.value.items.splice(itemIndex, 1);
      } else if (quantity <= item.product.stock) {
        item.quantity = quantity;
        item.subtotal = quantity * item.price;
      } else {
        throw new Error(
          `ສິນຄ້າຄົງເຫຼືອບໍ່ພຽງພໍ ມີພຽງ ${item.product.stock} ຊິ້ນ`
        );
      }

      calculateTotals();
    }
  };

  // Remove from cart
  const removeFromCart = (productId: number) => {
    const itemIndex = cart.value.items.findIndex(
      (item) => item.product.id === productId
    );
    if (itemIndex > -1) {
      cart.value.items.splice(itemIndex, 1);
      calculateTotals();
    }
  };

  // Clear cart
  const clearCart = () => {
    cart.value.items = [];
    cart.value.subtotal = 0;
    cart.value.discountAmount = 0;
    cart.value.taxAmount = 0;
    cart.value.total = 0;
    cart.value.itemCount = 0;
    selectedCustomer.value = null;
  };
  // Set customer
  const setCustomer = (customer: Customer | null) => {
    selectedCustomer.value = customer;
  };
  // Apply discount
  const applyDiscount = (amount: number) => {
    cart.value.discountAmount = amount;
    calculateTotals();
  };

  // Checkout with API call
  const checkout = async () => {
    if (cart.value.items.length === 0) {
      throw new Error("ບໍ່ມີສິນຄ້າໃນກະຕ່າ");
    }

    loading.value = true;
    error.value = null;

    try {
      // Prepare order data
      const orderData = {
        customer_id: selectedCustomer.value?.id || null,
        subtotal: cart.value.subtotal,
        discount_amount: cart.value.discountAmount,
        tax_amount: cart.value.taxAmount,
        total: cart.value.total,
        payment_method: paymentMethod.value,
        items: cart.value.items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount,
          subtotal: item.subtotal
        })),
        notes: `ການຂາຍເມື່ອ ${new Date().toLocaleString("lo-LA")}`
      };
      // Call API to create sale
      const response = await $fetch<ApiResponse<Sale>>(`${baseUrl}/sales`, {
        method: "POST",
        headers: getHeaders(),
        body: orderData
      });
      if (!response.success) {
        throw new Error(response.message || "ບໍ່ສາມາດບັນທຶກການຂາຍໄດ້");
      }
      // Store the sale result
      const sale = response.data;
      const total = cart.value.total;
      // Clear cart after successful checkout
      clearCart();
      // Return success result
      return {
        success: true,
        sale,
        total,
        message: "ຊຳລະເງິນສຳເລັດ"
      };
    } catch (err: any) {
      console.error("❌ Checkout failed:", err);

      // Handle different error types
      let errorMessage = "ເກີດຂ້ໍຜິດພາດໃນການຊຳລະເງິນ";

      if (err.data) {
        // API error response
        errorMessage = err.data.message || errorMessage;
      } else if (err.message) {
        // Network or other error
        errorMessage = err.message;
      }

      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  // Get sales history (bonus feature)
  const getSalesHistory = async (page: number = 1, limit: number = 10) => {
    try {
      loading.value = true;
      error.value = null;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort_by: "created_at",
        sort_order: "desc"
      });

      const response = await $fetch<ApiResponse<any>>(
        `${baseUrl}/sales?${queryParams.toString()}`,
        {
          headers: getHeaders()
        }
      );

      return response.data;
    } catch (err: any) {
      console.error("❌ Failed to fetch sales history:", err);
      error.value = err.message || "ບໍ່ສາມາດໂຫລດປະຫວັດການຂາຍໄດ້";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Utility functions
  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    cart: readonly(cart),
    selectedCustomer: readonly(selectedCustomer),
    paymentMethod,
    loading: readonly(loading),
    error: readonly(error),

    // Actions
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setCustomer,
    applyDiscount,
    checkout,
    getSalesHistory,
    clearError
  };
});
