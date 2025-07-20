"use client"
import React, { useState } from 'react';
import { useAppContext } from '../../../../_connection/contex.jsx';
import { 
  BookOpen, 
  Download, 
  Upload, 
  FileText, 
  Search,
  Filter,
  Calendar,
  User
} from 'lucide-react';
import moment from 'moment';

const StudyResources = () => {
  const { user , getResources } = useAppContext();
  const [selectedCourse, setSelectedCourse] = useState('BSc-CS');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const courses = ['BSc-CS', 'BCA', 'MSc-IT', 'MCA'];
  const semesters = ['1', '2', '3', '4', '5', '6'];


  const filteredResources = getResources.filter(resource => {
    const matchesCourse = resource.course === selectedCourse;
    const matchesSemester = selectedSemester === 'all' || resource.semester === selectedSemester;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCourse && matchesSemester && matchesSearch;
  });

  return (
    <div className="flex min-h-screen">
      
      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Study Resources</h1>
          <p className="text-slate-300 text-sm sm:text-base">
            {user?.role === 'faculty' ? 'Upload and manage study materials' : 'Access course materials and resources'}
          </p>
        </div>

       

        {/* Filters */}
        <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 mb-6 lg:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base"
              >
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Semester
              </label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base"
              >
                <option value="all">All Semesters</option>
                {semesters.map(semester => (
                  <option key={semester} value={semester}>Semester {semester}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Search Resources
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title or subject"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 hover:border-emerald-400">
          {filteredResources.map((resource , index) => (
            <div 
              key={index}
              className=" bg-slate-900 text-white backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1.5 sm:p-2 bg-red-500/20 rounded-lg">
                    <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-red-400" />
                  </div>
                
                </div>
                <span className="px-2 py-1 bg-emerald-200/20 text-green-400 text-xs rounded-full">
                  Sem {resource.semester}
                </span>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-2">
                {resource.title}
              </h3>
              
              <p className="text-neon-cyan text-sm mb-3 sm:mb-4">{resource.subject}</p>
              
              <div className="flex items-center space-x-2 mb-3 sm:mb-4 text-xs sm:text-sm text-slate-400">
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="truncate">{resource.uploadedBy?.firstname} {resource.uploadedBy?.lastname} , Role : {resource.uploadedBy?.role}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{moment(resource.createdAt).format("lll")}</span>
                </div>
                <span>{resource.downloads} downloads</span>
              </div>
              
              <a href={`http://localhost:8000/uploads/${resource.file}`} download={`${resource.title}.pdf`}>
              <button className="w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-600 hover:from-emerald-500 hover:to-neon-green rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/25 text-sm sm:text-base">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Download</span>
              </button>
              </a>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-lg sm:text-xl text-slate-300 mb-2">No resources found</p>
            <p className="text-slate-400 text-sm sm:text-base">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyResources;