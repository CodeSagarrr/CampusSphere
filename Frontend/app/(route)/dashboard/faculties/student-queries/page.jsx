"use client"
import React, { useState } from 'react';
import { useAppContext } from '../../../../_connection/contex.jsx';
import { sentFacultyResponse } from '../../../../_connection/getResponseApi.jsx';
import {
  MessageSquare,
  Plus,
  Send,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const StudentQueries = () => {
  const { user, getStudentQueries } = useAppContext();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyingToQuery, setReplyingToQuery] = useState(null);

  
  const getStatusColor = (status) => {
    switch (status) {
      case 'answered': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'closed': return 'bg-slate-500/20 text-slate-400 border-slate-400/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-400/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'answered': return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'pending': return <Clock className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'closed': return <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
      default: return <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReplyClick = (queryId) => {
    setReplyingToQuery(queryId);
    setShowReplyForm(true);
    setReplyText('');
  };

  const handleReplySubmit = async(e) => {
    e.preventDefault();
    // Here you would typically send the reply to your backend
    const payLoad = {
      response : replyText
    }
    console.log('Reply submitted:', {
      queryId: replyingToQuery,
      response: replyText
    });

    try {
      const response = await sentFacultyResponse(`/v1/updateQuery/${replyingToQuery}` , payLoad)
      if(response.status === 200){
        toast.success("Response sent to student")
        setReplyText('');
        setShowReplyForm(false);
        setReplyingToQuery(null);
      }
    } catch (error) {
      console.log("error from request" , error.message)
    }

  };

  const handleReplyCancel = () => {
    setReplyText('');
    setShowReplyForm(false);
    setReplyingToQuery(null);
  };

  return (
    <div className="flex min-h-screen">

      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {user?.role === 'faculty' ? 'Student Queries' : 'Ask Faculty'}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              {user?.role === 'faculty'
                ? 'Review and respond to student questions'
                : 'Get help from faculty members on academic topics'
              }
            </p>
          </div>

          {user?.role === 'student' && (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-neon-green to-emerald-600 hover:from-emerald-500 hover:to-green-400 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/25 text-sm sm:text-base"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Ask Question</span>
            </button>
          )}
        </div>

        {/* Reply Form Modal */}
        {showReplyForm && user?.role === 'faculty' && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-700 p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Reply to Student Query</h2>
                <button
                  onClick={handleReplyCancel}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-slate-400 hover:text-white" />
                </button>
              </div>

              {/* Show the original query */}
              {replyingToQuery && (
                <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-cyan-400 font-medium">Original Query</span>
                  </div>
                  {(() => {
                    const query = getStudentQueries.find(q => q._id === replyingToQuery);
                    return query ? (
                      <div>
                        <h3 className="text-white font-medium text-sm sm:text-base mb-2">{query.questionTitle}</h3>
                        <p className="text-slate-300 text-sm">{query.questionContent}</p>
                        <div className="flex items-center space-x-2 mt-2 text-xs text-slate-400">
                          <User className="h-3 w-3" />
                          <span>From: {query.askedBy?.firstname}</span>
                          <span>•</span>
                          <span>Subject: {query.subject}</span>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              <form onSubmit={handleReplySubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Your Response *
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={6}
                    placeholder="Type your response to help the student with their query..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 resize-none text-sm sm:text-base"
                    required
                  ></textarea>
                  <p className="text-xs text-slate-400 mt-2">
                    Provide a clear and helpful response to address the student's question.
                  </p>
                </div>

                {/* Response Preview */}
                {replyText.trim() && (
                  <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4 border border-slate-600">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Preview</h3>
                    <div className="bg-slate-600/30 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs sm:text-sm text-green-400 font-medium">Faculty Response</span>
                        <span className="text-xs text-slate-400">
                          {new Date().toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm sm:text-base">{replyText}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-neon-green to-emerald-600 hover:from-emerald-500 hover:to-green-400 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-400/25 text-sm sm:text-base"
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Send Reply</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReplyCancel}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white font-semibold border border-slate-600 transition-all duration-300 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Create Query Form */}
       
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
          <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">Total Queries</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{getStudentQueries.length}</p>
              </div>
              <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {getStudentQueries.filter(q => q.isAnswered === false).length}
                </p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">Answered</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {getStudentQueries.filter(q => q.isAnswered === true).length}
                </p>
              </div>
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">Response Rate</p>
                <p className="text-xl sm:text-2xl font-bold text-white">75%</p>
              </div>
              <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Queries List */}
        <div className="space-y-4">
          {getStudentQueries.map((query, i) => (
            <div
              key={i}
              className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 hover:border-neon-green/50 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 gap-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className={`flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs border ${getStatusColor(query.isAnswered === false ? 'pending' : 'answered')}`}>
                    {getStatusIcon(query.isAnswered === false ? 'pending' : 'answered')}
                    <span>{query.isAnswered === false ? 'PENDING' : 'ANSWERED'}</span>
                  </span>
                  <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full">
                    {query.subject}
                  </span>
                </div>
                <div className="text-right text-xs sm:text-sm text-slate-400">
                  <p>{formatDate(query.createdAt)}</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                {query.questionTitle}
              </h3>

              <p className="text-slate-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                {query.questionContent}
              </p>

              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="truncate">
                    {user?.role === 'faculty'
                      ? `${query.askedBy?.firstname} (${query.askedBy?.email})`
                      : `To: ${query.to}`
                    }
                  </span>
                </div>
              </div>

              {query.response && (
                <div className="bg-slate-700/30 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-green-400 font-medium">Faculty Response</span>
                    <span className="text-xs text-slate-400">
                      {formatDate(query.updatedAt)}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm sm:text-base">{query.response}</p>
                </div>
              )}

              {user?.role === 'faculty' && !query.isAnswered && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleReplyClick(query._id)}
                    className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-600 hover:from-emerald-500 hover:to-green-400 rounded-lg text-white font-medium transition-all duration-300 text-sm sm:text-base"
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Reply</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {getStudentQueries.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <MessageSquare className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-lg sm:text-xl text-slate-300 mb-2">No queries found</p>
            <p className="text-slate-400 text-sm sm:text-base">
              {user?.role === 'faculty'
                ? 'No student queries at the moment'
                : 'Start by asking your first question'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentQueries;