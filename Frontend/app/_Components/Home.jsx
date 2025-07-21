"use client"
import React, { useEffect, useState } from 'react';
import { checkUserLoginStatus } from "../_connection/RequestApi.jsx"
import SplitText from '../../SplitText/SplitText.jsx';
import {
  Bell,
  Menu,
  X,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Calendar,
  MessageSquare,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';


export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("student");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await checkUserLoginStatus("/v1/check-auth");
        if (response?.status === 200) {
          setIsAuthenticated(true);
          setUserRole(response.data?.role)
          console.log(response.data)
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error.message);
        setIsAuthenticated(false);
      }
    }
    checkAuthentication();
  }, [])
  const features = [
    {
      icon: Bell,
      title: 'Smart Notice Board',
      description: 'Real-time notifications and announcements with priority-based filtering'
    },
    {
      icon: BookOpen,
      title: 'Study Resources Hub',
      description: 'Centralized access to course materials, PDFs, and academic resources'
    },
    {
      icon: Calendar,
      title: 'Events & Calendar',
      description: 'Stay updated with campus events, workshops, and important dates'
    },
    {
      icon: MessageSquare,
      title: 'Student-Faculty Forum',
      description: 'Direct communication channel for queries and academic discussions'
    },
    {
      icon: Users,
      title: 'Role-Based Dashboards',
      description: 'Customized interfaces for students and faculty with relevant tools'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for seamless campus management experience'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Campus Connect has made it so much easier to stay on top of my classes and campus events. I never miss important deadlines anymore!"
    },
    {
      name: "Dr. Michael Chen",
      role: "Faculty",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "As a faculty member, I appreciate the streamlined communication tools. It's much easier to connect with students and share important updates."
    },
    {
      name: "Amanda Rodriguez",
      role: "Administrator",
      avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "The real-time notifications are a game-changer. I always know what's happening on campus, and the role-based dashboard keeps everything organized."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 opacity-90"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50  top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <Link href={"/"} className="flex items-center space-x-2 space-y-2">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400" />
              <span className="text-lg sm:text-xl font-bold">
                <SplitText
                  text="CampusSphere"
                  className="text-xl font-semibold text-center"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="#about" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">About</a>
              <a href="#features" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">Features</a>
              <a href="#testimonials" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">Testimonials</a>
              <Link href={"/login"} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200">
                Login
              </Link>
              {
                isAuthenticated ? <Link href={`/dashboard/${userRole === 'faculty' ? 'faculties' : 'students'}`} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 xl:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
                  Get Started
                </Link> : <Link href={"/register"} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 xl:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
                  Register
                </Link>
              }

            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-slate-700/50 py-4 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <a href="#about" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 py-1">About</a>
                <a href="#features" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 py-1">Features</a>

                {/* Mobile Dashboard Links */}

                <a href="#contact" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 py-1">Contact</a>
                <button className="text-emerald-400 hover:text-emerald-300 font-medium text-left transition-colors duration-200 py-1">
                  Login
                </button>
                {
                  isAuthenticated ? <Link href={`/dashboard/${userRole === 'faculty' ? 'faculties' : 'students'}`} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 xl:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
                    Get Started
                  </Link> : <Link href={"/register"} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 xl:px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25">
                    Register
                  </Link>
                }
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 sm:pt-12 lg:pt-20 pb-16 sm:pb-24 lg:pb-32 w-full">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="grid lg:place-content-center items-center">
            <div className="w-[100vw] flex flex-col items-center animate-slide-up text-center">
              <h1 className="text-3xl flex sm:flex-row flex-col justify-center sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-1">
                <SplitText
                  text="CampusSphere - "
                  className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-1"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
                <span className="block ml-1 text-emerald-400">Simplifying Campus</span>
              </h1>
              <span className="block text-3xl  sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-1">Communication</span>
              <p className="text-lg  sm:text-xl text-center text-slate-300 mb-6 sm:mb-8 leading-relaxed max-w-4xl mt-4 mx-auto lg:mx-0 px-2">
                Connect with your campus community effortlessly. Stay updated with announcements, access role-based dashboards, and receive real-time notifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href={"/login"} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center group">
                  Login
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                {
                  isAuthenticated ? <Link href={`/dashboard/${userRole === 'faculty' ? 'faculties' : 'students'}`} className="bg-slate-800 hover:bg-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 border border-slate-600 hover:border-emerald-500/50 flex items-center justify-center group">
                    Get Started
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link> : <Link href={"/register"} className="bg-slate-800 hover:bg-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 border border-slate-600 hover:border-emerald-500/50 flex items-center justify-center group">
                    Register
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                }
              </div>
            </div>
            <div className="animate-slide-up-delay order-first lg:order-last">
              <div className="relative max-w-md sm:max-w-lg mx-auto lg:max-w-none">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl blur-xl"></div>
              
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features for Modern Campus
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to manage campus life efficiently and effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-neon-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/10 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="inline-flex items-center bg-emerald-800 justify-center w-12 h-12 bg-neon-green/20 rounded-lg mb-4 group-hover:bg-neon-green/30 transition-colors">
                      <Icon className="h-6 w-6 text-emerald-400  " />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Testimonials</h2>
            <p className="text-lg sm:text-xl text-slate-300 px-4">
              Hear from our satisfied users about howCapusSphere has transformed their campus experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/10 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">{testimonial.name}</h4>
                    <p className="text-emerald-400 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed italic text-sm sm:text-base">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}

    </div>
  )
}
