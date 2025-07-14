"use client"
import React, { useState } from 'react';
import SplitText from '../../../../../SplitText/SplitText.jsx';
import { logoutRequest } from "../../../../_connection/RequestApi.jsx";
import { 
  LayoutDashboard, 
  Bell, 
  Calendar, 
  MessageSquare, 
  Upload,
  LogOut,
  Menu,
  GraduationCap,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname , useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const location = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const facultyMenuItems = [
    { path: '/dashboard/faculties/overview', icon: LayoutDashboard, label: 'Overview' },
    { path: '/dashboard/faculties/notices', icon: Bell, label: 'Notices' },
    { path: '/dashboard/faculties/upload-resources', icon: Upload, label: 'Upload Resources' },
    { path: '/dashboard/faculties/events', icon: Calendar, label: 'Events' },
    { path: '/dashboard/faculties/student-queries', icon: MessageSquare, label: 'Student Queries' },
  ];


  const logoutUser = async(e) => {
    e.preventDefault();
    try {
      const response = await logoutRequest("/v1/logout")
      if(response.status === 200){
        toast.success("User logout");
        router.push("/login")
      }
    } catch (error) {
      console.error("Error occure in request" , error.message)
    }
  }

  return (
    <>
     {/* Mobile Menu Button */}
     <button
     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
     className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700 text-white hover:bg-slate-700/90 transition-all duration-300"
   >
     {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
   </button>

   {/* Mobile Overlay */}
   {isMobileMenuOpen && (
     <div
       className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
       onClick={() => setIsMobileMenuOpen(false)}
     />
   )}

   {/* Sidebar */}
   <div className={`
     fixed left-0 top-0 bottom-0 w-64 bg-slate-900/95 backdrop-blur-md border-r border-emerald-500/20 z-50 transform transition-transform duration-300 ease-in-out
     ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
   `}>
     {/* Logo Section */}
     <div className="p-4 border-b border-slate-700/50">
       <div className="flex items-center space-x-2">
         <GraduationCap className="h-8 w-8 text-emerald-400" />
         <Link href={"/"}>
        <span className="text-xl font-bold text-white"> 
         <SplitText
              text="CampusSphere"
              className="text-2xl font-semibold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            /></span>
        </Link>
       </div>
     </div>

     {/* Navigation */}
     <div className="p-4 flex flex-col h-full">
       <nav className="space-y-2 flex-1">
         {facultyMenuItems.map((item) => {
           const Icon = item.icon;
           const isActive = location.pathname === item.path;
           
           return (
             <Link
               key={item.path}
               href={item.path}
               onClick={() => setIsMobileMenuOpen(false) }
               className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                 isActive
                   ? 'bg-gradient-to-r from-green-400/20 to-emerald-600/20 bg-emerald-900 border border-green-400/30'
                   : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700'
               }`}
             >
               <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-400 bg-slate-800' : ''}`} />
               <span className={` font-medium ${isActive ? 'text-emerald-400' : ''}`}>{item.label}</span>
             </Link>
           );
         })}
       </nav>
       
       {/* Logout Button */}
       <div className="absolute bottom-16 w-10/12 border-t border-slate-900">
         <button
           onClick={ logoutUser }
           className="absolute flex  items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-400/30 transition-all duration-300"
         >
           <LogOut className="h-5 w-5" />
           <span className="font-medium">Logout</span>
         </button>
       </div>
     </div>
   </div>
 </>
  );
};

export default Sidebar;