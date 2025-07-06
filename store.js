import React, { useState, useEffect } from 'react';
import { create } from 'zustand';

// Zustand store for authentication state
export const useAuthStore = create((set, get) => ({
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
}));