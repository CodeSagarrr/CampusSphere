"use client"
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../../_connection/contex.jsx';
import { studentRegisterEvent } from '../../../../_connection/getResponseApi.jsx'
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Plus,
  CheckCircle,
  User,
  X
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EventsPage = () => {
  const { user, getEvents } = useAppContext();
  const [getActivity, setGetActivity] = useState([]);

  useEffect(() => {
    axios.get("/v1/getNoticeActivity")
      .then((res) => {
        setGetActivity(res.data)
      })
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'workshop': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'career': return 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30';
      case 'sports': return 'bg-orange-500/20 text-orange-400 border-orange-400/30';
      case 'seminar': return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      case 'cultural': return 'bg-pink-500/20 text-pink-400 border-pink-400/30';
      default: return 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30';
    }
  };

  const createStudentRegister = async (eventId) => {
    try {
      const response = await studentRegisterEvent(`/v1/updateEvent/${eventId}`);
      if (response.status === 200) {
        toast.success("You are selected")
      } else {
        toast.error(response.data?.message)
      }
    } catch (error) {
      console.log("Error occured in request", error.message);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen">

      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Campus Events</h1>
            <p className="text-slate-300 text-sm sm:text-base">
              {user?.role === 'faculty' ? 'Manage and organize campus events' : 'Discover and register for upcoming events'}
            </p>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
          <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">Total Events</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{getEvents.length}</p>
              </div>
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">Registered</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {getEvents.filter(e => e.isParticipated === true).length}
                </p>
              </div>
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
            </div>
          </div>

          <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">This Week</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{getActivity.filter((event) => event.type === 'events').length}</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">Participants</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{getEvents.filter(e => e.isParticipated === true).length}</p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {getEvents.map((event, index) => (
            <div
              key={index}
              className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 hover:border-neon-green/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs border ${getCategoryColor(event.eventType)}`}>
                    {event.eventType?.toUpperCase()}
                  </span>
                  {event.isParticipated && (
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  )}
                </div>
                <div className="text-right text-xs sm:text-sm text-slate-400">
                  <p> {`${event.participants.length}/300`}</p>
                  <p className="text-xs">participants</p>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                {event.title}
              </h3>

              <p className="text-slate-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                {event.description}
              </p>

              <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="truncate">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="truncate">Organized by {event.postedBy.firstname} {event.postedBy.lastname} , Role : {event.postedBy.role}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                {event.isParticipated ? (
                  <button className="flex-1 flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-neon-green/20 text-neon-green rounded-lg border border-neon-green/30 cursor-default text-sm sm:text-base">
                    <CheckCircle className="h-3 w-4 sm:h-4 sm:w-4" />
                    <span>Registered</span>
                  </button>
                ) : (
                  <button onClick={() => createStudentRegister(event._id)} className="flex-1 flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-600 hover:from-emerald-500 hover:to-neon-green rounded-lg text-white font-medium transition-all duration-300 text-sm sm:text-base">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Register</span>
                  </button>
                )}
                <button className="px-3 sm:px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white border border-slate-600 transition-all duration-300 text-sm sm:text-base">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;