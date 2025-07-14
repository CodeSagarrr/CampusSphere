"use client"
import React, { useRef, useState } from 'react';
import { useAppContext } from '../../../../_connection/contex.jsx';
import { sendResourceData } from '../../../../_connection/getResponseApi.jsx'
import {
  BookOpen,
  Download,
  Upload,
  FileText,
  Search,
  Calendar,
  User
} from 'lucide-react';
import moment from 'moment';
import toast from 'react-hot-toast';
import { title } from 'process';

const StudyResources = () => {
  const { getResources, user } = useAppContext();
  const [selectedCourse, setSelectedCourse] = useState('BSc-CS');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const fileInput = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceData, setResourceData] = useState({
    title: "",
    subject: "",
    course: "BSc-CS",
    semester: "1",
    fileInp: null
  })

  const courses = ['BSc-CS', 'BCA', 'MSc-IT', 'MCA'];
  const semesters = ['1', '2', '3', '4', '5', '6'];

  const filteredResources = getResources.filter(resource => {
    const matchesCourse = resource.course === selectedCourse;
    const matchesSemester = selectedSemester === 'all' || resource.semester === selectedSemester;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCourse && matchesSemester && matchesSearch;
  });


  const handleChangeForAllForm = (e) => {
    setResourceData({ ...resourceData, [e.target.name]: e.target.value });
  }

  const handleSendData = async (e) => {
    e.preventDefault();
    if (!resourceData) return

    if (!resourceData || !resourceData.fileInp) {
      return toast.error("File or form data is missing");
    }
    const formData = new FormData();
    formData.append("title", resourceData.title);
    formData.append("subject", resourceData.subject);
    formData.append("course", resourceData.course);
    formData.append("semester", resourceData.semester);
    formData.append("file", resourceData.fileInp);

    try {
      const response = await sendResourceData("/v1/addstudyresource", formData)
      if (response.status === 200) {
        toast.success("Resources uploaded")
        setResourceData({
          title: "",
          subject: "",
          course: "BSc-CS",
          semester: "1",
          fileInp: null
        })
      } else {
        toast.error("Something error")
      }
    } catch (error) {
      console.log("Error occured from sending data from component", error.message)
    }
  }

  return (
    <div className="flex min-h-screen">

      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Study Resources</h1>
          <p className="text-slate-300 text-sm sm:text-base">
            {user?.role === 'faculty' ? 'Upload and manage study materials' : 'Access course materials and resources'}
          </p>
        </div>

        {/* Faculty Upload Section */}

        <div className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Upload New Resource</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Resource Title
              </label>
              <input
                type="text"
                onChange={handleChangeForAllForm}
                name='title'
                placeholder="Enter resource title"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Subject
              </label>
              <input
                onChange={handleChangeForAllForm}
                type="text"
                name='subject'
                placeholder="Enter subject"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Course
              </label>
              <select
                onChange={(e) => setResourceData({ ...resourceData, course: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base">
                {courses.map(course => (
                  <option key={course} value={course} >{course}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Semester
              </label>
              <select
                onChange={(e) => setResourceData({ ...resourceData, semester: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all duration-300 text-sm sm:text-base">
                {semesters.map(semester => (
                  <option key={semester} value={semester} >Semester {semester}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload File (PDF only)
              </label>
              <div onClick={() => fileInput?.current?.click()} className="border-2 border-dashed border-slate-600 rounded-lg p-6 sm:p-8 text-center hover:border-neon-green/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-slate-300 text-sm sm:text-base">Drag and drop your PDF file here, or click to browse</p>
                <input type="file" ref={fileInput} accept=".pdf" className="hidden" name='fileInp' formEncType='multipart/form-data' onChange={(e) => setResourceData({ ...resourceData, fileInp: e.target.files[0] })} />
              </div>
              {resourceData.fileInp && (
                <p className="text-slate-300 mt-2 font-semibold text-xl text-center">📄 {resourceData.fileInp?.name}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <button
                onClick={handleSendData}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/25 text-sm sm:text-base">
                Upload Resource
              </button>
            </div>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredResources.map((resource, i) => (
            <div
              key={i}
              className="bg-slate-900 backdrop-blur-sm rounded-xl border border-slate-700 p-4 sm:p-6 hover:border-neon-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/10"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1.5 sm:p-2 bg-red-500/20 rounded-lg">
                    <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-red-400" />
                  </div>
                </div>
                <span className="px-2 py-1 bg-emerald-200/20 text-green-300 text-xs rounded-full">
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
                  <span>{moment(resource.createdAt).format("LL")}</span>
                </div>
                <span>{moment(resource.createdAt).format("LT")}</span>
              </div>


              <a  href={`http://localhost:8000/uploads/${resource.file}`} download={`${resource.title}.pdf`} className="block w-full">
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