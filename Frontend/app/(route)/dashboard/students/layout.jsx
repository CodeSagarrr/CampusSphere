import { Toaster } from 'react-hot-toast'
import Sidebar from "./_Components/SideBar.jsx";

function Layout({ children }) {
    return (
           <>
                <div className="min-h-screen flex flex-col lg:flex-row bg-slate-900 text-white">
                    {/* Sidebar */}
                   <div>
                   <Sidebar />
                   </div>

                    {/* Right Content */}
                    <main className="flex-1  p-4 sm:p-6 lg:p-8 lg:mt-0 lg:ml-0 overflow-auto inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 opacity-80">
                        {children}
                    </main>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
          </>
    );
}

export default Layout