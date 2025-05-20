import React, { useState } from 'react';
import { XIcon, Mail, Lock } from 'lucide-react';
interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string, remember: boolean) => void;
}
const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  onLogin
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, remember);
  };
  return <div className="fixed inset-0 z-50">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 backdrop-blur-xl bg-gray-800/40" onClick={onClose} />
      {/* Modal */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-400">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
              <XIcon className="h-5 w-5" />
            </button>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-full p-3">
                  <Lock className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="px-8 pt-12 pb-8">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Welcome Back
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your password" required />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </button>
              </div>
              <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default LoginModal;