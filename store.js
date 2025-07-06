import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand store for authentication state with persistence
export const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            token: null,
            refreshToken: null,
            user: null,
            isLoading: false,
            error: null,

            // Actions
            setLoading: (loading) => set({ isLoading: loading }),
            setError: (error) => set({ error }),
            clearError: () => set({ error: null }),

            // Login action
            login: async (email, password) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await fetch('https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email,
                            password,
                            isEmployee: true
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Invalid credentials. Please check your email and password.');
                    }

                    const data = await response.json();

                    // Save tokens
                    set({
                        token: data.token,
                        refreshToken: data.refresh,
                        isLoading: false
                    });

                    // Fetch user info
                    await get().fetchUserInfo();

                } catch (error) {
                    set({
                        error: error.message || 'Login failed. Please try again.',
                        isLoading: false
                    });
                }
            },

            // Fetch user info action
            fetchUserInfo: async () => {
                const { token } = get();
                if (!token) return;

                try {
                    const response = await fetch('https://api-yeshtery.dev.meetusvr.com/v1/user/info', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user information');
                    }

                    const userData = await response.json();
                    set({ user: userData });

                } catch (error) {
                    set({ error: error.message });
                }
            },

            // Logout action
            logout: () => {
                set({
                    token: null,
                    refreshToken: null,
                    user: null,
                    error: null
                });
            }
        }),
        {
            name: 'auth-storage', // unique name for the storage key
            getStorage: () => localStorage, // or sessionStorage
            // Optional: you can whitelist or blacklist specific keys
            // partialize: (state) => ({ token: state.token, refreshToken: state.refreshToken, user: state.user }),
        }
    )
);