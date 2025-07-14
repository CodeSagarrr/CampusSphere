"use client"
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { registerRequest } from '../../../_connection/RequestApi.jsx';
import {
  GraduationCap,
  Mail,
  Lock,
  Users,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronDown,
  User
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


function RegisterPage() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roles = [
    { value: 'student', label: 'Student', icon: GraduationCap },
    { value: 'faculty', label: 'Faculty', icon: Users },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setIsDropdownOpen(false);
  }

  const handleRegisterData = async (e) => {
    e.preventDefault();
    if (!formData) return;
    const payload = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    try {
      const response = await registerRequest("/v1/register", payload)
      if (response.status === 200) {
        toast.success("Register Successfully");
        navigate.push("/")
      } else {
        toast.error(response?.data?.message || "Registration error");
        console.log(response)
      }
    } catch (error) {
      console.error(error.response?.data || "Registration failed" );
    }
  }

  const selectedRole = roles.find(role => role.value === formData.role);
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-4 h-4 bg-emerald-400/30 rotate-45 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-40 right-32 w-6 h-6 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-purple-400/30 rotate-45 animate-bounce" style={{ animationDelay: '5s' }}></div>
          <div className="absolute top-1/2 right-20 w-5 h-5 bg-emerald-400/20 rounded-full animate-bounce" style={{ animationDelay: '7s' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <GraduationCap className="h-12 w-12 text-emerald-400" />
                <div className="absolute -inset-2 bg-emerald-400/20 rounded-full blur-lg"></div>
              </div>
              <span className="text-2xl font-bold">CampusSphere</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Your CampusSphere Account</h1>
            <p className="text-slate-300">Register to access your personalized dashboard</p>
          </div>

          {/* Register Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
              <form className="space-y-6">
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-300">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                        placeholder="First name"
                        required
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-300">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Role Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="role" className="block text-sm font-medium text-slate-300">
                    Role
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full flex items-center justify-between pl-10 pr-3 py-3 bg-slate-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-200`}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-slate-400" />
                      </div>
                      <span className={selectedRole ? 'text-white' : 'text-slate-400'}>
                        {selectedRole ? selectedRole.label : 'Select your role'}
                      </span>
                      <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-xl z-50 overflow-hidden">
                        {roles.map((role) => (
                          <button
                            key={role.value}
                            type="button"
                            onClick={() => handleRoleSelect(role.value)}
                            className="w-full flex items-center px-4 py-3 text-left text-slate-300 hover:text-emerald-400 hover:bg-slate-700/50 transition-colors duration-200"
                          >
                            <role.icon className="h-4 w-4 mr-3" />
                            {role.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  onClick={handleRegisterData}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center group"
                >
                  Register
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <div className="text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link href={"/login"}
                      type="button"
                      className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Security Notice */}
          <div className="text-center mt-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-xs text-slate-500">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default RegisterPage




