import { Facebook, GraduationCap, Instagram, Twitter } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="relative z-10 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                  <span className="text-base sm:text-lg font-bold">CampusSphere</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Streamlining campus communication for the digital age.
                </p>
              </div>
              <div>
                <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h5>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-400">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Features</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Dashboards</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Security</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h5>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-400">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">About</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Contact</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h5>
                <div className="flex space-x-3 sm:space-x-4">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors duration-200" />
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors duration-200" />
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors duration-200" />
                </div>
              </div>
            </div>
            <div className="border-t border-slate-700/50 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-400">
              <p>© {new Date().getFullYear()}CapusSphere. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Footer