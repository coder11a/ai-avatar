"use client"

import { useState, useEffect } from 'react';
import { Plus, Edit, Loader, Home, Settings, Bell, User, Search, Menu, X } from 'lucide-react';

interface Avatar {
  id: number;
  name: string;
  image: string;
  description: string;
  status?: string;
}

interface AvatarCardProps {
  avatar: Avatar;
}

interface CreateAvatarModalProps {
  onClose: () => void;
}

export default function AIDashboard() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("Rohit");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const fetchData = async () => {
     
        setAvatars([
          { id: 1, name: 'Men Fashion Influencer', image: '/men.png', description: 'Rahul', status: 'active' },
          { id: 2, name: 'Kids Fashion Influencer', image: '/kid.png', description: 'Sam', status: 'active' },
          { id: 3, name: 'Women Fashion Influencer', image: '/women.png', description: 'Priya', status: 'active' },

        ]);
        setLoading(false);
      
    };

    fetchData();
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Header
        username={username}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  AI Avatar Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome back, {username}! Manage your AI avatars here.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search avatars..."
                    className="pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white w-full md:w-64"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard title="Total Avatars" value={avatars.length} icon="users" color="blue" />
            <StatsCard title="Upcoming Avatars" value={avatars.filter(a => a.status === 'active').length} icon="check" color="green" />
            <StatsCard title="Usage This Month" value="73%" icon="chart" color="purple" />
          </div>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your AI Avatars</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {avatars.length} avatars available
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-500">Loading avatars...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {avatars.map((avatar) => (
                  <AvatarCard
                    key={avatar.id}
                    avatar={avatar}
                  />
                ))}
              </div>
            )}
          </section>

          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-105 z-10"
            aria-label="Create new avatar"
          >
            <Plus className="text-white w-6 h-6" />
          </button>
        </div>
      </main>

      <Footer />

      {isModalOpen && (
        <CreateAvatarModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

function Header({ username, isDarkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen }: {
  username: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}) {
  return (
    <header className="fixed w-full z-20 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">AvatarHub</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
              <Home className="w-4 h-4 mr-1" /> Dashboard
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
              <Settings className="w-4 h-4 mr-1" /> Settings
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
              <Bell className="w-4 h-4 mr-1" /> Notifications
              <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
         

            <div className="flex items-center border-l border-gray-200 dark:border-gray-700 pl-4">
              <img
                src="/bot.png"
                alt={username}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{username}</span>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ?
                <X className="h-6 w-6" /> :
                <Menu className="h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700">
              Dashboard
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Notifications
            </a>
        
            <div className="px-3 py-2 flex items-center">
              <img
                src="/api/placeholder/32/32"
                alt={username}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{username}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function StatsCard({ title, value, icon, color }: { title: string; value: string | number; icon: string; color: string }) {
  const getIconComponent = () => {
    switch (icon) {
      case 'users':
        return <User className="w-8 h-8" />;
      case 'check':
        return <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>;
      case 'chart':
        return <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>;
      default:
        return <div className="w-8 h-8" />;
    }
  };

  const colorClass = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200',
    green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200',
  }[color] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClass} mr-4`}>
          {getIconComponent()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function AvatarCard({ avatar }: AvatarCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center">
          <div className="relative w-16 h-16 mr-4 flex-shrink-0">
            <img
              src={avatar.image || "/api/placeholder/64/64"}
              alt={avatar.name}
              className="w-full h-full rounded-full object-cover border-2 border-blue-100 dark:border-blue-900"
            />
            <div className={`absolute bottom-0 right-0 w-3 h-3 ${avatar.status === 'active' ? 'bg-green-400' : 'bg-gray-400'} rounded-full border-2 border-white dark:border-gray-800`}></div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{avatar.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{avatar.description}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Influencer
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            New
          </span>
        </div>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-750">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${avatar.status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
              {avatar.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateAvatarModal({ onClose }: CreateAvatarModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-white/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Create New Avatar</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Avatar Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., influencer"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what your avatar does..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              ></textarea>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-32 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-650 transition-colors">
                <div className="text-center">
                  <div className="flex justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Upload avatar image</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-750 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
          >
            Create Avatar
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AvatarHub © 2025</span>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Help</a>
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Privacy</a>
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Terms</a>
            <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
