"use client"
import React, { useEffect, useState } from 'react';
import { useAppContext } from "../../../../_connection/contex.jsx"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Plus,
  User,
  X,
  CircleChevronRight,
  CheckCircle
} from 'lucide-react';
import { sendEvents } from '../../../../_connection/getResponseApi.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';

const EventsPage = () => {
  const { user , getEvents} = useAppContext();
  const allEvents = getEvents.length;
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    eventType: 'workshop'
  });


  const [getActivity , setGetActivity] = useState([])
  useEffect(() => {
    axios.get("/v1/getNoticeActivity")
    .then((res) => {
        setGetActivity(res.data)
    })
  },[])


  const getCategoryColor = (category) => {
    switch (category) {
      case 'workshop': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'career': return 'bg-neon-green/20 text-neon-green border-neon-green/30';
      case 'sports': return 'bg-orange-500/20 text-orange-400 border-orange-400/30';
      case 'seminar': return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      case 'cultural': return 'bg-pink-500/20 text-pink-400 border-pink-400/30';
      default: return 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData) return
    const payLoad = {
      title : formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      eventType: formData.eventType
    }
    try {
      const response = await sendEvents("/v1/createevent" , payLoad);
      if(response.status === 200){
        toast.success("Created Successfully")
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          eventType: 'workshop'
        });
        setShowCreateForm(false);    
      }else{
        toast.error("error getting")
      }
    } catch (error) {
      console.log("Error occured in request" , error.message)
    }

  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'workshop': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'seminar': return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      case 'exam': return 'bg-red-500/20 text-red-400 border-red-400/30';
      case 'festival': return 'bg-pink-500/20 text-pink-400 border-pink-400/30';
      case 'other': return 'bg-slate-500/20 text-slate-400 border-slate-400/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-400/30';
    }
  };

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

          {user?.role === 'faculty' && (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-neon-green to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 rounded-lg text-white font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-emerald-600/25 text-sm sm:text-base"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Create Event</span>
            </button>
          )}
        </div>

        {/* Create Event Form */}
        {showCreateForm && user?.role === 'faculty' && (
          <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 mb-6 lg:mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Create New Event</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base"
                    required
                  >
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="exam">Exam</option>
                    <option value="festival">Festival</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Event Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe the event details, objectives, and any important information"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 resize-none text-sm sm:text-base"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Event Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-emerald-400 focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base"
                    required
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Main Auditorium, Lab 1, Online"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Form Preview */}
              <div className="bg-slate-700/30 rounded-lg p-4 sm:p-6 border border-slate-600">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Preview</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getEventTypeColor(formData.eventType)}`}>
                      {formData.eventType.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-white font-medium">
                    {formData.title || 'Event Title'}
                  </h4>
                  <p className="text-slate-300 text-sm">
                    {formData.description || 'Event description will appear here...'}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formData.date || 'Date'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formData.time || 'Time'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{formData.location || 'Location'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-neon-green to-emerald-600 hover:from-emerald-500 hover:to-neon-green rounded-lg text-white font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-neon-green/25 text-sm sm:text-base"
                >
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Create Event</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white font-semibold border border-slate-600 transition-all duration-300 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

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
                <p className="text-xl sm:text-2xl font-bold text-white">{getEvents.filter(e => e.isParticipated === true ).length}</p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {getEvents && getEvents.map((event , index) => (
            <div
              key={index}
              className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 hover:border-neon-green/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs border ${getCategoryColor(event.eventType)}`}>
                    {event.eventType.toUpperCase()}
                  </span>
                 
                </div>
                <div className="text-right text-xs sm:text-sm text-slate-400">
                  <p>{event.isParticipated ? `${getEvents.filter(e => e.isParticipated === true ).length}/300 ` : '0/300'}</p>
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
               
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-600 hover:from-emerald-500 hover:to-neon-green rounded-lg text-white font-medium transition-all duration-300 text-sm sm:text-base">
                    <CircleChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Details</span>
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