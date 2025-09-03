export const useAuth = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const $authFetch = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      if (authStore.token) {
        const headers = new Headers(options.headers as HeadersInit);
        headers.set("Authorization", `Bearer ${authStore.token}`);
        headers.set("Content-Type", "application/json");
        options.headers = headers;
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.clearAuth();
        navigateTo("/login");
      }
    }
  });
  return {
    ...authStore,
    $authFetch
  };
};
