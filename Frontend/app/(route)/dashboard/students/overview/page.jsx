"use client"
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../../_connection/contex.jsx';
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Download,
  Clock,
  CheckCircle,
} from 'lucide-react';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link.js';

const StudentDashboard= () => {
  const { user , notices , getResources , getEvents , getStudentQueries} = useAppContext();
  const pendingQueries = getStudentQueries.filter((query) => query.isAnswered === false).length;
  const [noticeActivity , setNoticeActivity] = useState([]);


  useEffect(() => {
    axios.get("/v1/getNoticeActivity").then(res => {
      setNoticeActivity(res.data);
    });
  } , [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }; 
  const stats = [
    { label: 'Unread Notices', value: notices.length , icon: Bell, color: 'text-yellow-400' },
    { label: 'Downloaded Resources', value : getResources.length , icon: BookOpen, color: 'text-green-400' },
    { label: 'Upcoming Events', value: getEvents.length, icon: Calendar, color: 'text-cyan-400' },
    { label: 'Pending Queries', value: pendingQueries, icon: MessageSquare, color: 'text-red-400' },
  ];

  return (
    <div className="flex min-h-screen">      
      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back, {user?.firstname} {user?.lastname}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">Here's your academic overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 hover:border-green-400/50 transition-all duration-300"
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Notices */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Notices</h2>
                <Link href={"/dashboard/students/notices"} className="text-green-400 hover:text-emerald-400 text-xs sm:text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-3 sm:space-y-4">
                { noticeActivity.length > 0 && noticeActivity.map((notice, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg transition-colors ${
                      notice.read ? 'bg-slate-700/30' : 'bg-slate-700/50 border border-green-200/20'
                    }`}
                  >
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                      notice.priority === 'high' ? 'bg-red-400' :
                      notice.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm sm:text-base truncate ${notice.read ? 'text-slate-300' : 'text-white'}`}>
                        {notice.title}
                      </p>
                      <p className="text-slate-400 text-xs sm:text-sm">{moment(notice.createdAt).format('lll')}</p>
                    </div>
                    <div className="text-slate-400 flex-shrink-0">
                    <Bell className="text-yellow-400 w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignment Status */}
            <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Query Status</h2>
              <div className="space-y-3 sm:space-y-4">
                {getStudentQueries.map((assignment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 sm:p-4 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-white font-medium text-sm sm:text-base truncate">{assignment.questionTitle}</p>
                      <p className="text-slate-400 text-xs sm:text-sm">{assignment.subject}</p>
                    </div>
                    <div className="text-right mr-3 sm:mr-4 flex-shrink-0">
                      <p className="text-xs sm:text-sm text-slate-400">Due: {moment(assignment.createdAt).format("lll")}</p>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      {assignment.isAnswered === true ? (
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                      ) : (
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link href={"/dashboard/students/download-resources"} className="w-full flex items-center space-x-3 p-3 bg-emerald-400/20 hover:bg-emerald-600/30 rounded-lg text-emerald-400 border border-green-400/30 transition-all duration-300 text-sm sm:text-base">
                  <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Download Resources</span>
                </Link>
                <Link href={"/dashboard/students/ask-faculty"} className="w-full flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white border border-slate-600 transition-all duration-300 text-sm sm:text-base">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Ask Faculty</span>
                </Link>
                <Link href={"/dashboard/students/events"} className="w-full flex items-center space-x-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white border border-slate-600 transition-all duration-300 text-sm sm:text-base">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>View Events</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Upcoming Events</h2>
              <div className="space-y-3 sm:space-y-4">
                {getEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                    <p className="text-white font-medium text-xs sm:text-sm">{event.title}</p>
                    <p className="text-emerald-400 text-xs mt-1">{formatDate(event.date)} at {event.time}</p>
                    <p className="text-slate-400 text-xs">{event.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Progress */}
            <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">This Semester</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm sm:text-base">Attendance</span>
                  <span className="text-emerald-400 font-semibold">90%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm sm:text-base">Assignments</span>
                  <span className="text-neon-cyan font-semibold">{getStudentQueries.length}/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm sm:text-base">Current GPA</span>
                  <span className="text-yellow-400 font-semibold">8.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;