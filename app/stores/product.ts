import { defineStore } from "pinia";
import type { Product, Category, ApiResponse, PaginatedResponse, ProductFilter } from "~/types";
export const useProductsStore = defineStore("products", () => {
  const config = useRuntimeConfig();
  const baseUrl: string = config.public.apiBase as string;
  // State
  const products = ref<Product[]>([]);
  const categories = ref<Category[]>([]);
  const searchQuery = ref("");
  const selectedCategoryId = ref<number | "">("");
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Pagination state
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    from: 0,
    to: 0
  });
  // Helper function to get auth token safely
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
  //  ດຶງຂໍ້ມູນສິນຄ້າ
  const fetchProducts = async (params: ProductFilter = {}) => {
    try {
      loading.value = true;
      error.value = null;
      // query parameters
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params.category_id && params.category_id !== "") {
        queryParams.append('category_id', params.category_id.toString());
      }
      if (params.searchQuery?.trim()) {
        queryParams.append('search', params.searchQuery.trim());
      }
      if (params.sortBy) queryParams.append('sort_by', params.sortBy);
      if (params.sortOrder) queryParams.append('sort_order', params.sortOrder);

      const url = `${baseUrl}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await $fetch<ApiResponse<PaginatedResponse<Product>>>(url, {
        headers: getHeaders()
      });
      if (response.success) {
        products.value = response.data.data;
        pagination.value = {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
          from: response.data.from,
          to: response.data.to
        };
      }
      return response;
    } catch (err: any) {
      console.error("❌ Failed to fetch products:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  //  ດຶງຂໍ້ມູນໝວດໝູ່
  const fetchCategories = async () => {
    try {
      loading.value = true;
      error.value = null;
      const response = await $fetch<ApiResponse<Category[]>>(`${baseUrl}/categories`, {
        headers: getHeaders()
      });
      if (response.success) {
        categories.value = response.data;
      }
      return response;
    } catch (err: any) {
      console.error("❌ Failed to fetch categories:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  // CRUD Operations for Products and Categories
  const addProduct = async (productData: Partial<Product>) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await $fetch<ApiResponse<Product>>(`${baseUrl}/products`, {
        method: "POST",
        headers: getHeaders(),
        body: productData
      });
      if (response.success) {
        // Refresh products list
        await fetchProducts({ page: pagination.value.current_page });
      }
      return response;
    } catch (err: any) {
      console.error("❌ Failed to add product:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  //update product
  const updateProduct = async (id: number, productData: Partial<Product>) => {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await $fetch<ApiResponse<Product>>(`${baseUrl}/products/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: productData
      });

      if (response.success) {
        // Update local product in array
        const index = products.value.findIndex(p => p.id === id);
        if (index !== -1) {
          products.value[index] = response.data;
        }
      }

      return response;
    } catch (err: any) {
      console.error("❌ Failed to update product:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  //delete product
  const deleteProduct = async (id: number) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await $fetch<ApiResponse<void>>(`${baseUrl}/products/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (response.success) {
        // Remove from local array
        const index = products.value.findIndex(p => p.id === id);
        if (index !== -1) {
          products.value.splice(index, 1);
        }
        // Update total count
        if (pagination.value.total > 0) {
          pagination.value.total--;
        }
      }
      return response;
    } catch (err: any) {
      console.error("❌ Failed to delete product:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  // CRUD Operations for Categories
  const addCategory = async (categoryData: Partial<Category>) => {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await $fetch<ApiResponse<Category>>(`${baseUrl}/categories`, {
        method: "POST",
        headers: getHeaders(),
        body: categoryData
      });

      if (response.success) {
        categories.value.push(response.data);
      }
      return response;
    } catch (err: any) {
      console.error("❌ Failed to add category:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  //update category
  const updateCategory = async (id: number, categoryData: Partial<Category>) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await $fetch<ApiResponse<Category>>(`${baseUrl}/categories/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: categoryData
      });
      if (response.success) {
        const index = categories.value.findIndex(c => c.id === id);
        if (index !== -1) {
          categories.value[index] = response.data;
        }
      }
      return response;
    } catch (err: any) {
      console.error("❌ Failed to update category:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  //delete category
  const deleteCategory = async (id: number) => {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await $fetch<ApiResponse<void>>(`${baseUrl}/categories/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });

      if (response.success) {
        const index = categories.value.findIndex(c => c.id === id);
        if (index !== -1) {
          categories.value.splice(index, 1);
        }
      }
      return response;
    } catch (err: any) {
      console.error("❌ Failed to delete category:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  // Pagination actions
  const loadPage = async (page: number) => {
    await fetchProducts({
      page,
      category_id: selectedCategoryId.value,
      searchQuery: searchQuery.value
    });
  };
  const nextPage = async () => {
    if (pagination.value.current_page < pagination.value.last_page) {
      await loadPage(pagination.value.current_page + 1);
    }
  };
  const previousPage = async () => {
    if (pagination.value.current_page > 1) {
      await loadPage(pagination.value.current_page - 1);
    }
  };
  // Computed Properties
  const filteredProducts = computed(() => {
    let filtered = products.value;

    // Client-side filtering for additional filters
    if (selectedCategoryId.value !== "") {
      filtered = filtered.filter(
        (product) => product.category_id === Number(selectedCategoryId.value)
      );
    }
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.sku?.toLowerCase().includes(query) ||
          product.barcode?.toLowerCase().includes(query)
      );
    }
    return filtered;
  });
  const lowStockProducts = computed(() => {
    return products.value.filter(
      (product) => product.stock > 0 && product.stock <= product.min_stock
    );
  });
  const outOfStockProducts = computed(() => {
    return products.value.filter((product) => product.stock === 0);
  });
  const inStockProducts = computed(() => {
    return products.value.filter((product) => product.stock > product.min_stock);
  });
  // Getters
  const getProductById = (id: number): Product | undefined => {
    return products.value.find((product) => product.id === id);
  };
  const getCategoryById = (id: number): Category | undefined => {
    return categories.value.find((category) => category.id === id);
  };
  const getProductsByCategory = (categoryId: number): Product[] => {
    return products.value.filter((product) => product.category_id === categoryId);
  };
  // Helper function to get category name
  const getCategoryName = (categoryId: number): string => {
    const category = getCategoryById(categoryId);
    return category?.name || 'ບໍ່ມີໝວດໝູ່';
  };
  // Helper functions for price formatting
  const formatPrice = (price: string | number): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toLocaleString() + ' ກີບ';
  };
  const getPriceAsNumber = (price: string): number => {
    return parseFloat(price) || 0;
  };
  // Utility functions
  const clearError = () => {
    error.value = null;
  };
  const resetFilters = () => {
    searchQuery.value = "";
    selectedCategoryId.value = "";
  };
  const refreshData = async () => {
    await fetchProducts({
      page: pagination.value.current_page,
      category_id: selectedCategoryId.value,
      searchQuery: searchQuery.value
    });
  };
  // Search function with API call
  const searchProducts = async () => {
    await fetchProducts({
      page: 1, // Reset to first page when searching
      category_id: selectedCategoryId.value,
      searchQuery: searchQuery.value
    });
  };
  // Initialize data
  const initializeStore = async () => {
    try {
      await Promise.all([fetchCategories(), fetchProducts()]);
    } catch (err) {
      console.error("Failed to initialize products store:", err);
    }
  };
  // Watch for filter changes
  watch([selectedCategoryId, searchQuery], () => {
    // Debounce search
    if (searchQuery.value.length >= 2 || searchQuery.value.length === 0) {
      searchProducts();
    }
  });
  return {
    // State
    products: readonly(products),
    categories: readonly(categories),
    searchQuery,
    selectedCategoryId,
    loading: readonly(loading),
    error: readonly(error),
    pagination: readonly(pagination),

    // Computed
    filteredProducts,
    lowStockProducts,
    outOfStockProducts,
    inStockProducts,

    // Getters
    getProductById,
    getCategoryById,
    getProductsByCategory,
    getCategoryName,

    // Actions - Fetch
    fetchProducts,
    fetchCategories,
    initializeStore,
    refreshData,
    searchProducts,

    // Actions - Product CRUD
    addProduct,
    updateProduct,
    deleteProduct,

    // Actions - Category CRUD
    addCategory,
    updateCategory,
    deleteCategory,

    // Pagination
    loadPage,
    nextPage,
    previousPage,

    // Utility
    clearError,
    resetFilters,
    formatPrice,
    getPriceAsNumber
  };
});