"use client"
import React, { useState } from 'react';
import { useAppContext } from '../../../../../_connection/contex.jsx';
import { sendNoticeData } from '../../../../../_connection/getResponseApi.jsx'
import {
    Bell,
    Plus,
    Calendar,
    User,
    Clock,
    Pin
} from 'lucide-react';
import moment from 'moment';
import toast from 'react-hot-toast';

const Notices = () => {
    const { user, notices} = useAppContext();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [filterPriority, setFilterPriority] = useState('all');
    const [noticeData, setNoticeData] = useState({
        title: "",
        priority: "",
        content: ""
    })

    const handleChange = (e) => {
        setNoticeData({ ...noticeData, [e.target.name]: e.target.value })
    }

    const handleDropDownChange = (priority) => {
        setNoticeData({ ...noticeData, priority });
    }

    const filteredNotices = notices.filter(notice => {
        if (filterPriority === 'all') return true;
        return notice.priority === filterPriority;
    });

    const sortedNotices = filteredNotices.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-400 bg-red-400/20 border-red-400/30';
            case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
            case 'low': return 'text-green-400 bg-green-400/20 border-green-400/30';
            default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
        }
    };

    const getPriorityDot = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-400';
            case 'medium': return 'bg-yellow-400';
            case 'low': return 'bg-green-400';
            default: return 'bg-slate-400';
        }
    };

    const createNotices = async (e) => {
        e.preventDefault();
        if(!noticeData) return

        const payLoad = {
            title : noticeData.title,
            priority : noticeData.priority,
            content : noticeData.content
        }

        try {
            const response = await sendNoticeData("/v1/notice" , payLoad)
            if(response.status === 200){
                toast.success("Notice created successfully ")
                
            }else{
                console.log("error in request" , response)
            }
        } catch (error) {
            console.log("Error in notice page" , error.message)
        }
    }

    return (
        <div className="flex min-h-screen">

            <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Notice Board</h1>
                        <p className="text-slate-300 text-sm sm:text-base">
                            {user?.role === 'faculty' ? 'Manage and create notices for students' : 'Stay updated with latest announcements'}
                        </p>
                    </div>

                    {user?.role === 'faculty' && (
                        <button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/25 text-sm sm:text-base"
                        >
                            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span>Create Notice</span>
                        </button>
                    )}
                </div>

                {/* Create Notice Form */}
                {showCreateForm && user?.role === 'faculty' && (
                    <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 mb-6 lg:mb-8">
                        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Create New Notice</h2>
                        <div className="space-y-4 sm:space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Notice Title
                                </label>
                                <input
                                    value={noticeData?.title}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter notice title"
                                    name='title'
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Notice Content
                                </label>
                                <textarea
                                    onChange={handleChange}
                                    value={noticeData.content}
                                    rows={4}
                                    placeholder="Enter notice content"
                                    name='content'
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 resize-none text-sm sm:text-base"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Priority Level
                                    </label>
                                    <select
                                        value={noticeData.priority}
                                        onChange={(e) => handleDropDownChange(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-sm sm:text-base">
                                        <option value="low">Low Priority</option>
                                        <option value="medium">Medium Priority</option>
                                        <option value="high">High Priority</option>
                                    </select>
                                </div>


                            </div>

                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                <button 
                                onClick={createNotices}
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/25 text-sm sm:text-base">
                                    Publish Notice
                                </button>
                                <button
                                    onClick={() => setShowCreateForm(false)}
                                    className="px-4 sm:px-6 py-2 sm:py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white font-semibold border border-slate-600 transition-all duration-300 text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 mb-6 lg:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-base sm:text-lg font-semibold text-white">Filter Notices</h2>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <label className="text-sm text-slate-300">Priority:</label>
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="px-4 py-2 bg-slate-800/60 backdrop-blur-md border border-slate-600 rounded-md text-sm text-white shadow-inner transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 hover:border-emerald-400"
                            >
                                <option value="all">All Priorities</option>
                                <option value="high">High Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="low">Low Priority</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notices List */}
                <div className="space-y-4">
                    {sortedNotices.map((notice, i) => (
                        <div
                            key={i}
                            className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 hover:border-emerald-400/50 transition-all duration-300"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 gap-3">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getPriorityDot(notice.priority)}`}></div>
                                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(notice.priority)}`}>
                                        {notice.priority.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-slate-400">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span>{moment(notice.createdAt).format("L")}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span>{moment(notice.createdAt).format("LT")}</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                                {notice.title}
                            </h3>

                            <p className="text-slate-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                                {notice.content}
                            </p>

                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
                                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>Posted by : {notice.postedBy?.firstname} {notice.postedBy?.lastname} Role : {notice.postedBy?.role}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {sortedNotices.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                        <Bell className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400 mx-auto mb-3 sm:mb-4" />
                        <p className="text-lg sm:text-xl text-slate-300 mb-2">No notices found</p>
                        <p className="text-slate-400 text-sm sm:text-base">Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notices;