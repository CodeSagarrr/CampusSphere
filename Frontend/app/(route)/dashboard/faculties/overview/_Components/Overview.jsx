"use client"
import React, { useEffect, useState } from 'react';
import { 
  Bell, 
  Users, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Upload,
  FileText,
} from 'lucide-react';
import { getAllStudentUser  } from "../../../../../_connection/getResponseApi.jsx";
import { useAppContext } from "../../../../../_connection/contex.jsx";
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link.js';

const Overview= () => {
  const { allStudent , user , notices , getResources , getStudentQueries} = useAppContext();
  const [activities, setActivities] = useState([]);
  const notice = notices?.length; // getting length of notice
  const resources = getResources?.length // getting length of resources
  const queries = getStudentQueries.filter((query) => query.isAnswered === false).length  // getting length of queries


  useEffect(() => {
    axios.get("/v1/getActivity").then(res => {
      setActivities(res.data);
      console.log(res.data)
    });
  }, []);

  const stats = [
    { label: 'Total Students', value: allStudent, icon: Users, color: 'text-cyan-400' },
    { label: 'Active Notices', value: notice, icon: Bell, color: 'text-yellow-400' },
    { label: 'Resources Uploaded', value: resources, icon: BookOpen, color: 'text-emerald-500' },
    { label: 'Pending Queries', value: queries, icon: MessageSquare, color: 'text-red-400' },
  ];

  const iconMap = {
    notice: <Bell className="text-yellow-400 w-4 h-4" />,
    resource: <FileText className="text-emerald-400 w-4 h-4" />,
    query: <MessageSquare className="text-red-400 w-4 h-4" />,
    event: <Calendar className="text-indigo-400 w-4 h-4" />
  };
  return (
    <div className="flex min-h-screen">
      
      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back, {user?.firstname}  {user?.lastname} 
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">Here's what's happening in your campus today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 hover:border-neon-green/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs sm:text-sm">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Recent Activity</h2>
              <div className="space-y-3 sm:space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                      activity.priority === 'high' ? 'bg-red-400' : 
                      activity.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm sm:text-base truncate">{activity.title}</p>
                      <p className="text-slate-400 text-xs sm:text-sm"> {moment(activity.createdAt).format("lll")}</p>
                    </div>
                    <div className="text-slate-400 flex-shrink-0">
                    {iconMap[activity.type]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-neon-green border border-emerald-400 transition-all text-white duration-300 text-sm sm:text-base">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                  <Link href={"/dashboard/faculties/notices"}><span>Post Notice</span></Link>        
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white border border-slate-600 transition-all duration-300 text-sm sm:text-base">
                  <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                  <Link href={"/dashboard/faculties/upload-resources"}><span>Upload Resource</span></Link>    
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white border border-slate-600 transition-all duration-300 text-sm sm:text-base">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Schedule Event</span>
                </button>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">This Week</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm sm:text-base">Notices Posted</span>
                  <span className="text-emerald-500 font-semibold">{notice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm sm:text-base">Resources Uploaded</span>
                  <span className="text-cyan-400 font-semibold">{resources}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm sm:text-base">Queries Answered</span>
                  <span className="text-yellow-400 font-semibold">{getStudentQueries.filter((query) => query.isAnswered === true).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;