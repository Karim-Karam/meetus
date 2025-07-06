'use client';
import Image from "next/image";
import { useState } from "react";
import { useAuthStore } from "../../store";
import { Dashboard } from "../../dashboard";

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  const { token, login, isLoading, error, clearError } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation errors when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear API error when user starts typing
    if (error) {
      clearError();
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await login(formData.email, formData.password);
  };

  const isFormValid = isValidEmail(formData.email) &&
    formData.email.trim() &&
    formData.password.trim();
  return token ? <Dashboard /> :
    (<div className="relative w-full lg:overflow-hidden h-screen flex items-center justify-center font-sans">
      {/* Background gradients */}
      <div className="absolute top-[-100px] right-20 w-[50vw] h-[500px] rounded-full bg-gradient-to-bl from-purple-400 to-white opacity-90 z-0 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-[25vw] h-[200px] rounded-full bg-gradient-to-tl from-purple-500 to-white opacity-60 blur-2xl"></div>

      <div className="w-full h-full flex-col-reverse lg:flex-row flex px-5 lg:px-20 mb-10 lg:mb-0 items-center justify-center">
        <div className="flex-1 text-center flex flex-col items-center align-middle justify-center pb-5 lg:pb-0 lg:px-20 text-black z-20">
          <h1 className="text-5xl w-full font-bold mb-4">Welcome back</h1>
          <p className="text-lg text-gray-600 px-10 mb-6">
            Step into our shopping metaverse for an unforgettable shopping experience
          </p>

          {/* API Error Message */}
          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="w-full mb-4">
            <div className={`w-full flex items-center bg-white border rounded-lg focalidationErrors.email ? 'border-red-500' : 'border-gray-300'}`}>
              <span className="pl-3 pr-2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                type="email"
                required
                autoFocus
                onChange={handleChange}
                value={formData.email}
                name="email"
                id="email"
                autoComplete="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg focus:outline-none"
                style={{ border: 'none', boxShadow: 'none' }}
              />
            </div>
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1 text-left">{validationErrors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="w-full mb-6">
            <div className={`w-full flex items-center bg-white border rounded-lg focus-within:ring-2 focus-within:ring-purple-500 ${validationErrors.password ? 'border-red-500' : 'border-gray-300'}`}>
              <span className="pl-3 pr-2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2z" />
                </svg>
              </span>
              <input
                type="password"
                required
                onChange={handleChange}
                value={formData.password}
                name="password"
                id="password"
                autoComplete="current-password"
                placeholder="Password"
                className="w-full p-3 rounded-lg focus:outline-none"
                style={{ border: 'none', boxShadow: 'none' }}
              />
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1 text-left">{validationErrors.password}</p>
            )}
          </div>

          <button
            disabled={!isFormValid || isLoading}
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white p-3 disabled:bg-gray-400 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Don&#39;t have an account?{' '}
            <span className="text-purple-600 hover:underline">Sign Up</span>
          </p>
        </div>

        <div className="flex-1 mx-4 lg:mx-0 lg:flex-[2] z-20">
          <Image
            src="/logo.png"
            alt="MeetUs Logo"
            width={400}
            height={400}
            className="mb-6 mt-20 lg:mx-20 w-full h-full object-cover rounded-lg "
          />
        </div>

      </div>
    </div>)
}


